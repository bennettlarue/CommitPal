import React from "react";
import { handleDelete, formatDateString } from "../../utils/api";

/* This component displays a list of all goals that currently have the status "expired". */

const ExpiredGoals = ({
    repositories,
    goals,
    commitsCompleted,
    handleRerender,
}) => {
    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2">
            {/* Mapping over each goal to create its visual representation */}
            {goals
                .filter((goal) => goal.status === "expired")
                .map((goal) => {
                    const goalRepo = repositories.find(
                        (repo) => repo.name === goal.repository
                    );

                    return (
                        <div className="my-2 lg:mx-4 font-semibold p-2 bg-secondaryDark border-redDark border-2 rounded-lg shadow-md">
                            {/* Goal details and status */}

                            {goalRepo &&
                            typeof commitsCompleted[goal._id] !==
                                "undefined" ? (
                                <div>
                                    <div className="font-bold mb-0.5 text-redDark">
                                        {goal.repository}
                                    </div>
                                    {/* Goal status label */}
                                    <div className="text-whiteDark mb-1">
                                        {commitsCompleted[goal._id]} /
                                        {" " + goal.count + " "}
                                        {goal.count === 1
                                            ? "commit"
                                            : "commits"}
                                    </div>
                                    {/* Goal details and progress */}
                                    <div className="flex">
                                        <button
                                            className=" text-whiteDark bg-secondaryRed shadow-md p-1.5 m-1 mt-2 transition-all duration-200 rounded-lg hover:bg-red-500"
                                            onClick={() => {
                                                console.log(goal.points);
                                                handleDelete(
                                                    goal._id,
                                                    handleRerender
                                                );
                                            }}
                                        >
                                            Dismiss
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

export default ExpiredGoals;
