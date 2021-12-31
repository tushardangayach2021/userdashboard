import React, { useEffect, useState } from 'react'
import { API } from '../api/api'
import { fetch } from '../api/httpClient'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function StatesList() {
    const [state, setstate] = useState([])
    useEffect(async ()=>{
        const url = API.CORE.STATEDATA;
        try {
            const response = await fetch(url);
            console.log(response)
            setstate(response.data)
        }
        catch{
            console.log("Issue in fetching states data");
        }
    }, [])
    const allrows = [
        createData(1, "Rajasthan", "22-11-2021", "Rajasthan is a state."),
        createData(2, "UP", "22-11-2021", "UP is a state."),
        createData(3, "Gujarat", "22-11-2021", "Gujarat is a state.")
      ];
    function createData(id, name, dof, description) {
        return {
          id,
          name,
          dof,
          description,
          isEditMode: false,
          districts: [
            {
              id: 1,
              name: "Jaipur",
              dof: "2020-01-05",
              description: "Jaipur is a pink city.",
              isEditMode: false,
              cities: [
                {
                  id: 1,
                  name: "Rajkot",
                  dof: "2020-01-05",
                  description: "Rajkot is a pink city.",
                  isEditMode: false
                },
                {
                  id: 2,
                  name: "Ajmer",
                  dof: "2020-01-05",
                  description: "Ajmer is a pink city.",
                  isEditMode: false
                }
              ]
            },
            {
              id: 2,
              name: "Alwar",
              dof: "2020-01-05",
              description: "Jaipur is a pink city.",
              isEditMode: false,
              cities: [
                {
                  id: 1,
                  name: "Rajkot",
                  dof: "2020-01-05",
                  description: "Rajkot is a pink city.",
                  isEditMode: false
                },
                {
                  id: 2,
                  name: "Ajmer",
                  dof: "2020-01-05",
                  description: "Ajmer is a pink city.",
                  isEditMode: false
                }
              ]
            }
          ]
        };
      }
    // const allrows = [
//   createData(1, "Rajasthan", "22-11-2021", "Rajasthan is a state."),
//   createData(2, "UP", "22-11-2021", "UP is a state."),
//   createData(3, "Gujarat", "22-11-2021", "Gujarat is a state.")
// ];
    return (
        
    )
}
