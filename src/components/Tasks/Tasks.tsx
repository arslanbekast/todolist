import React, {ChangeEvent} from 'react';
import {TaskType} from "../../App";

type TasksPropsType = {
    todolistID: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
}

export const Tasks = ({todolistID, tasks, removeTask, changeTaskStatus}: TasksPropsType) => {

    let taskList: JSX.Element;
    let listItems: Array<JSX.Element>;

    listItems = tasks.map(task => {
        const onClickHandler = () => removeTask(todolistID, task.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolistID, task.id, e.currentTarget.checked)

        return (
            <li key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={onChangeHandler}/>
                <span  className={task.isDone ? 'is-done' : 'task'}>{task.title}</span>
                <button onClick={onClickHandler}>x</button>
            </li>
        )})

    taskList = tasks.length ? <ul>{listItems}</ul> : <span>Your tasks list is empty</span>;

    return (
        <>
            {taskList}
        </>
    );
};