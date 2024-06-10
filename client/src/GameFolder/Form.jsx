import React, {useState, useEffect, useRef} from "react";
import socket from '../socketConfig';
import {motion} from 'framer-motion';

const Form = ({isOpen, isOver, gameID}) => {
    const [userInput, setUserInput] = useState("");
    const textInput = useRef(null);

    const border = "1px solid white";
    const boxShadow = "0px 4px 24px black";

    useEffect(()=>{
        if(!isOpen){
            textInput.current.focus();
        }
    },[isOpen])
    const resetForm = () => {
        setUserInput("");
    }


    const onChange = (e) => {
        let value = e.target.value;
        let lastChar = value.charAt(value.length - 1);
        if(lastChar === " "){
            socket.emit('userInput', {userInput, gameID});
            resetForm();
        }
        else{
            setUserInput(e.target.value);
        }
    }

    return (
        <div className="flex justify-center mt-4 outline-none mb-4">
            <div>
                <div>
                        <div>
                        <motion.input
                    type="text"
                    readOnly = {isOpen || isOver}
                    value={userInput}
                    onChange={onChange}
                    ref = {textInput}
                    className="group relative flex w-fit items-center gap-1.5 bg-gray-950/10 px-4 py-2 text-gray-50 hover:bg-gray-950/50"
                    placeholder="type here"
                

                    style={{
                        border,
                        boxShadow,
                    }}
                    whileHover={{
                        scale: 1.015,
                    }}
                    whileTap={{
                        scale: 0.985,
                    }}
                />
                            {/* <input
                                type="text"
                                readOnly = {isOpen || isOver}
                                value={userInput}
                                onChange={onChange}
                                ref = {textInput}
                                className="outline-none w-[20vw] h-[6vh]"
                                placeholder="type here"
                            /> */}
                        </div>
                </div>
            </div>
        </div>
    )   
}

export default Form;