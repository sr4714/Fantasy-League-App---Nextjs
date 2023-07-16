import React from 'react'

export const SearchResult = ({result, players, setPlayers, setResults, getScore}) => {


 

  function handleClick(){
    const player = {
      name: result.entity.name,
      score: result.score,

      id: result.entity.id
    }
    let temp = players;
    temp.push(player);
    setPlayers(temp);
    setResults([]);
    getScore();
  }
  
  return (
    <div onClick={(e) => handleClick()}>
        <div>{result.entity.name}</div><div>{result.score}</div>
        
    </div>
  )
}
