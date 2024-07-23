import { base_url } from './base_url'
import commonApi from './commonApi'



export const addNewTask = async (data) => {
    return await commonApi('POST', `${base_url}/tasks`, data)
}

export const getAllTasks = async () => {
    return await commonApi('GET', `${base_url}/tasks`, '')
}


export const deleteTask = async (id) => {
    return await commonApi('DELETE', `${base_url}/tasks/${id}`, {})
}



