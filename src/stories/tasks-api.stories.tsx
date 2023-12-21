import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '4f78acce-9b4b-4953-bbb9-716b3cd1d39b';

        todolistAPI.getTasks(todolistId)
            .then(response => setState(response.data))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '4f78acce-9b4b-4953-bbb9-716b3cd1d39b';

        const payload = {
            title: 'HTML'
        }

        todolistAPI.createTask(todolistId,payload.title)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '4f78acce-9b4b-4953-bbb9-716b3cd1d39b'
        const taskId = ''

        todolistAPI.deleteTask(todolistId, taskId)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const payload = {
            title: 'CSS'
        }
        const todolistId = '4f78acce-9b4b-4953-bbb9-716b3cd1d39b'
        const taskId = ''

        todolistAPI.updateTask(todolistId, taskId, payload.title)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}