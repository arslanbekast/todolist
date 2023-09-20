import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Tasks} from "../Tasks/Tasks";

type TodolistPropsType = {
    title: string
    initTasks: Array<TaskType>
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "completed" | "active"

export const TodoList: React.FC<TodolistPropsType> = ({title, initTasks}: TodolistPropsType) => {

    const [filter, setFilter] = useState<FilterValuesType>('all');
    const [tasks, setTasks] = useState<Array<TaskType>>(initTasks);
    const [newTaskValue, setNewTaskValue] = useState<string>('')

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter);
    }

    const removeTask = (taskId: number) => setTasks(tasks.filter((task) => task.id !== taskId))

    const addTask = (value: string) => {
        if (value.trim()) {
            setTasks([...tasks,{id: new Date().getTime(), title: value.trim(), isDone: false}])
            setNewTaskValue('')
        }
    }

    const onKeyEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) {
            addTask(newTaskValue)
        }
    }

    const newTaskValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskValue(event.target.value)
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case 'active':
                return tasks.filter((task) => !task.isDone);
            case 'completed':
                return tasks.filter((task) => task.isDone);
            default:
                return tasks
        }
    }

    const filteredTasks = getFilteredTasks(tasks, filter);

    // switch (filter) {
    //     case 'active':
    //         filteredTasks = tasks.filter((task) => !task.isDone);
    //         break;
    //     case 'completed':
    //         filteredTasks = tasks.filter((task) => task.isDone);
    //         break;
    //     default:
    // }

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input
                    type={"text"}
                    value={newTaskValue}
                    onChange={newTaskValueChange}
                    onKeyDown={onKeyEnter}/>
                <button onClick={ ()=>addTask(newTaskValue) }>+</button>
            </div>
            <Tasks tasks={filteredTasks} removeTask={removeTask}/>

            <div>
                <button onClick={() => {changeFilter('all')}}>All</button>
                <button onClick={() => {changeFilter('active')}}>Active</button>
                <button onClick={() => {changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    );
};