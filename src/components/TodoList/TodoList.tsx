import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
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

export const TodoList: FC<TodolistPropsType> = ({title, initTasks}: TodolistPropsType) => {

    const [filter, setFilter] = useState<FilterValuesType>('all');
    const [tasks, setTasks] = useState<Array<TaskType>>(initTasks);
    const [newTaskValue, setNewTaskValue] = useState<string>('')

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter);
    }

    const removeTask = (taskId: string) => setTasks(tasks.filter((task) => task.id !== taskId))

    const addTask = (value: string) => {
        if (value.trim()) {
            const newTask = {id: v1(), title: value.trim(), isDone: false}
            setTasks([newTask, ...tasks])
        }
    }

    const onNewTaskValueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskValue(event.currentTarget.value)
    }

    const onAddedTask = () => {
        addTask(newTaskValue)
        setNewTaskValue('');
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && onAddedTask()

    const onAddTaskClickHandler = () => onAddedTask()

    const onAllClickHandler = () => changeFilter('all')

    const onActiveClickHandler = () => changeFilter('active')

    const onCompletedClickHandler = () => changeFilter('completed')

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.isDone);
            case 'completed':
                return tasks.filter(task => task.isDone);
            default:
                return tasks
        }
    }

    const filteredTasks = getFilteredTasks(tasks, filter);

    const isAddBtnDisabled = !newTaskValue || newTaskValue.length > 15
    const messageForUser = newTaskValue.length < 15
                            ? <span>Enter new task</span>
                            : <span style={{color: "red"}}>Your title is to long</span>

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input
                    type={"text"}
                    value={newTaskValue}
                    onChange={onNewTaskValueChangeHandler}
                    onKeyDown={onKeyDownHandler}/>
                <button onClick={onAddTaskClickHandler} disabled={isAddBtnDisabled}>+</button>
                <div>
                    {messageForUser}
                </div>
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