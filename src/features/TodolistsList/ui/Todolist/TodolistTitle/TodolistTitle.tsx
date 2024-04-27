import { EditableSpan } from "common/components"
import React from "react"
import { useActions } from "common/hooks"
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/model/todolists/todolistsSlice"
import s from "./TodolistTitle.module.css"

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
        <h3 className={s.title}>
            <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        </h3>
    )
}
