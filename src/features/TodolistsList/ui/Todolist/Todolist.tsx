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
        <Paper
            elevation={24}
            style={{
                position: "relative",
                padding: "10px",
                paddingBottom: "20px",
                width: "270px",
                minHeight: "290px",
            }}
        >
            <IconButton
                onClick={removeTodolistHandler}
                disabled={entityStatus === "loading"}
                size={"small"}
                title={"Delete todolist"}
                style={{ position: "absolute", right: "5px", top: "5px" }}
            >
                <Delete fontSize={"small"} />
            </IconButton>
            <TodolistTitle todolist={todolist} />
            <AddItemForm addItem={addTaskCb} disabled={todolist.entityStatus === "loading"} />
            <Tasks tasks={tasks} todolist={todolist} />
            {!tasks.length && <div style={{ paddingTop: "10px", color: "grey" }}>No task</div>}
            {tasks.length > 0 && <FilterTasksButtons todolist={todolist} />}
        </Paper>
    )
})
