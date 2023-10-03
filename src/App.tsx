import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "completed" | "active"

function App() {

    const initTasks: Array<TaskType> = [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: true},
        {id: v1(), title: "REACT", isDone: false},
        {id: v1(), title: "REDUX", isDone: false}
    ]

    const [filter, setFilter] = useState<FilterValuesType>('all');
    const [tasks, setTasks] = useState<Array<TaskType>>(initTasks);

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter);
    }

    const removeTask = (taskId: string) => setTasks(tasks.filter(task => task.id !== taskId))

    const addTask = (value: string) => {
        const newTask = {id: v1(), title: value, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
        const updatedTasks: Array<TaskType> = tasks.map(task => task.id === taskId
            ? {...task, isDone: newIsDone}
            : task
        )
        setTasks(updatedTasks)
    }

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

    const todolistTitle: string = "What to learn"

    return (
        <div className="App">
            <TodoList
                tasks={filteredTasks}
                title={todolistTitle}
                changeFilter={changeFilter}
                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}/>
        </div>
    );
}

export default App;
