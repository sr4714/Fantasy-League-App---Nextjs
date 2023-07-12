import React, {useState} from 'react'
import { Layout } from 'components/users';
import { SearchBar } from 'components/SearchBar';
import { SearchResultsList } from 'components/SearchResultsList';



const Search = () => {

  const url = 'https://footapi7.p.rapidapi.com/api/search/ronaldo';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ab2eb352b2msh88895f324971f1cp18da31jsna309a740cb2e',
      'X-RapidAPI-Host': 'footapi7.p.rapidapi.com'
    }
  };
  
  try {
    const response =  fetch(url, options).then(response => response.json()).then(json => console.log(json));
    
    
  } catch (error) {
    console.error(error);
  }
}
 

export default Search;