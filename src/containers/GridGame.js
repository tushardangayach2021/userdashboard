import { Box } from '@mui/material'
import React, { useState } from 'react'
import { Col, Container, Row } from 'reactstrap'

export default function GridGame() {
    const [gridrownum, setGridRownum] = useState([[], []])
    const [gridcolumnnum, setGridColumnnum] = useState([[], [], []])
    const [num, setnum] = useState(10)
    const popularizeGrid = () => {
        const columns = document.querySelectorAll(".columns");
        columns.forEach((e, i) => {
            e.innerHTML = Math.floor((Math.random() * 100) + 1);
            e.disabled = false;
            if (i === 0) {
                e.disabled = true;
            }
        })
    }
    const createGrid = () => {
        const val = parseInt(document.querySelector(".gridinput").value);
        if (isNaN(val)) {
            return;
        }
        // console.log(val, typeof val)
        // console.log(Array(val))
        setGridColumnnum(Array(val).fill(''))
        setGridRownum(Array(val).fill(''))
        const columns = document.querySelectorAll(".columns");
        columns.forEach((e, i) => {
            e.innerHTML = "";
            e.disabled = false;
            if (i === 0) {
                e.disabled = true;
            }
        })
    }
    const swapNum = (event) => {
        const columns = document.querySelectorAll(".columns");
        // columns.forEach(e => 
        for (let i = 0; i < columns.length; i++) {
            if (!columns[i].disabled) {
                let temp = columns[i].innerHTML;
                columns[i].innerHTML = event.target.innerHTML;
                event.target.innerHTML = temp;
                columns[i].disabled = true
                break;
            }
        }
    }
    return (
        <Box className="">

            <div className="container mt-5 pt-5">
                <div className="row">
                    <h2>Grid Game</h2>
                </div>
                <div className="row">
                    <div className='col-md-6'>
                        <input type="number" placeholder='Enter grids number' className='form-control gridinput' />
                    </div>
                    <div className='col-md-6'>
                        <input type="button" value="Change Grid" className='btn btn-primary' onClick={(e) => createGrid()} />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className='col-md-12'>
                        <Container>
                            {gridrownum.map((e, i) => {
                                return (<Row>
                                    {gridcolumnnum.map((e, j) => (<Col className="border p-5"><button className='w-100 btn text-center columns' disabled={i === 0 && j === 0 ? true : null} onClick={(e) => swapNum(e)}></button></Col>))}
                                </Row>)
                            })}
                        </Container>

                    </div>
                    <div className='col-md-6 mt-2'>
                        <input type="button" value="Popularize" className='btn btn-primary' onClick={() => popularizeGrid()} />
                    </div>
                </div>
            </div>
        </Box>
    )
}
