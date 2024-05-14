import React, {useState} from 'react';
import socket from '../socketConfig';

const CreateGame = () => {
    const [nickName, setNickName] = useState("");
    
    return (
        <div>
            <h1>Create Game</h1>
            <input type="text" placeholder="Enter Nickname" value={nickName} onChange={(e) => setNickName(e.target.value)} />
            <button onClick={() => socket.emit('create-game', nickName)}>Create Game</button>
        </div>
    )
}

export default CreateGame;