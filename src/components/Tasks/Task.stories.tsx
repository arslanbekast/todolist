import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import {Task} from "./Task";

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
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
        changeTaskStatus: {
            action: 'changeTaskStatus'
        },
        changeTaskTitle: {
            action: 'changeTaskTitle'
        },
        removeTask: {
            action: 'removeTask'
        },

    },
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args

export const TaskIsDoneStory: Story = {
    args: {
        task: {id: 'asdasdd3sdfsf', isDone: true, title: 'React'}
    }
};

export const TaskIsNotDoneStory: Story = {
    args: {
        task: {id: 'dsfdgfhgfhgj', isDone: false, title: 'CSS'}
    },
};

const TaskWork = () => {
    const [task, setTask] = useState({id: 'dsfdgfhgfhgj', isDone: false, title: 'CSS'})

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTask({...task, isDone: isDone})
    }
    const changeTaskTitle = (taskId: string, title: string) => {
        setTask({...task, title: title})
    }

    return <Task task={task}
                 removeTask={action('Remove task')}
                 changeTaskStatus={changeTaskStatus}
                 changeTaskTitle={changeTaskTitle} />
}

export const TaskWorkStory: Story = {
    render: () => <TaskWork />
};