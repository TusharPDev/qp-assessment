"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const router = express_1.default.Router();
router.post("/addGroceries", adminController_1.addGrocery);
router.get("/getGroceries", adminController_1.getGroceries);
router.put("/updateGroceries/:id", adminController_1.updateGrocery);
router.delete("/deleteGroceries/:id", adminController_1.deleteGrocery);
exports.default = router;
