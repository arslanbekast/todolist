import React, {ChangeEvent} from 'react';
import {TaskType} from "../../App";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type TasksPropsType = {
    todolistID: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    updateTask: (todolistID: string, taskID: string, newTitle: string) => void
}

export const Tasks = ({todolistID, tasks, removeTask, changeTaskStatus, updateTask}: TasksPropsType) => {

    let taskList: JSX.Element;
    let listItems: Array<JSX.Element>;

    // const updateTaskHandler = (newTitle: string) => {
    //     updateTask(todolistID, task.id, newTitle)
    // }

    listItems = tasks.map(task => {
        const onClickHandler = () => removeTask(todolistID, task.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolistID, task.id, e.currentTarget.checked)
        const updateTaskHandler = (newTitle: string) => {
            updateTask(todolistID, task.id, newTitle)
        }
        return (
            <li className={task.isDone ? 'is-done' : 'task'} key={task.id}>
                <Checkbox onChange={onChangeHandler} checked={task.isDone}/>
                <EditableSpan title={task.title} onClick={updateTaskHandler}/>
                <IconButton aria-label="delete" onClick={onClickHandler}>
                    <DeleteIcon/>
                </IconButton>
            </li>
        )})

    taskList = tasks.length ? <ul style={{listStyle: 'none', padding: 0}}>{listItems}</ul> : <span>Your tasks list is empty</span>;

    return (
        <>
            {taskList}
        </>
    );
};