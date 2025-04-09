"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
// import {getAvailableGroceries,placeOrder} from "../controllers/userController";
const router = express_1.default.Router();
router.get("/getAvailableGroceries", userController_1.getAvailableGroceries);
router.post("/placeOrder", userController_1.placeOrder);
exports.default = router;
