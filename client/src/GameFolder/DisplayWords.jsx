import React from "react";

const typedCorrectlyStyle = {
    "backgroundColor" : 'green',
}

const getTypedWords = (words, player) =>{
    let typedWords = words.slice(0, player.currentWordIndex);
    typedWords = typedWords.join(" ");
    return <span initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: 0.01 } }}
    exit={{ opacity: 0 }}
   className="text-emerald-500 text-4xl font-bold">{typedWords} </span>
}


const currentStyle = {
    "textDecoration" : "none"
}


const getCurrentWord = (words, player) => {
    return <span initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: 0.01 } }}
    exit={{ opacity: 0 }}
   className="text-yellow-500 text-4xl font-bold" style = {currentStyle}>{words[player.currentWordIndex]}</span>
}


const getWordsToBeTyped = (words, player) => {
    let wordsToBeTyped = words.slice(player.currentWordIndex + 1, words.length);
    wordsToBeTyped = wordsToBeTyped.join(" ");
    return <span initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: 0.01 } }}
    exit={{ opacity: 0 }}
   className="text-white text-4xl font-bold"> {wordsToBeTyped}</span>
}

const DisplayWords = ({words, player}) => {
    return (
       <div className="mx-5">
            {getTypedWords(words, player)}
            {getCurrentWord(words, player)}
            {getWordsToBeTyped(words, player)}
       </div>
    )
}

export default DisplayWords;