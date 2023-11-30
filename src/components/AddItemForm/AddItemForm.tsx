import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

export type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}

export const AddItemForm = React.memo( (props: AddItemFormPropsType) => {
    // console.log('AddItemForm')
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addItem = () => {
        const newTitle = title.trim()
        if (newTitle) {
            props.addItem(newTitle)
        } else {
            setError("Field is required")
        }
        setTitle('');
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null)
        event.key === 'Enter' && addItem()
    }

    // const onAddTaskClickHandler = () => addItem()
    //
    // const isAddBtnDisabled = !title || title.length > 15

    const messageForUser = title.length > 15
        ? <span style={{color: "red"}}>Your title is to long</span>
        : ''

    const stylesButton = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px',
    }
    return (
        <div>
            <TextField
                error={!!error}
                size={'small'}
                id="outlined-basic"
                label={error ? error : "type smth..."}
                variant="outlined"
                value={title}
                onChange={onTitleChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={error ? "error" : ""}
            />


            <Button onClick={addItem} variant="contained" style={stylesButton}>+</Button>
            {/*{error && <div className='error-message'>{error}</div>}*/}
            <div>
                {messageForUser}
            </div>
        </div>
    );
} )