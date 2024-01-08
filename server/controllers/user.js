import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";
import User from "../models/user.js";

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

export const getAccessToken = async (req, res) => {
    const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`;

    await fetch(`https://github.com/login/oauth/access_token${params}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            res.json(data);
        });
};

export const getUserData = async (req, res) => {
    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            Authorization: req.get("Authorization"),
        },
    })
        .then((response) => {
            return response.json();
        })
        .then(async (data) => {
            res.json(data);
        });
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ id: id }).exec();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const createUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOne({ id: id }).exec();
        if (user) {
            res.send({ message: "User Already Exists" });
        } else {
            const newUser = new User({
                id: id,
                points: 0,
            });
            await newUser.save();
            res.send({ message: "User created" });
        }
    } catch {
        res.status(500).json({ error: "Failed to create new user" });
    }
};

export const addPointsToUser = async (req, res) => {
    const { id } = req.params; // User ID from the URL
    const { pointsToAdd } = req.body; // Number of points to add, sent in the request body

    if (!pointsToAdd || isNaN(pointsToAdd)) {
        return res
            .status(400)
            .json({ message: "Invalid number of points provided" });
    }

    try {
        // Find the user by ID
        const user = await User.findOne({ id: id });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Add the points to the user's current score
        user.points += pointsToAdd;

        // Save the updated user back to the database
        await user.save();

        // Send a success response
        res.status(200).json({
            message: "Points added successfully",
            newTotal: user.points,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getCommitsInRepo = async (req, res) => {
    const { repoName } = req.params;

    await fetch("https://api.github.com/user/repos", {
        method: "GET",
        headers: {
            Authorization: req.get("Authorization"),
        },
    })
        .then((response) => {
            return response.json();
        })
        .then(async (data) => {
            let commits = [];

            for (let i = 0; i < data.length; i++) {
                if (data[i].name === repoName) {
                    await fetch(data[i].commits_url.slice(0, -6), {
                        method: "GET",
                        headers: {
                            Authorization: req.get("Authorization"),
                        },
                    })
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            commits.push(data);
                        });
                }
            }

            res.send(commits.flat(5));
        });
};

// Fetches all the commits a user has made in any repo.
export const getCommits = async (req, res) => {
    await fetch("https://api.github.com/user/repos", {
        method: "GET",
        headers: {
            Authorization: req.get("Authorization"),
        },
    })
        .then((response) => {
            return response.json();
        })
        .then(async (data) => {
            let commits = [];

            for (let i = 0; i < data.length; i++) {
                await fetch(data[i].commits_url.slice(0, -6), {
                    method: "GET",
                    headers: {
                        Authorization: req.get("Authorization"),
                    },
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        commits.push(data);
                    });
            }

            res.send(commits.flat(5));
        });
};

export const getRepos = async (req, res) => {
    try {
        const response = await fetch("https://api.github.com/user/repos", {
            method: "GET",
            headers: {
                Authorization: req.get("Authorization"),
            },
        });

        const data = await response.json();

        const repoObjs = await Promise.all(
            data.map((repo) => {
                return { name: repo.name, commitsUrl: repo.commits_url };
            })
        );

        res.json(repoObjs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
