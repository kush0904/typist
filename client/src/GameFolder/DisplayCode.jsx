import React, {useRef, useState} from 'react'


const DisplayCode = ({gameID}) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const textInput = useRef(null);

    const copyToClipboard =(e)=>{
        textInput.current.select();
        document.execCommand("copy");
        setCopySuccess(true);
    }
    return (
        <div>
        <h1>Send this code to your friends</h1>
            <input
                type="text"
                value={gameID}
                ref={textInput}
                readOnly
            />
            <button onClick={copyToClipboard}>Copy to Clipboard</button>
            {copySuccess ? <div style={{color: 'green'}}>Copied!</div> : null}
        </div>
    )
}

export default DisplayCode;