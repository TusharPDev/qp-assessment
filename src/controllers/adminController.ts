import { Request, Response } from "express";
import { ResultSetHeader } from "mysql2";
import pool from "../config/db";

// Function to add an item
export const addGrocery = async (req: Request, res: Response) => {
    try {
        const { name, price, quantity,createdBy } = req.body;
        const [result] = await pool.query<ResultSetHeader>(
            "INSERT INTO groceries (name, price, quantity,created_by) VALUES (?, ?, ?,?)",
            [name, price, quantity,createdBy]
        );

        res.status(201).json({ message: "Grocery added successfully", groceryId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Error adding grocery", error });
    }
};

// Function to view all grocery item
export const getGroceries = async (_req: Request, res: Response) => {
    try {
        const [rows] = await pool.query("SELECT * FROM groceries");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching groceries", error });
    }
};

// Here we can update an item using below function
export const updateGrocery = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, price, quantity,updatedBy } = req.body;
        await pool.query(
            "UPDATE groceries SET name = ?, price = ?, quantity = ?, updated_by = ? WHERE id = ?",
            [name, price, quantity,updatedBy,id]
        );
        res.json({ message: "Grocery updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating grocery", error });
    }
};

// Function to delete grocery item
export const deleteGrocery = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM groceries WHERE id = ?", [id]);
        res.json({ message: "Grocery deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting grocery", error });
    }
};