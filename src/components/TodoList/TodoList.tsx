import React, {useState} from 'react';
import {Tasks} from "../Tasks/Tasks";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const TodoList: React.FC<TodolistPropsType> = ({title, tasks}: TodolistPropsType) => {

    const [filter, setFilter] = useState('all');
    let filteredTasks: Array<TaskType>;

    switch (filter) {
        case 'active':
            filteredTasks = tasks.filter((task) => !task.isDone);
            break;
        case 'completed':
            filteredTasks = tasks.filter((task) => task.isDone);
            break;
        default:
            filteredTasks = tasks;
    }

    const onFilteredTasks = (filter: string) => {
        setFilter(filter);
    }

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <Tasks tasks={filteredTasks}/>

            <div>
                <button onClick={() => {onFilteredTasks('all')}}>All</button>
                <button onClick={() => {onFilteredTasks('active')}}>Active</button>
                <button onClick={() => {onFilteredTasks('completed')}}>Completed</button>
            </div>
        </div>
    );
};