import React from "react";

const calculatePercentage = (player, wordsLength) => {
    if (player.currentWordIndex !== 0) {
        return ((player.currentWordIndex / wordsLength) * 100).toFixed(2) + "%";
    } else {
        return 0;
    }
}

const ProgressBar = ({ players, player, wordsLength }) => {
    const percentage = calculatePercentage(player, wordsLength);

    return (
        <div>
            <div key={player._id} className="flex px-7 text-center items-center">
            <div className="text-white mr-5">{player.nickName}</div>

                <div className="progress my-2 w-full">

                    <div
                        className="progress-bar bg-blue-900 text-white"
                        role="progressbar"
                        style={{ width: percentage }}
                    >
                        {percentage}
                    </div>
                </div>
            </div>

            {players.map(playerObj => {
                const percentage = calculatePercentage(playerObj, wordsLength); // Use playerObj here
                return playerObj._id !== player._id ? (

                    <div key={playerObj._id} className="flex px-7 text-center items-center">
                    <div className=" text-white mr-5">{playerObj.nickName}</div>

                    <div className="progress my-2 w-full">


                            <div
                                className="progress-bar bg-red-700 text-white"
                                role="progressbar"
                                style={{ width: percentage }}
                            >
                                {percentage}
                            </div>
                        </div>
                    </div>
                ) : null;
            })}
        </div>
    );
}

export default ProgressBar;
