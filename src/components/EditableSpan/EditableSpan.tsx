import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    onClick: (newTitle: string) => void
}

export const EditableSpan = (props: PropsType) => {
    const [edit, setEdit] = useState(false);
    const [newTitle, setNewTitle] = useState(props.title)
    const editHandler = () => {
        setEdit(!edit)
        edit && addTask()
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.onClick(newTitle)
    }
    return (
        edit
        ? <input value={newTitle} onChange={onChangeHandler} onBlur={editHandler} autoFocus/>
        : <span onDoubleClick={editHandler}>{props.title}</span>
    );
};