import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {Tasks} from "../Tasks/Tasks";
import {v1} from "uuid";
import {FilterValuesType, TaskType} from "../../App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    changeFilter: (filter: FilterValuesType) => void
    removeTask: (taskId: string) => void
    addTask: (value: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
    filter: FilterValuesType
}

export const TodoList: FC<TodolistPropsType> = ({title, tasks, changeFilter, removeTask, addTask, changeTaskStatus, filter}) => {


    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onNewTaskValueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }

    const onAddingTask = () => {
        const taskValue = newTaskTitle.trim()
        if (taskValue) {
            addTask(taskValue)
        } else {
            setError("Field is required")
        }
        setNewTaskTitle('');
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        event.key === 'Enter' && onAddingTask()
    }

    const onAddTaskClickHandler = () => onAddingTask()

    const onAllClickHandler = () => changeFilter('all')

    const onActiveClickHandler = () => changeFilter('active')

    const onCompletedClickHandler = () => changeFilter('completed')



    const isAddBtnDisabled = !newTaskTitle || newTaskTitle.length > 15
    const messageForUser = error ? <span className='error-message'>{error}</span> : newTaskTitle.length < 15
                            ? <span>Enter new task</span>
                            : <span style={{color: "red"}}>Your title is to long</span>

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input
                    type={"text"}
                    value={newTaskTitle}
                    onChange={onNewTaskValueChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    className={error ? 'error' : ''}/>
                <button onClick={onAddTaskClickHandler} disabled={isAddBtnDisabled}>+</button>
                {error && <div className='error-message'>{error}</div>}
                <div>
                    {messageForUser}
                </div>
            </div>
            <Tasks tasks={tasks} removeTask={removeTask} changeTaskStatus={changeTaskStatus}/>

            <div className='btnsBox'>
                <button
                    className={filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>
                    All
                </button>
                <button
                    className={filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>
                    Active
                </button>
                <button
                    className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>
                    Completed
                </button>
            </div>
        </div>
    );
};