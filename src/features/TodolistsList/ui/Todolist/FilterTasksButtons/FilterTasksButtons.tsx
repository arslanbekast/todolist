import { Button, ButtonGroup } from "@mui/material"
import React from "react"
import { useActions } from "common/hooks"
import {
    FilterValuesType,
    TodolistDomainType,
    todolistsActions,
} from "features/TodolistsList/model/todolists/todolistsSlice"

type Props = {
    todolist: TodolistDomainType
}

export const FilterTasksButtons = ({ todolist }: Props) => {
    const { id, filter } = todolist

    const { changeTodolistFilter } = useActions(todolistsActions)

    const changeFilterHandler = (filter: FilterValuesType) => {
        changeTodolistFilter({ filter, id })
    }

    return (
        <ButtonGroup size="small" style={{ paddingTop: "10px" }}>
            <Button
                variant={filter === "all" ? "contained" : "outlined"}
                onClick={() => changeFilterHandler("all")}
                color={"primary"}
                size={"small"}
            >
                All
            </Button>
            <Button
                variant={filter === "active" ? "contained" : "outlined"}
                onClick={() => changeFilterHandler("active")}
                color={"primary"}
                size={"small"}
            >
                Active
            </Button>
            <Button
                variant={filter === "completed" ? "contained" : "outlined"}
                onClick={() => changeFilterHandler("completed")}
                color={"primary"}
                size={"small"}
            >
                Completed
            </Button>
        </ButtonGroup>
    )
}
