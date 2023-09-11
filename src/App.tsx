import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/TodoList/TodoList";

function App() {

    const todolistTitle_1:string = "What to learn"
    const todolistTitle_2:string = "What to buy"

    const tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS/TS", isDone: true},
        {id: 3, title: "REACT", isDone: false},
        {id: 4, title: "REDUX", isDone: false}
    ]

    const tasks_2: Array<TaskType> = [
        {id: 5, title: "Bread", isDone: true},
        {id: 6, title: "Сhocolate", isDone: false},
        {id: 7, title: "Tea", isDone: true},
        {id: 8, title: "Coffee", isDone: false}
    ]

    return (
        <div className="App">
            <TodoList tasks={tasks_1} title={todolistTitle_1}/>
            <TodoList tasks={tasks_2} title={todolistTitle_2}/>
        </div>
    );
}

export default App;
