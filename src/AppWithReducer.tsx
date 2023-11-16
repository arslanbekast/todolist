import React, {Reducer, useReducer, useState} from 'react';
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

function AppWithReducer() {

    let todolistID1=v1();
    let todolistID2=v1();

    const [todolists, dispatchToTodolists] = useReducer<Reducer<TodolistType[], TodolistsActionsType>>(todolistsReducer, [
        {id:todolistID1, title:'What to learn', filter:'all'},
        {id:todolistID2, title:'What to buy', filter:'all'}
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeTask = (todolistID: string, taskId: string) => {
        dispatchToTasks(removeTaskAC(taskId, todolistID))
    }

    const addTask = (todolistID: string, value: string) => {
        dispatchToTasks(addTaskAC(value, todolistID))
    }

    const addTodolist = (newTitle: string) => {
        let action = addTodolistAC(newTitle)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const changeTaskStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todolistID))
    }

    const changeFilter = (todolistID: string, filter: FilterValuesType) => {
        dispatchToTodolists(changeFilterAC(filter, todolistID))
    }

    const removeTodolist = (todolistID: string) => {
        let action = removeTodolistAC(todolistID)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const updateTask = (todolistID: string, taskID: string, newTitle: string) => {
        dispatchToTasks(changeTaskTitleAC(taskID, newTitle, todolistID))
    }

    const updateTodoTitle = (todolistID: string, newTitle: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistID, newTitle))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>

                <Grid container style={{margin:"20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container  >
                {
                    todolists.map(tl => {

                        return (
                            <Paper elevation={3} style={{padding:'20px',margin:"10px"}}>
                            <TodoList
                                key={tl.id}
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

export default AppWithReducer;
