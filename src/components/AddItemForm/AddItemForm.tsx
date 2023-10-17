import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    onClick: (newTitle: string) => void
}

export const AddItemForm = ({onClick}: PropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addItem = () => {
        const newTitle = title.trim()
        if (newTitle) {
            onClick(newTitle)
        } else {
            setError("Field is required")
        }
        setTitle('');
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        event.key === 'Enter' && addItem()
    }

    const onAddTaskClickHandler = () => addItem()

    const isAddBtnDisabled = !title || title.length > 15
    const messageForUser = title.length > 15
        ? <span style={{color: "red"}}>Your title is to long</span>
        : ''

    return (
        <div>
            <input
                type={"text"}
                value={title}
                placeholder='Enter title'
                onChange={onTitleChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={error ? 'error' : ''}/>
            <button onClick={onAddTaskClickHandler} disabled={isAddBtnDisabled}>+</button>
            {error && <div className='error-message'>{error}</div>}
            <div>
                {messageForUser}
            </div>
        </div>
    );
};