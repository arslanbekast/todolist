import React, {ChangeEvent} from 'react';
import {TaskType} from "../../App";

type TasksPropsType = {
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
}

export const Tasks = ({tasks, removeTask, changeTaskStatus}: TasksPropsType) => {

    let taskList: JSX.Element;
    let listItems: Array<JSX.Element>;

    listItems = tasks.map(task => {
        const onClickHandler = () => removeTask(task.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)

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