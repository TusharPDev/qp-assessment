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
exports.deleteGrocery = exports.updateGrocery = exports.getGroceries = exports.addGrocery = void 0;
const db_1 = __importDefault(require("../config/db"));
// Function to add an item
const addGrocery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Body:", req.body);
        const { name, price, quantity, createdBy } = req.body;
        const [result] = yield db_1.default.query("INSERT INTO groceries (name, price, quantity,created_by) VALUES (?, ?, ?,?)", [name, price, quantity, createdBy]);
        res
            .status(201)
            .json({
            message: "Grocery added successfully",
            groceryId: result.insertId,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error adding grocery", error });
    }
});
exports.addGrocery = addGrocery;
// Function to view all grocery item
const getGroceries = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query("SELECT * FROM groceries");
        console.log("Body:");
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching groceries", error });
    }
});
exports.getGroceries = getGroceries;
// Here we can update an item using below function
const updateGrocery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, price, quantity, updatedBy } = req.body;
        yield db_1.default.query("UPDATE groceries SET name = ?, price = ?, quantity = ?, updated_by = ? WHERE id = ?", [name, price, quantity, updatedBy, id]);
        res.json({ message: "Grocery updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating grocery", error });
    }
});
exports.updateGrocery = updateGrocery;
// Function to delete grocery item
const deleteGrocery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield db_1.default.query("DELETE FROM groceries WHERE id = ?", [id]);
        res.json({ message: "Grocery deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting grocery", error });
    }
});
exports.deleteGrocery = deleteGrocery;
