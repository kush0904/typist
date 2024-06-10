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

    return (
        isPartyLeader && showBtn ? (
          <div className="flex relative justify-center">
            <button onClick={onClickHandler} className="bg-black border-2 border-white dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2 hover:shadow-[0px_0px_13px_2px_#e2e8f0]">
              Start Game
            </button>
          </div>
        ) : null
      );

    
}

export default StartBtn;
