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
import AuroraBackground from '../components/ui/aurora-background';
import useGameStore from '../store/useGameStore';

const TypeRacer = () => {
    const navigate = useNavigate();
    const gameState = useGameStore((state) => state.gameState);
    const setGameState = useGameStore((state) => state.setGameState);

    const findPlayer = (players) => {
        return players?.find(player => player.socketID === socket.id);
    }

    const { _id, players, words, isOpen, isOver } = gameState;
    const player = findPlayer(players);

    if (!_id || !player) {
        return (
            <AuroraBackground>
                <div className="flex flex-col items-center justify-center h-screen gap-6 z-50">
                    <h1 className="text-3xl md:text-5xl font-bold text-white text-center">You left the room.</h1>
                    <button
                        onClick={() => {
                            setGameState({ _id: "", isOpen: false, players: [], words: [] });
                            navigate('/');
                        }}
                        className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-fit px-6 py-3 rounded-full border border-zinc-500"
                    >
                        Go Home
                    </button>
                </div>
            </AuroraBackground>
        );
    }

    return (
        <AuroraBackground>
            <button
                onClick={() => {
                    socket.emit('leave-room', _id);
                    setGameState({ _id: "", isOpen: false, players: [], words: [] });
                    navigate('/');
                }}
                className="absolute top-28 left-8 z-50 bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-fit px-4 py-2 rounded-full border border-zinc-500"
            >
                &larr; Back to Home
            </button>
            {isOver && (
                <>
                    {player?.isPartyLeader ? (
                        <button
                            onClick={() => socket.emit('restart-game', _id)}
                            className="absolute top-28 right-8 z-50 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold w-fit px-4 py-2 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                        >
                            Play Again
                        </button>
                    ) : (
                        <div className="absolute top-28 right-8 z-50 text-white font-semibold flex items-center bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-700">
                            Waiting for leader to restart...
                        </div>
                    )}
                </>
            )}
            <div className="relative px-4 mt-[-10%]">
                <DisplayWords words={words} player={player} />
                <Form isOpen={isOpen} isOver={isOver} gameID={_id} />
                <ProgressBar players={players} player={player} wordsLength={words.length} />

                <Countdown />
                <StartBtn player={player} gameID={_id} />
                <DisplayCode gameID={_id} />
                <ScoreBoard players={players} />

            </div>
        </AuroraBackground>
    )
}

export default TypeRacer;
