import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from './AddItemForm';
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes:
    // https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args

export const AddItemFormStory: Story = {};

export const AddItemFormWithArgsStory: Story = {
    args: {
        addItem: action('Button clicked inside form')
    },
};

const AddItemFormWithError = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>("Field is required");

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

};

export const AddItemFormWithErrorStory: Story = {
    render: () => <AddItemFormWithError addItem={() => action('Button clicked inside form')} />
};
