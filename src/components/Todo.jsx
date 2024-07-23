import React, { useState } from 'react'
import TodoList from './TodoList'
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';
import { addNewTask } from '../services/allApi';

function Todo() {

    const [addTask, setAddTask] = useState({
        title: '', description: ''
    })
 
    const [refreshRes, setRefreshRes] = useState('')


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
    return (
        
          <>
    <div className='container-fluid w-50 rounded p-2 mt-2 shadow'>
        <Row className="mt-5">
            <Col >
                <FloatingLabel controlId="floatingTitle" label="Task">
                    <Form.Control type="text" placeholder=' Task' className=' bg-light w-100 text-dark border border-primary' onChange={(e) => { setAddTask({ ...addTask, title: e.target.value }) }} />
                </FloatingLabel>
                <Col className='mt-5'>
                <FloatingLabel controlId="floatingDescri" label="Description">
                    <Form.Control type="text" placeholder='Description' className=' bg-light w-100 text-dark border border-primary' onChange={(e) => { setAddTask({ ...addTask, description: e.target.value }) }} />
                </FloatingLabel>
            </Col>
            <Col className='mt-5'>
                <button className='btn btn-primary w-25 ' onClick={handleAddTask}>Add Task</button>
            </Col>


            </Col>
          
           
        </Row>
    </div>
    <div className='mt-5 container-fluid w-50 p-3 bg-light'>
        <TodoList refreshRes={refreshRes} />
    </div>
</>
    
    )
}

export default Todo