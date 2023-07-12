import Link from 'next/link';
import { useState, useEffect } from 'react';

import { Spinner } from 'components';
import { Layout } from 'components/users';
import { userService } from 'services';
import { userAgent } from 'next/server';
import { set } from 'mongoose';
const axios = require('axios');
export default Players;

 function Players(){

    
    //const[res, setRes] = useState();

    async function test(){
        const response =  await axios.request(options).then(result => result.data);
                //setRes(response);
                console.log(response);
    }

    useEffect(() =>{

        const options = {
            method: 'GET',
            url: 'https://footapi7.p.rapidapi.com/api/search/ronaldo',
            headers: {
                'X-RapidAPI-Key': 'ab2eb352b2msh88895f324971f1cp18da31jsna309a740cb2e',
                'X-RapidAPI-Host': 'footapi7.p.rapidapi.com'
            }
        };
    
        try {
                test();
        } catch (error) {
            console.error(error);
        }
    }, []);
    return (
        <div></div>
    );
}