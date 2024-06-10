import React, {useState, useEffect} from 'react';

import socket from '../socketConfig';

const Countdown = (props) => {
    const [timer, setTimer] = useState({countDown : "", msg : ""});

    useEffect(()=>{
        socket.on('timer', (data) => {
            setTimer(data);
        });

        socket.on('done', () => {
            socket.removeListener('timer');
        })
    },[]);

    const {countDown, msg} = timer;
    return (
<div className='flex items-center justify-center fixed top-0 left-0 right-0 m-4 flex-col'>
    <h1 className='text-2xl font-bold text-white'>{countDown}</h1>
    <h2 className='text-2xl text-gray-300'>{msg}</h2>
</div>

    )
}

export default Countdown;