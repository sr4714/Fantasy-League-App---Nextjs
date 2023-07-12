import React from 'react'
import { SearchResult } from './SearchResult';

export const SearchResultsList = ({ results, players, setPlayers, setResults }) => {
  
    return (
    <div className='results-list'>
    {
        results.map((result, id) => {
            return <SearchResult result={result} key={id} players={players} setPlayers={setPlayers} setResults={setResults}/>
        })}
    </div>
  )
}
