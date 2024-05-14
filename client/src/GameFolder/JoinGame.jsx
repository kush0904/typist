import React, { useState } from 'react';
import socket from '../socketConfig';

const JoinGame = () => {
    const [userInput, setUserInput] = useState({ gameID: null, nickName: null });

    const onChange = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value });
    }
    
    const submitButton = (e) => {
        e.preventDefault();
        console.log(userInput);
        socket.emit('join-game', userInput);
    };
    
    return (
        <div>
            <h1>Join Game</h1>
            <input type="text" name="gameID" placeholder="Enter Game ID" value={userInput.gameID || ''} onChange={onChange} />
            <input type="text" name="nickName" placeholder="Enter Nickname" value={userInput.nickName || ''} onChange={onChange} />
            <button onClick={submitButton}>Join Game</button>
        </div>
    );
}

export default JoinGame;
