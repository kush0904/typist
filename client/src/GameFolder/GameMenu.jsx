import React from "react";
import { Link } from "react-router-dom";

const GameMenu = () => {
    return (
        <div>
            <h1>Game Menu</h1>
            <Link to="/game/create">
                <button>Create Game</button>
            </Link>
            <Link to="/game/join">
                <button>Join Game</button>
            </Link>
        </div>
    );
}

export default GameMenu;
