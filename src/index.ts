import express from 'express';
import pool from "./config/db"; 
import { Request, Response } from 'express';
const app = express();
import dotenv from 'dotenv';
import adminRoutes from "./routes/adminRoutes";

dotenv.config();


const PORT = process.env.PORT || 3000;

app.use("/api/admin", adminRoutes);


//test db 
app.get("/test-db", async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query("SELECT 1 + 1 AS result");
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).json({ success: false, message: "Database connection failed" });
    }
});


//listen
app.listen(PORT, ()=>{
    console.log(`Server is Running at port : ${PORT}`);
})