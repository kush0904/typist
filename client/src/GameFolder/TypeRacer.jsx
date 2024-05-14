import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Countdown from './Countdown';
import StartBtn from './StartBtn';
import socket from '../socketConfig';
import DisplayWords from './DisplayWords';
import Form from './Form';
import ProgressBar from './ProgressBar';
import ScoreBoard from './ScoreBoard';
import DisplayCode from './DisplayCode';

const TypeRacer = ({ gameState }) => {
    const navigate = useNavigate(); 

    useEffect(() => {
        if (gameState._id === "") {
            navigate("/game");
        }
    }, [gameState._id, navigate]);

    const findPlayer = (players) => {
        return players.find(player => player.socketID === socket.id);
    }

    const {_id, players, words, isOpen, isOver} = gameState;
    const player = findPlayer(players);

    return (
        <div className='text-center'>
            <DisplayWords words = {words} player = {player} />
            <ProgressBar players = {players} player = {player} wordsLength = {words.length} />
            <Form isOpen = {isOpen} isOver = {isOver} gameID = {_id} />
            <Countdown />
            <StartBtn player={player} gameID={_id} />
            <DisplayCode gameID = {_id}/>
            <ScoreBoard players = {players} />
        </div>
    )
}

export default TypeRacer;
