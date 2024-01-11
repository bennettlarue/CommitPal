import React, { useEffect, useState } from "react";
import GoalPopup from "./GoalPopup";
import CompletedGoals from "./goals/CompletedGoals";
import ActiveGoals from "./goals/ActiveGoals";
import ExpiredGoals from "./goals/ExpiredGoals";
import axios from "axios";
import { getCommitsInRepo, getRepos, getCommitsInRange } from "../utils/api";

/* Component responsible for rendering all goals, as well as the popup for creating or editing a goal. */

const Posts = ({ userId, rerender, handleRerender, CONNECTION_URL }) => {
    // State variables to manage goals, commits, repositories, and UI elements
    const [goals, setGoals] = useState([]);
    const [commitsCompleted, setCommitsCompleted] = useState({});
    const [repositories, setRepositories] = useState([]);
    const [repoCommits, setRepoCommits] = useState({});
    const [selectedGoal, setSelectedGoal] = useState({});
    const [showCreateWindow, setShowCreateWindow] = useState(false);

    // useEffect hook to fetch data on component mount and when dependencies change
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all of the users repositories and store them in a state
                const repos = await getRepos();
                setRepositories(repos);

                // Fetch all of the users goals and store the in a state
                const response = await axios.get(
                    `${CONNECTION_URL}/goals/${userId}`
                );
                setGoals(response.data);

                const updatedCommitsCompleted = {};

                // Go through each goal and check its status and commit count
                await Promise.all(
                    response.data.map(async (goal) => {
                        // Fetching commits for the repository if not already done
                        if (!(goal.repository in repoCommits)) {
                            const commits = await getCommitsInRepo(
                                goal.repository,
                                userId
                            );
                            // Add new item to repoCommits with repo and commit number
                            setRepoCommits((prevRepoCommits) => ({
                                ...prevRepoCommits,
                                [goal.repository]: commits,
                            }));
                        }

                        // Calculating how many commits have been made in this goals date range
                        const commitsNumber = getCommitsInRange(
                            repoCommits[goal.repository],
                            goal.createdDate,
                            goal.expirationDate
                        );

                        // Updating the count of completed commits for the goal
                        updatedCommitsCompleted[goal._id] = commitsNumber;

                        // Refresh goal status by checking if its completed, expired, or active
                        let newStatus;
                        if (commitsNumber >= goal.count)
                            newStatus = "completed";
                        else if (new Date() > new Date(goal.expirationDate))
                            newStatus = "expired";
                        else newStatus = "active";

                        // Updating the goal with the new status
                        const newGoalData = { ...goal, status: newStatus };
                        await axios.put(
                            `${CONNECTION_URL}/goals/${goal._id}`,
                            newGoalData
                        );
                    })
                );

                // Setting the updated commits count in state
                setCommitsCompleted(updatedCommitsCompleted);
            } catch (error) {
                console.error("Error while fetching goals:", error);
            }
        };

        fetchData();
    }, [rerender, userId, repoCommits]);

    // Rendering the component UI
    return (
        <div className="bg-primaryDark rounded-md lg:mx-5 shadow-xl">
            <div className="rounded-t-md p-3">
                <div className="flex items-center py-1 pl-3 text-whiteDark">
                    <h1 className="font-bold text-3xl">My Commit Goals</h1>
                    <div className="p-2">
                        {/* Button to open the goal creation window */}
                        <button
                            className="ml-2 text-sm ring-2 ring-whiteDark p-1.5 rounded-lg hover:bg-redDark bg-secondaryDark duration-200 transform font-semibold"
                            onClick={() => {
                                setSelectedGoal({
                                    count: 1,
                                    expirationDate: new Date().toISOString(),
                                });
                                setShowCreateWindow(true);
                            }}
                        >
                            {"+ New Goal"}
                        </button>
                    </div>
                </div>

                {/* Conditionally rendering the GoalPopup component if showCreateWindow is true */}
                {showCreateWindow && (
                    <GoalPopup
                        visible={showCreateWindow}
                        onClose={() => setShowCreateWindow(false)}
                        userId={userId}
                        handleRerender={handleRerender}
                        selectedGoal={selectedGoal}
                        CONNECTION_URL={CONNECTION_URL}
                    />
                )}
            </div>
            <div>
                {/* Rendering active goals*/}
                {/* Display a message if there are no active goals. */}
                <div className="border-b-4 border-secondaryDark">
                    <div className="px-8 py-5">
                        <div className="p-1 mb-1.5">
                            <span className="text-blueDark text-2xl font-semibold">
                                Active Goals ⚑
                            </span>
                        </div>
                        {goals.filter((goal) => goal.status === "active")
                            .length > 0 ? (
                            <ActiveGoals
                                repositories={repositories}
                                goals={goals}
                                commitsCompleted={commitsCompleted}
                                handleRerender={handleRerender}
                                setSelectedGoal={setSelectedGoal}
                                setShowCreateWindow={setShowCreateWindow}
                            />
                        ) : (
                            <div className="text-whiteDark text-center pb-16">
                                No active goals... Get started by creating one!
                            </div>
                        )}
                    </div>
                </div>

                {/* Rendering completed goals*/}
                {/* Only appears if there is at least one completed goal. */}
                {goals.filter((goal) => goal.status === "completed").length >
                    0 && (
                    <>
                        <div className="border-b-4 border-secondaryDark">
                            <div className="px-8 py-5">
                                <div className="p-1 mb-1.5">
                                    <span className="text-greenDark text-2xl font-semibold">
                                        Completed Goals ✔
                                    </span>
                                </div>
                                <CompletedGoals
                                    repositories={repositories}
                                    goals={goals}
                                    commitsCompleted={commitsCompleted}
                                    userId={userId}
                                    handleRerender={handleRerender}
                                />
                            </div>
                        </div>
                    </>
                )}

                {/* Rendering expired goals*/}
                {/* Only appears if there is at least one expired goal. */}
                {goals.filter((goal) => goal.status === "expired").length >
                    0 && (
                    <>
                        <div className="border-b-4 border-secondaryDark">
                            <div className="px-8 py-5">
                                <div className="p-1 mb-1.5">
                                    <span className="text-redDark text-2xl font-semibold">
                                        Expired Goals ✖
                                    </span>
                                </div>
                                <ExpiredGoals
                                    repositories={repositories}
                                    goals={goals}
                                    commitsCompleted={commitsCompleted}
                                    handleRerender={handleRerender}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Posts;
