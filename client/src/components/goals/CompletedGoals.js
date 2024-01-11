import React from "react";
import { handleDelete, addPoints } from "../../utils/api";

/* This component displays a list of all goals that currently have the status "completed". */

const CompletedGoals = ({
    repositories,
    goals,
    commitsCompleted,
    userId,
    handleRerender,
}) => {
    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2">
            {/* Mapping over each goal to create its visual representation */}
            {goals
                .filter((goal) => goal.status === "completed")
                .map((goal) => {
                    const goalRepo = repositories.find(
                        (repo) => repo.name === goal.repository
                    );

                    return (
                        <div className="my-2 lg:mx-4 font-semibold p-2 bg-secondaryDark border-greenDark border-2 rounded-lg shadow-md">
                            {/* Goal details and status */}

                            {goalRepo &&
                            typeof commitsCompleted[goal._id] !==
                                "undefined" ? (
                                <div>
                                    <div className="font-bold mb-0.5 text-greenDark">
                                        {goal.repository}
                                    </div>
                                    {/* Goal status label */}
                                    <div className="text-whiteDark mb-0.5">
                                        {commitsCompleted[goal._id]} /
                                        {" " + goal.count + " "}
                                        {goal.count === 1
                                            ? "commit"
                                            : "commits"}
                                    </div>

                                    {/* Goal details and progress */}
                                    <div className="flex">
                                        <button
                                            className="bg-secondaryGreen text-whiteDark shadow-md p-1.5 m-1 mt-2 transition-all duration-200 rounded-lg hover:bg-greenDark"
                                            onClick={() => {
                                                console.log(goal.points);
                                                addPoints(userId, goal.points);
                                                handleDelete(
                                                    goal._id,
                                                    handleRerender
                                                );
                                            }}
                                        >
                                            {"Claim " +
                                                goal.points +
                                                " points!"}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    );
                })}
        </div>
    );
};

export default CompletedGoals;
