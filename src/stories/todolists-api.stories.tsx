import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodolists()
            .then(response => setState(response.data))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const payload = {
            title: 'NewTodolist'
        }

        todolistAPI.createTodolist(payload.title)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '0267f94e-f316-44f7-99c6-d973c11619d9'

        todolistAPI.deleteTodolist(todolistId)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const payload = {
            title: 'NewTitleTodolist'
        }
        const todolistId = '0267f94e-f316-44f7-99c6-d973c11619d9'

        todolistAPI.updateTodolist(todolistId, payload.title)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}