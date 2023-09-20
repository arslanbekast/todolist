import React from 'react';
import {TaskType} from "../TodoList/TodoList";

type TasksPropsType = {
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
}

export const Tasks = ({tasks, removeTask}: TasksPropsType) => {

    let taskList: JSX.Element;
    let listItems: Array<JSX.Element>;

    listItems = tasks.map(task => <li key={task.id}>
        <input type="checkbox" checked={task.isDone}/>
        <span>{task.title}</span>
        <button onClick={ () => {removeTask(task.id)} }>x</button>
    </li>)

    taskList = tasks.length ? <ul>{listItems}</ul> : <span>Your tasks list is empty</span>;

    return (
        <>
            {taskList}
        </>
    );
};