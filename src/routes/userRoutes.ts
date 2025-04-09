import express from "express";
import { getAvailableGroceries, placeOrder } from "../controllers/userController";
// import {getAvailableGroceries,placeOrder} from "../controllers/userController";

const router = express.Router();

router.get("/getAvailableGroceries", getAvailableGroceries);
router.post("/placeOrder", placeOrder);

export default router;