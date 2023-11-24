import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../../AppWithRedux";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../state/tasks-reducer";

type TaskWithReduxPropsType = {
    task: TaskType
    todolistId: string
}

export const TaskWithRedux: FC<TaskWithReduxPropsType> = memo(({task, todolistId}) => {

    const dispatch = useDispatch()

    const removeTask = () => {
        dispatch(removeTaskAC(task.id, todolistId))
    }
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todolistId))
    }
    const changeTaskTitle = (newTitle: string) => {
        dispatch(changeTaskTitleAC(task.id, newTitle, todolistId))
    }



    return (

        <li className={task.isDone ? 'is-done' : 'task'}>
            <Checkbox onChange={changeTaskStatus} checked={task.isDone}/>
            <EditableSpan title={task.title} onClick={changeTaskTitle}/>
            <IconButton aria-label="delete" onClick={removeTask}>
                <DeleteIcon/>
            </IconButton>
        </li>
    );
});