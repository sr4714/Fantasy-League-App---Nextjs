import React, {useState} from 'react'

export const SearchBar = ({setResults  }) => {

    const [input, setInput] = useState();
    const fetchPlayer = (value) => {

        const url = 'https://footapi7.p.rapidapi.com/api/search/'+value;
        
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'ab2eb352b2msh88895f324971f1cp18da31jsna309a740cb2e',
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
