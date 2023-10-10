import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {Tasks} from "../Tasks/Tasks";
import {v1} from "uuid";
import {FilterValuesType, TaskType} from "../../App";

type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (todolistID: string, filter: FilterValuesType) => void
    removeTask: (todolistID: string, taskId: string) => void
    addTask: (todolistID: string, value: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
}

export const TodoList: FC<TodolistPropsType> = (props) => {

    const {todolistID, title, tasks, changeFilter, removeTask, addTask, changeTaskStatus, filter, removeTodolist} = props

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onNewTaskValueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }

    const onAddingTask = () => {
        const taskValue = newTaskTitle.trim()
        if (taskValue) {
            addTask(todolistID, taskValue)
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

    const onAllClickHandler = () => changeFilter(todolistID,'all')

    const onActiveClickHandler = () => changeFilter(todolistID, 'active')

    const onCompletedClickHandler = () => changeFilter(todolistID, 'completed')

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

    const removeTodolistHandler = () => removeTodolist(todolistID)

    const isAddBtnDisabled = !newTaskTitle || newTaskTitle.length > 15
    const messageForUser = newTaskTitle.length < 15
                            ? <span>Enter new task</span>
                            : <span style={{color: "red"}}>Your title is to long</span>

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <button onClick={removeTodolistHandler}>X</button>
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

            <Tasks todolistID={todolistID}
                   tasks={filteredTasks}
                   removeTask={removeTask}
                   changeTaskStatus={changeTaskStatus}/>

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