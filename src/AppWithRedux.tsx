import React, {Reducer, useCallback, useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    TodolistsActionsType,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "completed" | "active"

function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTask = useCallback( (todolistID: string, taskId: string) => {
        dispatch(removeTaskAC(taskId, todolistID))
    }, [dispatch] )

    const addTask = useCallback( (todolistID: string, value: string) => {
        dispatch(addTaskAC(value, todolistID))
    }, [dispatch])

    const addTodolist = useCallback((newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }, [dispatch])

    const changeTaskStatus = useCallback( (todolistID: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistID))
    }, [dispatch] )

    const changeFilter = useCallback( (todolistID: string, filter: FilterValuesType) => {
        dispatch(changeFilterAC(filter, todolistID))
    }, [dispatch] )

    const removeTodolist = useCallback( (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }, [dispatch] )

    const updateTask = useCallback( (todolistID: string, taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(taskID, newTitle, todolistID))
    }, [dispatch] )

    const updateTodoTitle = useCallback( (todolistID: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistID, newTitle))
    }, [dispatch] )

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>

                <Grid container style={{margin:"20px 0"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container  style={{gap: "20px"}}>
                {
                    todolists.map(tl => {

                        return (
                            <Paper key={tl.id} elevation={3} style={{padding:'20px'}}>
                            <TodoList
                                todolistID={tl.id}
                                tasks={tasks[tl.id]}
                                title={tl.title}
                                changeFilter={changeFilter}
                                removeTask={removeTask}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                updateTask={updateTask}
                                updateTodoTitle={updateTodoTitle}/>
                            </Paper>
                        )
                    })
                }
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
