import React, {ChangeEvent, memo, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onClick: (newTitle: string) => void
}

export const EditableSpan = memo( (props: EditableSpanPropsType) => {

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
            ? <TextField
                autoFocus
                size={'small'}
                id="outlined-basic"
                variant="standard"
                value={newTitle}
                onChange={onChangeHandler}
                onBlur={editHandler}
            />
            : <span onDoubleClick={editHandler}>{props.title}</span>
    );
} );