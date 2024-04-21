import { EditableSpan } from "common/components"
import { IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import React from "react"
import { useActions } from "common/hooks"
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/model/todolists/todolistsSlice"

type Props = {
    todolist: TodolistDomainType
}

export const TodolistTitle = ({ todolist }: Props) => {
    const { id, title } = todolist

    const { changeTodolistTitle } = useActions(todolistsThunks)
    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle({ id, title })
    }

    return (
        <h3
            style={{
                display: "inline-block",
                marginTop: "0",
                maxWidth: "250px",
                overflow: "hidden",
                wordBreak: "break-all",
            }}
        >
            <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        </h3>
    )
}
