import React from 'react';
import {TaskType} from "../TodoList/TodoList";

type TasksPropsType = {
    tasks: Array<TaskType>
}

export const Tasks = ({tasks}: TasksPropsType) => {
    return (
        <ul>
            {
                tasks.map(item => {
                    return (
                        <li key={item.id}>
                            <input type="checkbox" checked={item.isDone}/>
                            <span>{item.title}</span>
                        </li>
                    )
                })
            }
        </ul>
    );
};