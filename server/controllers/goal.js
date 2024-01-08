import { body, param, validationResult } from "express-validator";
import Goal from "../models/goal.js";

export const getGoals = async (req, res) => {
    try {
        const goals = await Goal.find();
        res.status(200).json(goals);
    } catch (error) {
        console.log(error);
    }
};

function calculatePoints(createdDate, expirationDate, count) {
    const result = count * 2;
    return result;
}

export const createGoal = async (req, res) => {
    // Run each validation
    await body("createdDate").toDate().run(req);
    await body("expirationDate").toDate().run(req);
    await body("count").isInt({ min: 0 }).run(req);
    await body("userId").trim().escape().run(req);
    await body("repository").trim().escape().run(req);
    await body("status").trim().escape().run(req);

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract validated and sanitized data
    const { createdDate, expirationDate, count, userId, repository, status } =
        req.body;
    const points = calculatePoints(createdDate, expirationDate, count);

    // Create a new goal with the validated data
    const newGoal = new Goal({
        userId,
        createdDate,
        expirationDate,
        count,
        repository,
        status,
        points,
    });

    try {
        // Save the new goal to the database
        await newGoal.save();
        res.status(201).json(newGoal);
    } catch (error) {
        // Log and return the error if the goal couldn't be saved
        console.error(error);
        res.status(500).json({ message: "Failed to create new goal" });
    }
};

export const updateGoal = async (req, res) => {
    await param("id").trim().escape().run(req);
    await body("userId").trim().escape().run(req);
    await body("createdDate").toDate().run(req);
    await body("expirationDate").toDate().run(req);
    await body("count").isInt({ min: 0 }).run(req);
    await body("repository").trim().escape().run(req);
    await body("status").trim().escape().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { userId, createdDate, expirationDate, count, repository, status } =
        req.body;
    const points = calculatePoints(createdDate, expirationDate, count);

    try {
        const updatedGoal = await Goal.findByIdAndUpdate(
            id,
            {
                userId,
                createdDate,
                expirationDate,
                count,
                repository,
                status,
                points,
            },
            { new: true }
        );
        res.status(200).json(updatedGoal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const deleteGoal = async (req, res) => {
    await param("id").trim().escape().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    try {
        const deletedGoal = await Goal.findByIdAndDelete(id);
        if (!deletedGoal) {
            return res.status(404).json({ message: "Goal not found" });
        }
        res.status(200).json({ message: "Goal deleted successfully" });
    } catch (error) {
        console.error("Error deleting goal:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getUserGoals = async (req, res) => {
    await param("userId").trim().escape().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = req.params;

    try {
        const goals = await Goal.find({ userId }).exec();
        res.status(200).json(goals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
