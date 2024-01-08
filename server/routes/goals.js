import express from "express";
import {
    createGoal,
    deleteGoal,
    getGoals,
    getUserGoals,
    updateGoal,
} from "../controllers/goal.js";
const router = express.Router();

router.get("/", getGoals);
router.post("/createGoal", createGoal);
router.delete("/:id", deleteGoal);
router.put("/:id", updateGoal);
router.get("/:userId", getUserGoals);

export default router;
