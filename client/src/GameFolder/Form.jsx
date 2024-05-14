import React, {useState, useEffect, useRef} from "react";
import socket from '../socketConfig';

const Form = ({isOpen, isOver, gameID}) => {
    const [userInput, setUserInput] = useState("");
    const textInput = useRef(null);

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
        <div>
            <div></div>
            <div>
                <form>
                    <div>
                        <input
                            type="text"
                            readOnly = {isOpen || isOver}
                            value={userInput}
                            onChange={onChange}
                            ref = {textInput}
                        />
                    </div>
                </form>
            </div>
            <div></div>
        </div>
    )
}

export default Form;