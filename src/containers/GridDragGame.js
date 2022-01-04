import { Box } from '@mui/material'
import React, { useState } from 'react'
import { Col, Container, Row } from 'reactstrap'

export default function GridDragGame() {
    const [maingrid, setGridMain] = useState([])
    const [griddrag, setGridDrag] = useState([Array(3).fill('')])
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
        setGridMain(Array(val).fill(''))
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
    const onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        // ev.dataTransfer.setData("id", id);
    }
    const onColDragStart = (ev, id) => {
        console.log('dragstart:',id);
        // ev.dataTransfer.setData("id", id);
    }
    const onDragOver = (ev) => {
        ev.preventDefault();
        console.log("hi")
    }

    const onDrop = (ev, cat) => {
        let len = maingrid.length+1;
        console.log(len)
        setGridMain(Array(len).fill(''))
    }
    return (
        <Box className="">
            <div className="container mt-5 pt-5">
                <div className="row">
                    <h2>Grid Drag Game</h2>
                </div>
                <div className="row">
                    <div className='col-md-6'>
                        <input type="number" placeholder='Enter grids number' className='form-control gridinput' />
                    </div>
                    <div className='col-md-6'>
                        <input type="button" value="Change Grid" className='btn btn-primary' onClick={(e) => createGrid()} />
                    </div>
                </div>
                <div className="row mt-5" onDragOver={(e) => onDragOver(e)}
                    onDrop={(e) => { onDrop(e, "wip") }}>
                    <div className='col-md-4 mb-5'>
                    </div>
                    <div className='col-md-4' draggable className="draggable" onDragStart={(e) => onDragStart(e, "t.name")}>
                        {griddrag.map((e, i) => {
                            return (<Row >
                                {griddrag.map((e, j) => (<Col className="border"><button className='w-100 btn text-center draggable' disabled={i === 0 && j === 0 ? true : null} onClick={(e) => swapNum(e)}></button></Col>))}
                            </Row>)
                        })}
                    </div>
                    <div className='col-md-12'>
                        <Container>
                            {maingrid.map((e, i) => {
                                return (
                                <Row>
                                    {maingrid.map((e, j) => (<Col className="border p-5" ><button className='w-100 btn text-center columns draggable' draggable onDragStart={(e) => onColDragStart(e, "t.name")} disabled={i === 0 && j === 0 ? true : null} onClick={(e) => swapNum(e)}></button></Col>))}
                                </Row>
                                )
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
