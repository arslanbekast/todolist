import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { Button, IconButton, TextField } from "@mui/material"
import { AddBox } from "@mui/icons-material"
import { BaseResponseType } from "common/types"
import s from "./AddItemForm.module.css"

type Props = {
    addItem: (title: string) => Promise<any>
    disabled?: boolean
}

export const AddItemForm = React.memo(function ({ addItem, disabled = false }: Props) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== "") {
            addItem(title)
                .then((res: any) => {
                    setTitle("")
                })
                .catch((err: BaseResponseType) => {
                    if (err?.resultCode) {
                        setError(err.messages[0])
                    }
                })
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === "Enter") {
            addItemHandler()
        }
    }

    return (
        <div className={s.wrapper}>
            <TextField
                variant="outlined"
                disabled={disabled}
                error={!!error}
                value={title}
                onChange={onChangeHandler}
                onKeyUp={onKeyPressHandler}
                label="Title"
                helperText={error}
                size={"small"}
            />
            <Button
                onClick={addItemHandler}
                disabled={disabled}
                className={s.button}
                variant={"contained"}
                style={{ minWidth: "40px", minHeight: "40px" }}
            >
                +
            </Button>
            {/*<IconButton color="primary" onClick={addItemHandler} disabled={disabled}>*/}
            {/*    <AddBox />*/}
            {/*</IconButton>*/}
        </div>
    )
})
