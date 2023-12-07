import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

type TodolistType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

type TasksType = {
    id: string,
    title: string,
    description: null,
    todoListId: string,
    order: number,
    status: number,
    priority: number,
    startDate: null,
    deadline: null,
    addedDate: Date
}

type ResponseType<T={}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

type TasksResponseType<T={}> = {
    resultCode: number
    messages: Array<string>
    data: T
}

type CreateTodolistType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {
        item: TodolistType
    }
}

type UpdateAndDeleteTodolistType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    getTasks(todolistId: string) {
        return instance.get<TasksType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<TasksResponseType>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<TasksResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<TasksResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}