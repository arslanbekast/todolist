import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "completed" | "active"

function App() {

    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id:todolistID1, title:'What to learn', filter:'all'},
        {id:todolistID2, title:'What to buy', filter:'all'}
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeTask = (todolistID: string, taskId: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskId)})
    }

    const addTask = (todolistID: string, value: string) => {
        const newTask = {id: v1(), title: value, isDone: false}
        // setTasks([newTask, ...tasks])
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    const changeTaskStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        // const updatedTasks: Array<TaskType> = tasks.map(task => task.id === taskId
        //     ? {...task, isDone: newIsDone}
        //     : task
        // )
        // setTasks(updatedTasks)
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(task => task.id === taskId ? {...task, isDone: isDone} : task)})
    }

    const changeFilter = (todolistID: string, filter: FilterValuesType) => {
        // setFilter(filter);
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: filter} : tl))
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }

    return (
        <div className="App">
            {
                todolists.map(tl => {

                    return (
                        <TodoList
                            key={tl.id}
                            todolistID={tl.id}
                            tasks={tasks[tl.id]}
                            title={tl.title}
                            changeFilter={changeFilter}
                            removeTask={removeTask}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}/>
                    )
                })
            }

        </div>
    );
}

export default App;
