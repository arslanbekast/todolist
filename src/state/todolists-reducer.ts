import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: TodolistsActionsType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'};
            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE":{
            return  state.map(el=>el.id===action.payload.id ? {...el,title:action.payload.title} : el)
        }
        case "CHANGE-TODOLIST-FILTER":{
            return state.map(el=>el.id===action.payload.id ? {...el,filter:action.payload.filter}: el)
        }
        default:
            return state
    }
}

export type TodolistsActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeFilterActionType
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const
}

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title, todolistId: v1()}
    } as const
}

type ChangeTodolistTitleActionType =ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC=(id: string, title: string)=>{
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload:{id,title}
    } as const
}

type ChangeFilterActionType =ReturnType<typeof changeFilterAC>
export const changeFilterAC=(filter: FilterValuesType, id: string)=>{
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload:{
            id,filter
        }
    } as const
}