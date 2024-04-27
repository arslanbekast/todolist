import React, { useEffect } from "react"
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/model/todolists/todolistsSlice"
import { tasksThunks } from "features/TodolistsList/model/tasks/tasksSlice"
import { useActions } from "common/hooks"
import { AddItemForm } from "common/components"
import { TaskType } from "features/TodolistsList/api/tasks/tasksApi.types"
import { Tasks } from "features/TodolistsList/ui/Todolist/Tasks/Tasks"
import { TodolistTitle } from "../Todolist/TodolistTitle/TodolistTitle"
import { FilterTasksButtons } from "../Todolist/FilterTasksButtons/FilterTasksButtons"
import { Delete } from "@mui/icons-material"
import { IconButton, Paper } from "@mui/material"
import s from "./Todolist.module.css"

type Props = {
    todolist: TodolistDomainType
    tasks: TaskType[]
}

export const Todolist = React.memo(function ({ todolist, tasks }: Props) {
    const { fetchTasks, addTask } = useActions(tasksThunks)
    const { removeTodolist } = useActions(todolistsThunks)

    const { id, entityStatus } = todolist

    useEffect(() => {
        fetchTasks(id)
    }, [])

    const addTaskCb = (title: string) => {
        return addTask({ title, todolistId: id }).unwrap()
    }

    const removeTodolistHandler = () => {
        removeTodolist(id)
    }

    return (
        <Paper elevation={6}>
            <div className={s.todolist}>
                <IconButton
                    onClick={removeTodolistHandler}
                    disabled={entityStatus === "loading"}
                    size={"small"}
                    title={"Delete todolist"}
                    className={s.todolistDeleteBtn}
                    style={{ position: "absolute" }}
                >
                    <Delete fontSize={"small"} />
                </IconButton>
                <div>
                    <TodolistTitle todolist={todolist} />
                    <AddItemForm addItem={addTaskCb} disabled={todolist.entityStatus === "loading"} />
                </div>
                <Tasks tasks={tasks} todolist={todolist} />

                <FilterTasksButtons todolist={todolist} />
            </div>
        </Paper>
    )
})
