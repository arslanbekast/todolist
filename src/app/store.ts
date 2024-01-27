import { configureStore } from "@reduxjs/toolkit"
import { tasksReducer } from "features/TodolistsList/model/tasks/tasksSlice"
import { todolistsReducer } from "features/TodolistsList/model/todolists/todolistsSlice"
import { appReducer } from "app/appSlice"
import { authReducer } from "features/auth/model/authSlice"

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        todolists: todolistsReducer,
        app: appReducer,
        auth: authReducer,
    },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
