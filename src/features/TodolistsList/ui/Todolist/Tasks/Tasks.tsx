import { Task } from "features/TodolistsList/ui/Todolist/Tasks/Task/Task"
import React from "react"
import { TaskStatuses } from "common/enums"
import { TaskType } from "features/TodolistsList/api/tasks/tasksApi.types"
import { TodolistDomainType } from "features/TodolistsList/model/todolists/todolistsSlice"
import s from "./Tasks.module.css"

type Props = {
    tasks: TaskType[]
    todolist: TodolistDomainType
}

export const Tasks = ({ tasks, todolist }: Props) => {
    const { id, filter } = todolist

    let tasksForTodolist = tasks

    if (filter === "active") {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New)
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed)
    }

    return (
        <>
            {!!tasksForTodolist.length && (
                <div className={s.tasks}>
                    {tasksForTodolist.map((t) => (
                        <Task key={t.id} task={t} todolistId={id} />
                    ))}
                </div>
            )}
            {!tasksForTodolist.length && <div className={s.noTask}>No task</div>}
        </>
    )
}
