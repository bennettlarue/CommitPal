import React from "react";
import PostForm from "./PostForm";

/*
This component is the full menu that appears when a goal is being edited or created.
It mainly acts as a wrapper for "PostForm".
*/

const GoalPopup = ({
    visible,
    onClose,
    userId,
    handleRerender,
    selectedGoal,
    CONNECTION_URL,
}) => {
    return (
        <div>
            {/* The popup container, visibility controlled by 'visible' prop */}
            <div
                className={`${
                    visible ? "visible" : "invisible"
                } border-2 border-blueDark rounded-lg shadow-md bg-secondaryDark`}
            >
                {/* Popup content area */}
                <div className=" p-5 ">
                    {/* Popup title, dynamically changes based on if editing or creating a goal */}
                    <h2 className="text-2xl font-bold text-whiteDark my-4">
                        <span className="">
                            {selectedGoal._id ? "Edit" : "Create"} a Goal
                        </span>
                    </h2>
                    {/* PostForm component for goal details */}
                    <div className="">
                        <PostForm
                            userId={userId}
                            handleRerender={handleRerender}
                            onClose={onClose}
                            selectedGoal={selectedGoal}
                            CONNECTION_URL={CONNECTION_URL}
                        />
                    </div>

                    {/* Cancel button to close the popup */}
                    <button
                        className="bg-red-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GoalPopup;
