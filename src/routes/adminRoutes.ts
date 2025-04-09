import express from "express";
import { addGrocery, getGroceries, updateGrocery, deleteGrocery } from "../controllers/adminController";

const router = express.Router();

router.post("/addGroceries", addGrocery);
router.get("/getGroceries", getGroceries);
router.put("/updateGroceries/:id", updateGrocery);
router.delete("/deleteGroceries/:id", deleteGrocery);

export default router;