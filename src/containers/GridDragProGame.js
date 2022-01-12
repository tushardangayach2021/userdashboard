import { Box } from '@mui/material'
import React, { useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { isEmpty } from '../helpers/utils'

export default function GridDragProGame() {
    const [maingrid, setGridMain] = useState([])
    const popularizeGrid = () => {
        const columns = document.querySelectorAll(".columns");
        const nums = new Set();
        while(nums.size !== columns.length) {
            nums.add(Math.floor(Math.random() * 100) + 1);
        }
        let numsarr= [...nums];
        columns.forEach((e, i) => {
            e.innerHTML = numsarr[i];
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
        console.log("start ev", ev.target.id)
        ev.dataTransfer.setData("id", ev.target.id);
    }
    
    const onDragOver = (ev) => {
        ev.preventDefault();
    }

    const onDrop = (ev, cat) => {
        if(isEmpty(ev.target.id)) return;
        if(ev.target.disabled){
            return;
        }
        const dragged=document.getElementById(ev.dataTransfer.getData("id"))
        const replaced=document.getElementById(ev.target.id)
        console.log(dragged,replaced)
        let temp = dragged.innerHTML;
        dragged.innerHTML=replaced.innerHTML;
        replaced.innerHTML= temp;
    }
    
    return (
        <Box className="">
            <div className="container mt-5 pt-5">
                <div className="row">
                    <h2>Pro Grid Drag Game</h2>
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
                   
                    <div className='col-md-12'>
                        <Container>
                            {maingrid.map((e, i) => {
                                return (
                                <Row>
                                    {maingrid.map((e, j) => {
                                        return (<button id={JSON.stringify(i)+JSON.stringify(j)} className='w-100 btn text-center columns border p-5 col' draggable={i === 0 && j === 0 ? false : true} onDragStart={(e) => onDragStart(e, "t.name")}  disabled={i === 0 && j === 0 ? true : null} onClick={(e) => swapNum(e)}></button>)})}
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
