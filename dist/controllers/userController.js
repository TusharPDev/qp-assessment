"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeOrder = exports.getAvailableGroceries = void 0;
const db_1 = __importDefault(require("../config/db"));
//Function to view available grocery items.
const getAvailableGroceries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query("SELECT * FROM groceries g where g.quantity > 0");
        res.json(rows);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching available groceries", error });
    }
});
exports.getAvailableGroceries = getAvailableGroceries;
const placeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, items } = req.body; // items: [{ groceryId, quantity }]
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Invalid items data" });
    }
    try {
        let totalPrice = 0;
        const connection = yield db_1.default.getConnection();
        yield connection.beginTransaction(); // Start transaction
        // Insert order
        const [orderResult] = yield connection.query("INSERT INTO orders (user_id, total_price) VALUES (?, ?)", [userId, 0] // Placeholder for total_price, will update later
        );
        const orderId = orderResult.insertId;
        for (const item of items) {
            const [grocery] = yield connection.query("SELECT price, quantity FROM groceries WHERE id = ?", [item.groceryId]);
            if (!grocery.length || grocery[0].quantity < item.quantity) {
                yield connection.rollback();
                return res.status(400).json({ message: `Insufficient stock for groceryId ${item.groceryId}` });
            }
            const itemPrice = grocery[0].price * item.quantity;
            totalPrice += itemPrice;
            // Insert into order_items
            yield connection.query("INSERT INTO order_items (order_id, grocery_id, quantity, price) VALUES (?, ?, ?, ?)", [orderId, item.groceryId, item.quantity, itemPrice]);
            // Update grocery stock
            yield connection.query("UPDATE groceries SET quantity = quantity - ? WHERE id = ?", [item.quantity, item.groceryId]);
        }
        // Update total price in orders table
        yield connection.query("UPDATE orders SET total_price = ? WHERE id = ?", [totalPrice, orderId]);
        yield connection.commit(); // Commit transaction
        connection.release();
        res.status(201).json({ message: "Order placed successfully", orderId, totalPrice });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error placing order", error });
    }
});
exports.placeOrder = placeOrder;
