import React, { useState } from "react";

const TimeButton = ({ yearClick, monthClick, weekClick }) => {
    //bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500

    const [buttonsPushed, setButtonsPushed] = useState([false, true, false]);

    const pushedStyle =
        "border border-x-black bg-plocheresVermilion text-cetaceanBlue font-bold py-2 px-4 border-t-6 border-darkBlue transition-all duration-100";
    const unPushedStyle =
        "shadow-lg border border-x-black bg-beer text-cetaceanBlue font-bold py-2 px-4 border-b-8 border-cetaceanBlue transition-all duration-100";

    return (
        <div className="mt-4 text-1xl">
            <div className="bg-cetaceanBlue inline-flex items-center rounded font-semibold border border-black">
                <button
                    className={buttonsPushed[0] ? pushedStyle : unPushedStyle}
                    onClick={() => {
                        setButtonsPushed([true, false, false]);
                        yearClick();
                    }}
                >
                    Year
                </button>
                <button
                    className={buttonsPushed[1] ? pushedStyle : unPushedStyle}
                    onClick={() => {
                        setButtonsPushed([false, true, false]);
                        monthClick();
                    }}
                >
                    Month
                </button>
                <button
                    className={buttonsPushed[2] ? pushedStyle : unPushedStyle}
                    onClick={() => {
                        setButtonsPushed([false, false, true]);
                        weekClick();
                    }}
                >
                    Week
                </button>
            </div>
        </div>
    );
};

export default TimeButton;
