import React from "react";
import { handleDelete, formatDateString } from "../../utils/api";

/* This component displays a list of all goals that currently have the status "active". */

const ActiveGoals = ({
    repositories,
    goals,
    commitsCompleted,
    handleRerender,
    setSelectedGoal,
    setShowCreateWindow,
}) => {
    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2">
            {/* Mapping over each goal to create its visual representation */}
            {goals
                .filter((goal) => goal.status === "active")
                .map((goal) => {
                    // Finding the repository associated with the current goal
                    const goalRepo = repositories.find(
                        (repo) => repo.name === goal.repository
                    );

                    return (
                        <div className="my-2 lg:mx-4 font-semibold p-2 bg-secondaryDark border-blueDark border-2 rounded-lg shadow-md">
                            {/* Displaying goal details and status */}
                            {goalRepo &&
                            typeof commitsCompleted[goal._id] !==
                                "undefined" ? (
                                <div>
                                    {/* Section for goal status label */}
                                    <div className="flex">
                                        <div className="font-bold mb-0.5 text-blueDark">
                                            {goal.repository}
                                        </div>
                                        <div className="ml-3 translate-y-0.5">
                                            {/* Delete goal button */}
                                            <button
                                                className="ring-2 ring-whiteDark p-0.5 mr-3 rounded-lg transition-all duration-200 hover:bg-redDark"
                                                onClick={() =>
                                                    handleDelete(
                                                        goal._id,
                                                        handleRerender
                                                    )
                                                }
                                            >
                                                <img
                                                    src="https://i.imgur.com/0gV2rjc.pngg"
                                                    className="w-5 p-0.5"
                                                    alt="Delete Goal"
                                                />
                                            </button>
                                            {/* Edit goal button */}
                                            <button
                                                className="ring-2 ring-whiteDark p-0.5 mr-3 rounded-lg transition-all duration-200 hover:bg-blueDark"
                                                onClick={() => {
                                                    setSelectedGoal(goal);
                                                    setShowCreateWindow(true);
                                                }}
                                            >
                                                <img
                                                    src="https://i.imgur.com/hHoGpud.png"
                                                    className="w-5 p-0.5"
                                                    alt="Edit Goal"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                    {/* Displaying the number of commits completed out of the goal */}
                                    <div className="mb-0.5 text-whiteDark">
                                        {commitsCompleted[goal._id]} /
                                        {" " + goal.count + " "}
                                        {goal.count === 1
                                            ? "commit"
                                            : "commits"}
                                    </div>
                                    {/* Displaying the points associated with the goal */}
                                    <div className="mb-0.5 text-whiteDark">
                                        {"Points: " + goal.points}
                                    </div>
                                    {/* Goal expiration date */}
                                    <div className="flex text-whiteDark">
                                        <div className="mt-1 text-xl flex">
                                            <img
                                                className="w-7 mr-2"
                                                src="https://i.imgur.com/wrXzonF.png"
                                                alt="Due"
                                            ></img>
                                            {formatDateString(
                                                goal.expirationDate
                                            )}
                                        </div>
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

export default ActiveGoals;
