import React, {useState} from 'react';
import './App.css';
import {TodoList, TaskType} from "./components/TodoList/TodoList";
import {v1} from "uuid";

function App() {

    const todolistTitle_1:string = "What to learn"
    const todolistTitle_2:string = "What to buy"

    const tasks_1: Array<TaskType> = [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: true},
        {id: v1(), title: "REACT", isDone: false},
        {id: v1(), title: "REDUX", isDone: false}
    ]

    const tasks_2: Array<TaskType> = [
        {id: v1(), title: "Bread", isDone: true},
        {id: v1(), title: "Сhocolate", isDone: false},
        {id: v1(), title: "Tea", isDone: true},
        {id: v1(), title: "Coffee", isDone: true}
    ]

    return (
        <div className="App">
            <TodoList initTasks={tasks_1} title={todolistTitle_1}/>
            <TodoList initTasks={tasks_2} title={todolistTitle_2}/>
        </div>
    );
}

export default App;
