import React, { useEffect, useState } from 'react'

import { Row, Col, Button } from 'react-bootstrap'
import { getAllTasks, deleteTask } from '../services/allApi'


function TodoList({ refreshRes }) {

    const [task, setTask] = useState([])

    const getTasks = async () => {
        const res = await getAllTasks()
        
        setTask(res.data)
    }

   

    const removeTask = async (id) => {
        const res = await deleteTask(id)
        if (res.status === 200) {
            console.log(res)
            getTasks()
        }
    }

    useEffect(() => {
        getTasks()
    }, [refreshRes])
    return (
      <>
    <div className=' p-3  rounded'>
        {
            <div className='mt-2 ms-4'>
                {task.map((i) => (
                    <div className=' ms-3 mb-4' key={i.id}>
                        <Row className='w-100 d-flex justify-content-between'>
                            <Col sm={12} md={6}>
                                <div className='mt-3'>
                                    <p className=''> Task: {i.title}</p>
                                    <p >Description: {i.description}</p>

                                    
                                </div>
                            </Col>
                           <Col className='d-grid justify-content-end' >
                           <Button className='btn btn-danger m-4 '  onClick={() => { removeTask(i.id) }}>Delete
                                    <i className="fa-solid fa-trash" />
                                </Button>
                           </Col>
                        </Row>
                    </div>
                ))}
            </div>
        }
    </div>
</>
    )
}

export default TodoList