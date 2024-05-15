import React, {useState} from "react";
import socket from '../socketConfig';

const StartBtn = ({player, gameID}) => {

    const [showBtn, setShowBtn] = useState(true);

    const {isPartyLeader} = player;

    const onClickHandler = (e) => {
        e.preventDefault();
        socket.emit('timer', {playerID : player._id, gameID});
        setShowBtn(false);
    }

    return(
        isPartyLeader && showBtn ? <button onClick={onClickHandler} className='text-white z-20'>
            Start Game
        </button>

        : null
    )

    
}

export default StartBtn;
