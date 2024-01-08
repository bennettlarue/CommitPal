import dotenv from "dotenv";
dotenv.config();
import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import userRoutes from "./routes/user.js";
import goalRoutes from "./routes/goals.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/goals", goalRoutes);
app.get("/", (req, res) => res.send("Hello from homepage!"));

const CONNECTION_URL = `mongodb+srv://Ben:${process.env.MONGO_PASSWORD}@cluster0.21zirih.mongodb.net/?retryWrites=true&w=majority`;

mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully Connected to MongoDB!");
    })
    .catch((error) => {
        console.error("Error Connecting to MongoDB: ", error);
    });

app.use(cors());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
