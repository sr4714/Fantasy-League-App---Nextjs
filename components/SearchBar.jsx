import React, {use, useEffect, useState} from 'react'
import { FaSearch } from "react-icons/fa";


export const SearchBar = ({setResults  }) => {



    const [input, setInput] = useState();
    const [key, setKey] = useState("key");
    useEffect(() => {
      fetch("/api/getKey").then(response => response.json()).then(data => {setKey(data.key);});
    },[]);
    const fetchPlayer = (value) => {

        const url = 'https://footapi7.p.rapidapi.com/api/search/'+value;
        
          //let x;
          //const res =  fetch("/api/getData").then(response => response.json()).then(data => {return data.key;});
          
    
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': key,
                'X-RapidAPI-Host': 'footapi7.p.rapidapi.com'

            }
        };

        try {
            fetch(url, options).then(response => response.json()).then(json => {
                const results = Object.values(json).filter((player) => {
                            return  player;
                        });
                        const x = results[0].filter(result => result.type === 'player');
              setResults(x);
              //console.log(x);
            
            
            });
            
            
          } catch (error) {
            console.error(error);
          }

      
    }

    const handleChange = (value) => {
        if(value.length>1){
          
          fetchPlayer(value);
        }
        setInput(value);
        
    };
  return (
    <div className='input-wrapper'>
    <FaSearch id="search-icon" />
    
        <input
            id='input-search'
            placeholder='Search Player'
            value={input}
            onChange={(e) => handleChange(e.target.value)}
        />

    
    </div>
  )
}
