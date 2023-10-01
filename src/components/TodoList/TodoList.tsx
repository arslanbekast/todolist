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
}

export const TodoList: FC<TodolistPropsType> = ({title, tasks, changeFilter, removeTask, addTask}) => {


    const [newTaskValue, setNewTaskValue] = useState<string>('')

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
            <Tasks tasks={tasks} removeTask={removeTask}/>

            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};