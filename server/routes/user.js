import express from "express";
import {
    getUserData,
    getAccessToken,
    getCommits,
    getRepos,
    createUser,
    getCommitsInRepo,
    getUserById,
    addPointsToUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/getUserData", getUserData);
router.get("/getAccessToken", getAccessToken);
router.get("/getCommits", getCommits);
router.get("/getCommits/:repoName", getCommitsInRepo);
router.get("/getRepos", getRepos);
router.get("/:id", getUserById);
router.post("/:id", createUser);
router.post("/:id/addPoints", addPointsToUser);

export default router;
