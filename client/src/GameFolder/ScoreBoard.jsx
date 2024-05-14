import React from 'react'

const getScoreBoard = (players) => {
    const scoreBoard = players.filter(player => player.WPM !== -1);
    return scoreBoard.sort((a, b) => b.WPM - a.WPM);
}

const ScoreBoard = ({players}) => {
  const scoreBoard = getScoreBoard(players);
  if(scoreBoard.length === 0){
    return null;
  }
  else{
    return(
        <div>
            <h1>ScoreBoard</h1>
            <table>
            <thead>
                <tr>
                <th>Player</th>
                <th>WPM</th>
                </tr>
            </thead>
            <tbody>
                {scoreBoard.map((player, index) => {
                return(
                    <tr key = {index}>
                    <td>{player.nickName}</td>
                    <td>{player.WPM}</td>
                    </tr>
                )
                })}
            </tbody>
            </table>
        </div>
    )
  }
}

export default ScoreBoard
