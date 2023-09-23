import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Tasks} from "../Tasks/Tasks";
import {v1} from "uuid";

type TodolistPropsType = {
    title: string
    initTasks: Array<TaskType>
}

export type TaskType = {
    id: string
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

    const removeTask = (taskId: string) => setTasks(tasks.filter((task) => task.id !== taskId))

    const addTask = (value: string) => {
        if (value.trim()) {
            let newTask = {id: v1(), title: value.trim(), isDone: false}
            setTasks([newTask, ...tasks])

        }
    }

    const onNewTaskValueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskValue(event.currentTarget.value)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask(newTaskValue)
            setNewTaskValue('');
        }
    }

    const onAddTaskClickHandler = () => {
        addTask(newTaskValue);
        setNewTaskValue('');
    }

    const onAllClickHandler = () => changeFilter('all')

    const onActiveClickHandler = () => changeFilter('active')

    const onCompletedClickHandler = () => changeFilter('completed')

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

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input
                    type={"text"}
                    value={newTaskValue}
                    onChange={onNewTaskValueChangeHandler}
                    onKeyDown={onKeyDownHandler}/>
                <button onClick={onAddTaskClickHandler}>+</button>
            </div>
            <Tasks tasks={filteredTasks} removeTask={removeTask}/>

            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};