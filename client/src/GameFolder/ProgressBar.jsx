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
            <div key={player._id}>
                <h4 className="text-white">{player.nickName}</h4>
                <div className="progress my-2">
                    <div
                        className="progress-bar"
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
                    <div key={playerObj._id}>
                        <h4 className=" text-white">{playerObj.nickName}</h4>
                        <div className="progress my-2">
                            <div
                                className="progress-bar"
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
