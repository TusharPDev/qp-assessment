import { Request, Response } from "express";
import { ResultSetHeader } from "mysql2";
import pool from "../config/db";

//Function to view available grocery items.
export const getAvailableGroceries = async (req: Request, res: Response) => {
  try {
    const [rows]: [any[], any] = await pool.query(
      "SELECT * FROM groceries g where g.quantity > 0"
    );
    res.json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching available groceries", error });
  }
};

//Function where user can book multiple groceries
export const placeOrder = async (req: any, res: any) => {
    const { userId, items } = req.body; 
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Invalid items data" });
    }

    try {
        let totalPrice = 0;
        const connection = await pool.getConnection();

        await connection.beginTransaction(); // This is a transaction block

        // Insert order
        const [orderResult]: any = await connection.query(
            "INSERT INTO orders (user_id, total_price) VALUES (?, ?)",
            [userId, 0]
        );
        const orderId = orderResult.insertId;

        for (const item of items) {
            const [grocery]: any = await connection.query(
                "SELECT price, quantity FROM groceries WHERE id = ?",
                [item.groceryId]
            );

            if (!grocery.length || grocery[0].quantity < item.quantity) {
                await connection.rollback();
                return res.status(400).json({ message: `Insufficient stock for groceryId ${item.groceryId}` });
            }

            const itemPrice = grocery[0].price * item.quantity;
            totalPrice += itemPrice;

            // Insert into order_items
            await connection.query(
                "INSERT INTO order_items (order_id, grocery_id, quantity, price) VALUES (?, ?, ?, ?)",
                [orderId, item.groceryId, item.quantity, itemPrice]
            );

            // Update grocery stock
            await connection.query(
                "UPDATE groceries SET quantity = quantity - ? WHERE id = ?",
                [item.quantity, item.groceryId]
            );
        }

        // Here we are updating total price 
        await connection.query(
            "UPDATE orders SET total_price = ? WHERE id = ?",
            [totalPrice, orderId]
        );

        await connection.commit(); // Commit transaction
        connection.release();

        res.status(201).json({ message: "Order placed successfully", orderId, totalPrice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error placing order", error });
    }
};
