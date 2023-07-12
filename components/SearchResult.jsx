import React from 'react'

export const SearchResult = ({result, players, setPlayers, setResults}) => {

  function handleClick(){
    let temp = players;
    temp.push(result);
    setPlayers(temp);
    setResults([]);
  }
  return (
    <div onClick={(e) => handleClick()}>
        {result.score}
    </div>
  )
}
