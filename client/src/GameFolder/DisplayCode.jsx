import React, { useRef, useState } from 'react';

const DisplayCode = ({ gameID }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const textInput = useRef(null);

  const copyToClipboard = () => {
    textInput.current.select();
    document.execCommand('copy');
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 4000);
  };

  return (
<div className="fixed bottom-0 left-0 w-full flex justify-center pb-3">
  <div className="bg-zinc-900 w-full max-w-md dark:bg-gray-800 p-3 rounded-lg shadow-md mx-4">
    <h1 className="text-xl text-white font-bold mb-4">Send this code to your friends</h1>
    <div className="flex items-center mb-4">
      <input
        type="text"
        value={gameID}
        ref={textInput}
        readOnly
        className="flex-grow bg-gray-700 text-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 mr-2 focus:outline-none"
      />
      <button
        onClick={copyToClipboard}
        className="bg-zinc-200 hover:bg-zinc-600 hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none"
      >
        Copy to Clipboard
      </button>
    </div>
    {copySuccess && (
      <div className="text-green-500">Copied!</div>
    )}
  </div>
</div>

  );
};

export default DisplayCode;
