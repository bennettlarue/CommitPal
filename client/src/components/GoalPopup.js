import React from "react";
import PostForm from "./PostForm";

const GoalPopup = ({
    visible,
    onClose,
    userId,
    handleRerender,
    selectedGoal,
}) => {
    return (
        <div>
            <div
                className={`${
                    visible ? "visible" : "invisible"
                } border-2 border-blueDark rounded-lg shadow-md bg-secondaryDark`}
            >
                <div className=" p-5 ">
                    <h2 className="text-2xl font-bold text-whiteDark my-4">
                        <span className="">
                            {selectedGoal._id ? "Edit" : "Create"} a Goal
                        </span>
                    </h2>
                    <div className="">
                        <PostForm
                            userId={userId}
                            handleRerender={handleRerender}
                            onClose={onClose}
                            selectedGoal={selectedGoal}
                        />
                    </div>

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
