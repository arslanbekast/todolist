import React, {ChangeEvent, FC, KeyboardEvent, memo, useCallback, useMemo, useState} from 'react';
import {Tasks} from "../Tasks/Tasks";
import {v1} from "uuid";
import {FilterValuesType, TaskType} from "../../App";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {MyButton} from "../MyButton/MyButton";

type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (todolistID: string, filter: FilterValuesType) => void
    removeTask: (todolistID: string, taskId: string) => void
    addTask: (todolistID: string, value: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
    updateTodoTitle: (todolistID: string, newTitle: string) => void
}

export const TodoList: FC<TodolistPropsType> = memo( (props) => {

    const {
        todolistID,
        title,
        tasks,
        changeFilter,
        removeTask,
        addTask,
        changeTaskStatus,
        filter,
        removeTodolist,
        changeTaskTitle,
        updateTodoTitle
    } = props

    const addTaskHandler = useCallback( (newTitle: string) => {
        addTask(todolistID, newTitle)
    }, [addTask, todolistID] )

    const onAllClickHandler = () => changeFilter(todolistID, 'all')
    const onActiveClickHandler = () => changeFilter(todolistID, 'active')
    const onCompletedClickHandler = () => changeFilter(todolistID, 'completed')

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.isDone);
            case 'completed':
                return tasks.filter(task => task.isDone);
            default:
                return tasks
        }
    }

    const filteredTasks = useMemo(() => getFilteredTasks(tasks, filter), [filter, tasks]);

    const removeTodolistHandler = () => removeTodolist(todolistID)

    const updateTodoTitleHandler = useCallback( (newTitle: string) => {
        updateTodoTitle(todolistID, newTitle)
    }, [updateTodoTitle, todolistID])

    return (
        <div>
            <h3>
                <EditableSpan title={title} onClick={updateTodoTitleHandler}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTaskHandler}/>

            <Tasks todolistID={todolistID}
                   tasks={filteredTasks}
                   removeTask={removeTask}
                   changeTaskStatus={changeTaskStatus}
                   changeTaskTitle={changeTaskTitle}/>

            <div className='btnsBox' style={tasks.length ? {} : {display: 'none'}}>
                <MyButton variant={filter === 'all' ? "contained" : "text"} color="success"
                        onClick={onAllClickHandler}>All</MyButton>
                <MyButton variant={filter === 'active' ? "contained" : "text"} color="primary"
                        onClick={onActiveClickHandler}>Active</MyButton>
                <MyButton variant={filter === 'completed' ? "contained" : "text"} color="secondary"
                        onClick={onCompletedClickHandler}>Completed</MyButton>
            </div>
        </div>
    );
} )