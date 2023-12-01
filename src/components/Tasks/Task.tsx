import React, {ChangeEvent, FC, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../../AppWithRedux";

type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, newTitle: string) => void
}

export const Task: FC<TaskPropsType> = memo(({task, removeTask, changeTaskStatus, changeTaskTitle}) => {

    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)
    const changeTaskTitleHandler = (newTitle: string) => {
        changeTaskTitle(task.id, newTitle)
    }

    return (
        <li className={task.isDone ? 'is-done' : 'task'}>
            <Checkbox onChange={onChangeHandler} checked={task.isDone}/>
            <EditableSpan title={task.title} onClick={changeTaskTitleHandler}/>
            <IconButton aria-label="delete" onClick={onClickHandler}>
                <DeleteIcon/>
            </IconButton>
        </li>
    );
});