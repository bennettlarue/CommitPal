import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "./DatePicker.js";
import { getRepos } from "../utils/api.js";

/*
This component includes all of the options, buttons, and functionality used for creating or editing a goal.
It is used in "GoalPopup".
*/

const PostForm = ({
    onClose,
    userId,
    handleRerender,
    selectedGoal,
    CONNECTION_URL,
}) => {
    // State for managing repositories, errors, and goal data
    const [repositories, setRepositories] = useState([]);
    const [showCommitsError, setShowCommitsError] = useState(false);
    const [showRepoError, setShowRepoError] = useState(false);
    const [showDateError, setShowDateError] = useState(false);
    const [goalData, setGoalData] = useState({
        count: 0,
        date: new Date(),
        repository: null,
    });

    // Effect for fetching repositories and setting initial goal data
    useEffect(() => {
        getRepos().then((result) => {
            setRepositories(result);
        });
        if (selectedGoal) {
            setGoalData({
                count: selectedGoal.count,
                date: new Date(selectedGoal.expirationDate),
                repository: selectedGoal.repository,
            });
        }
    }, [selectedGoal]);

    // Validation function for goal data
    const goalIsValid = () => {
        setShowCommitsError(false);
        setShowRepoError(false);
        setShowDateError(false);

        let valid = true;

        if (goalData.count <= 0) {
            setShowCommitsError(true);
            valid = false;
        }
        if (!goalData.repository) {
            setShowRepoError(true);
            valid = false;
        }

        if (new Date(goalData.date) <= new Date()) {
            setShowDateError(true);
            valid = false;
        }

        return valid;
    };

    // Function to create a new goal
    const createPost = async (event) => {
        event.preventDefault();

        if (goalIsValid()) {
            const newGoalData = {
                userId: userId.toString(),
                createdDate: new Date(),
                expirationDate: goalData.date,
                count: goalData.count,
                repository: goalData.repository.name,
                status: "active",
            };

            try {
                const response = await axios.post(
                    `${CONNECTION_URL}/goals/createGoal`,
                    newGoalData
                );
                setGoalData({
                    count: 0,
                    date: new Date(),
                    repository: null,
                });
                handleRerender();
            } catch (error) {
                console.error("Error while submitting post:", error);
            }
            onClose();
        }
    };

    // Function to edit an existing goal
    const editPost = async (event) => {
        event.preventDefault();

        if (goalIsValid()) {
            const newGoalData = {
                userId: userId.toString(),
                createdDate: selectedGoal.createdDate,
                expirationDate: goalData.date,
                count: goalData.count,
                repository: goalData.repository.name,
                status: "active",
            };

            try {
                const response = await axios.put(
                    `${CONNECTION_URL}/goals/${selectedGoal._id}`,
                    newGoalData
                );
                setGoalData({
                    count: 0,
                    date: new Date(),
                });

                handleRerender();
            } catch (error) {
                console.error("Error while submitting post:", error);
            }
            onClose();
        }
    };

    // Function to handle date change
    const handleDateChange = (date) => {
        setGoalData({
            ...goalData,
            date: date,
        });
    };

    // Render form
    return (
        <form
            onSubmit={selectedGoal._id ? editPost : createPost}
            className="lg:flex"
        >
            {/* Date picker for goal due date */}
            <div className="p-3">
                <h1 className="font-semibold text-whiteDark">Due Date</h1>
                <DatePicker handleDateChange={handleDateChange} />
            </div>

            {/* Input for number of commits */}
            <div className="p-3">
                <div className="mb-5">
                    <h1 className="font-semibold text-white mb-1">
                        Number of Commits
                    </h1>
                    <input
                        className="bg-whiteDark rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blueDark"
                        type="number"
                        value={goalData.count}
                        onChange={(event) => {
                            const regex = /^\d*$/;

                            if (regex.test(event.target.value)) {
                                setGoalData({
                                    ...goalData,
                                    count: event.target.value,
                                });
                            }
                        }}
                    />
                </div>

                {/* Dropdown for selecting repository */}
                <div>
                    <h1 className="font-semibold text-whiteDark mb-1">
                        Repository
                    </h1>
                    {repositories && repositories.length > 0 ? (
                        <select
                            className="rounded-sm mb-4 bg-whiteDark text-primaryDark"
                            value={
                                goalData.repository
                                    ? goalData.repository.name
                                    : "Select..."
                            }
                            onChange={(e) => {
                                const selectedRepo = repositories.find(
                                    (repo) => repo.name === e.target.value
                                );

                                setGoalData({
                                    ...goalData,
                                    repository: selectedRepo,
                                });
                            }}
                        >
                            <option>Select...</option>
                            {repositories.map((repo) => {
                                return (
                                    <option key={repo.name} value={repo.name}>
                                        {repo.name}
                                    </option>
                                );
                            })}
                        </select>
                    ) : (
                        <p>No repositories available.</p>
                    )}
                    <div className="">
                        <button
                            type="submit"
                            className="hover:bg-blueDark bg-secondaryBlue text-white font-semibold py-2 px-4 rounded"
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>

            {/* Error messages */}
            <div>
                <h1 className="text-redDark">
                    {showRepoError
                        ? "Error : Please enter a valid repository."
                        : ""}
                </h1>
                <h1 className="text-red-600">
                    {showCommitsError
                        ? "Error : Please enter a valid count."
                        : ""}
                </h1>
                <h1 className="text-red-600">
                    {showDateError ? "Error : Please enter a valid date." : ""}
                </h1>
            </div>
        </form>
    );
};

export default PostForm;
