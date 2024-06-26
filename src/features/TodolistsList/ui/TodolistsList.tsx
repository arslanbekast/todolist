import React, { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { todolistsThunks } from "features/TodolistsList/model/todolists/todolistsSlice"
import { Grid, Paper } from "@mui/material"
import { AddItemForm } from "common/components"
import { Todolist } from "./Todolist/Todolist"
import { Navigate } from "react-router-dom"
import { useActions } from "common/hooks"
import { selectIsLoggedIn } from "features/auth/model/auth.selectors"
import { selectTasks } from "features/TodolistsList/model/tasks/tasks.selectors"
import { selectTodolists } from "features/TodolistsList/model/todolists/todolists.selectors"

export const TodolistsList = () => {
    const todolists = useSelector(selectTodolists)
    const tasks = useSelector(selectTasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const { fetchTodolists, addTodolist: addTodolistThunk } = useActions(todolistsThunks)

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        fetchTodolists()
    }, [])

    const addTodolist = useCallback((title: string) => {
        return addTodolistThunk(title).unwrap()
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />
    }

    return (
        <>
            <Grid container justifyContent={"center"} style={{ padding: "20px 0" }}>
                <AddItemForm addItem={addTodolist} />
            </Grid>
            <Grid container justifyContent={"center"} spacing={6} style={{ paddingBottom: "24px" }}>
                {todolists.map((tl) => {
                    let allTodolistTasks = tasks[tl.id]

                    return (
                        <Grid item key={tl.id}>
                            <Todolist todolist={tl} tasks={allTodolistTasks} />
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}
