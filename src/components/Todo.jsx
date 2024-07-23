import React, { useState,useEffect } from 'react'
import { toast } from 'react-toastify';
import { addNewTask, getAllTasks, deleteTask } from '../services/allApi';
import { Row, Col, Button } from 'react-bootstrap'

function Todo() {

    const [addTask, setAddTask] = useState({
        title: '', description: ''
    })
 
    const [refreshRes, setRefreshRes] = useState('')
    const [task, setTask] = useState([])

    const handleAddTask = async () => {
        const { title, description } = addTask

        if (!title || !description) {
            toast.info('Fill the title and description')
        } else {
            const updatedTask = {
                ...addTask
              
            };
            const res = await addNewTask(updatedTask)
            if (res.status === 201) {
                setAddTask({
                    title: '', description: ''
                })
                setRefreshRes(res)
                toast.success('Task Uploaded successfully')

            } else {
                toast.error('Task upload failed')
                console.log(res)
            }

        }
    }
   

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
    <div className='container-fluid w-50 rounded p-2 mt-2 shadow'>
      <h5 className=' m-5'> To-Do-List</h5>
        <Row className="mt-5">
            <Col >
            <input type="text" id="task" className=' bg-light w-100 text-dark border border-primary form-control'  onChange={(e) => { setAddTask({ ...addTask, title: e.target.value }) }} placeholder="Enter a new task" required/>
            <input type="text" id="description" className=' bg-light w-100 text-dark border border-primary mt-5 form-control' onChange={(e) => { setAddTask({ ...addTask, description: e.target.value }) }}  placeholder="Description" required/>
            <button className='btn btn-primary mt-5 ' onClick={handleAddTask}>Add Task</button>
                
            </Col>
          

          
           
        </Row>
    </div>
    
    <div className='mt-5 container-fluid w-50 p-3 bg-light'>
   

        {
            <div className='mt-2 ms-4'>
                {task.map((i) => (
                    <div className=' ms-3 mb-4' key={i.id}>
                        <Row className='w-100 d-flex justify-content-between'>
                            <Col>
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

export default Todo