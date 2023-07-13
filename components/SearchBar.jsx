import React, {use, useEffect, useState} from 'react'


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
          
        console.log(key);
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
            setResults(results[0]);
            console.log(results[0]);
            });
            
            
          } catch (error) {
            console.error(error);
          }

        // fetch("https://jsonplaceholder.typicode.com/users")
        // .then(response => response.json())
        // .then(json => {
        //     const results = json.filter((player) => {
        //         return value && player && player.name && player.name.toLowerCase().includes(value.toLowerCase());
        //     });
        //     setResults(results);
        // });
    }

    const handleChange = (value) => {
        if(value.length>1){
          console.log(value.length);
          fetchPlayer(value);
        }
        setInput(value);
        
    };
  return (
    <div className='input-wrapper'>
        <input
            placeholder='Search Player'
            value={input}
            onChange={(e) => handleChange(e.target.value)}
        />

    
    </div>
  )
}
