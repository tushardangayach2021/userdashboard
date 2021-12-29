import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { fetch } from '../api/httpClient';
import { API } from '../api/api';
export default function ViewData() {
    const [data, setdata] = useState('')
    useEffect(async () => {
        let url = API.CORE.USEREMAIL;
        try{
            const response=await fetch(url);
            setdata(response.data);
            console.log(response.data)
        }
        catch{
           console.log("Issue with json-server")      
        }
    }, [])
    return (
        <div className='container' style={{background: "red"}}>
        <div className='row'>
            <h1 className='mt-5 pt-5 text-center'>{data? data.map(el=>el.email): null}</h1>
        </div>
        </div>
    )
}
