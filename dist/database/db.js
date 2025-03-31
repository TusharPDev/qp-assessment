"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
// Create a connection pool
const pool = promise_1.default.createPool({
    host: "localhost", // Change to your MySQL host
    user: "root", // Your MySQL username
    password: "TP#0622mysql", // Your MySQL password
    database: "grocery_db", // Your database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
exports.default = pool;
