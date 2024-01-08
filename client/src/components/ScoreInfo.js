import React from "react";

const ScoreInfo = ({ userScore }) => {
    return (
        <div className="m-5 text-3xl font-bold lg:mx-5 text-center text-whiteDark">
            <span className="p-4 rounded-xl bg-primaryDark shadow-md shadow-greenDark">
                {"My Score: "}
                <span className="text-greenDark">{userScore}</span>
            </span>
        </div>
    );
};

export default ScoreInfo;
