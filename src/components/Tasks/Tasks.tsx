import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from "../../App";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from "./Task";
import {TaskWithRedux} from "./TaskWithRedux";

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

    const onClickHandler = useCallback( (taskId: string) => {
        removeTask(todolistID, taskId)
    }, [todolistID, removeTask])

    const onChangeHandler = useCallback( (taskId: string, newIsDone: boolean) => {
        changeTaskStatus(todolistID, taskId, newIsDone)
    }, [todolistID, changeTaskStatus])

    const updateTaskHandler = useCallback( (taskId: string, newTitle: string) => {
        updateTask(todolistID, taskId, newTitle)
    }, [todolistID, updateTask])

    listItems = tasks.map(task => {

        return (
            // <li className={task.isDone ? 'is-done' : 'task'} key={task.id}>
            //     <Checkbox onChange={onChangeHandler} checked={task.isDone}/>
            //     <EditableSpan title={task.title} onClick={updateTaskHandler}/>
            //     <IconButton aria-label="delete" onClick={onClickHandler}>
            //         <DeleteIcon/>
            //     </IconButton>
            // </li>
            // <Task key={task.id}
            //       task={task}
            //       removeTask={onClickHandler}
            //       changeTaskStatus={onChangeHandler}
            //       updateTask={updateTaskHandler} />
            <TaskWithRedux key={task.id} task={task} todolistId={todolistID}/>
        )})

    taskList = tasks.length ? <ul style={{listStyle: 'none', padding: 0}}>{listItems}</ul> : <span>Your tasks list is empty</span>;

    return (
        <>
            {taskList}
        </>
    );
};