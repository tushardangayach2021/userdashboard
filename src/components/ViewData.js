import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { fetch } from '../api/httpClient';
import { API } from '../api/api';
export default function ViewData() {
    const [data, setdata] = useState('')
    useEffect(async () => {
        let url = API.CORE.USERNAME;
        try{
            const response=await fetch(url);
            setdata(response.data);
        }
        catch{
           console.log("Issue with json-server")      
        }
    }, [])
    return (
        <div>
            {data? data.map(el=>el.name): null}
        </div>
    )
}
