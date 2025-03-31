import express from "express";
import { addGrocery, getGroceries, updateGrocery, deleteGrocery } from "../controllers/adminController";

const router = express.Router();

router.post("/groceries", addGrocery);
router.get("/groceries", getGroceries);
router.put("/groceries/:id", updateGrocery);
router.delete("/groceries/:id", deleteGrocery);

export default router;