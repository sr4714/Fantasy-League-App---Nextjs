import React, {useState, useEffect} from 'react'
import Image from 'next/image';

export const SearchResult = ({result, players, setPlayers, setResults, getScore}) => {


  const [photo, setPhoto] = useState();
  const [key, setKey] = useState();
  useEffect(() => {
    fetch("/api/getKey").then(response => response.json()).then(data => {setKey(data.key);}).then(() => fetchPlayer());

  },[]);

  const fetchPlayer = () => {

    const url = 'https://footapi7.p.rapidapi.com/api/player/'+result.entity.id+'/image';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'footapi7.p.rapidapi.com'

        }
    };

    try {
        fetch(url, options).then(response => response.blob()).then(blob => {setPhoto(URL.createObjectURL(blob))});

      
        }
        
        
      catch (error) {
        console.error(error);
      }

  
}

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
    <div className = "search-result" onClick={(e) => handleClick()}>
    {console.log(photo)}
        <img src={photo} alt='player photo' width={100} height={100}/>
        <div className='player'>
          <div>{result.entity.name}</div>
          <div>{result.entity.team.name}</div>
          <div>{result.score}</div>
        </div>
        
        
    </div>
  )
}
