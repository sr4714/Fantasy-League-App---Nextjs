import React from 'react'
import { SearchResult } from './SearchResult';


export const SearchResultsList = ({ results, players, setPlayers, setResults, getScore }) => {
  
    return (
    <div className='results-list'>
    {
        results.map((result, id) => {
            return <SearchResult result={result} key={id} players={players} setPlayers={setPlayers} setResults={setResults} getScore={getScore}/>
        })}
    </div>
  )
}
