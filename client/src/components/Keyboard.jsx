import React, { useState, useEffect } from 'react';
import './Keyboard.css';
import { Link } from 'react-router-dom';


export default function Keyboard() {
    const [pressedKey, setPressedKey] = useState('');
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            setPressedKey(event.key);
        };

        const handleKeyUp = () => {
            setPressedKey('');
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        const isSmallOrMediumDevice = () => {
            const screenWidth = window.innerWidth;
            return screenWidth <= 768; 
        };

        if (!isSmallOrMediumDevice()) {
            setIsKeyboardOpen(true);
        } else {
            alert("Please use a laptop or PC for better keyboard experience.");
            setIsKeyboardOpen(false);
        }
    }, []);

    const closeKeyboard = () => {
        setIsKeyboardOpen(false);
    };

    const openKeyboard = () => {
        setIsKeyboardOpen(true);
    }


    if (isKeyboardOpen) {
        return (
            <div className='keyboard'>
                <div className="keyboardcontainer">
                <div className="container">
                    <div className="row">
                        {['~.`', '!.1', '@.2', '#.3', '$.4', '%.5',
                            '^.6', '&.7', '*.8', '(.9', ').0', '_.-', '+.=',
                            '<i className="fa-solid fa-delete-left"></i>']
                            .map((keyvalue, index) => (
                                <div key={index} className={`key ${pressedKey === keyvalue ? 'highlight' : ''}`}>
                                    {keyvalue.includes('.') ? (
                                        keyvalue.split('.').map((part, index) => (
                                            <span key={index}>{part}</span>
                                        ))
                                    ) : (
                                        keyvalue === '<i className="fa-solid fa-delete-left"></i>'
                                            ? (
                                                <i className="fa-solid fa-delete-left"></i>
                                            ) : (
                                                <span>{keyvalue}</span>
                                            )
                                    )}
                                </div>
                            ))}
                    </div>
                    <div className="row">
                        {['Tab', 'q', 'w', 'e', 'r', 't', 'y',
                            'u', 'i', 'o', 'p', '{_[', '}_]', '|_\\']
                            .map((keyvalue, index) => (
                                <div key={index} className={`key ${pressedKey === keyvalue ? 'highlight' : ''}`}>
                                    {keyvalue.includes('_') ? (
                                        keyvalue.split('_').map((part, index) => (
                                            <span key={index}>{part}</span>
                                        ))
                                    ) : (
                                        <span>{keyvalue}</span>
                                    )}
                                </div>
                            ))}
                    </div>
                    <div className="row">
                        {['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h',
                            'j', 'k', 'l', ':_;', '"_\'', 'Enter']
                            .map((keyvalue, index) => (
                                <div key={index} className={`key ${pressedKey === keyvalue ? 'highlight' : ''}`}>
                                    {keyvalue.includes('_') ? (
                                        keyvalue.split('_').map((part, index) => (
                                            <span key={index}>{part}</span>
                                        ))
                                    ) : (
                                        <span>{keyvalue}</span>
                                    )}
                                </div>
                            ))}
                    </div>
                    <div className="row">
                        {['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm',
                            '<_,', '>_.', '?_/', 'Shift'].map((keyvalue, index) => (
                                <div key={index} className={`key ${pressedKey === keyvalue ? 'highlight' : ''}`}>
                                    {keyvalue.includes('_') ? (
                                        keyvalue.split('_').map((part, index) => (
                                            <span key={index}>{part}</span>
                                        ))
                                    ) : (
                                        <span>{keyvalue}</span>
                                    )}
                                </div>
                            ))}
                    </div>
                    <div className="row">
                        {['Ctrl', 'Alt', ' ', 'Ctrl', 'Alt', '<', '>']
                            .map((keyvalue, index) => (
                                <div key={index} className={`key ${pressedKey === keyvalue ? 'highlight' : ''}`}>
                                    <span>{keyvalue}</span>
                                </div>
                            ))}
                    </div>
                    </div>
                    </div>
                <button onClick={() => { closeKeyboard(); document.activeElement.blur(); }}>Close Keyboard</button>
                            
            </div>
        );
    } else {
        return (

             <div className="flex flex-col mt-40  z-10">
            <button onClick={() => { openKeyboard(); document.activeElement.blur(); }} className="text-white w-full  font-bold py-2 px-4 rounded hover:shadow-[0px_0px_13px_10px_#e2e8f0] bg-black">Open Keyboard</button>


            <Link to="/" className='text-white w-full mt-4 font-bold py-2 px-4 rounded bg-black text-center hover:shadow-[0px_0px_13px_10px_#e2e8f0]'>
              Home
            </Link>
          </div>

        );
    }
}