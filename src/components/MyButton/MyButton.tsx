import React, {FC, memo, ReactNode} from 'react';
import {Button, ButtonProps} from "@mui/material";

type MyButtonPropsType = {
    variant: any
    color: any
    onClick: () => void
    children: ReactNode
}

export const MyButton: FC<MyButtonPropsType> = memo( ({variant, color, onClick, children}) => {
    return (
        <Button variant={variant} color={color} onClick={onClick}>{children}</Button>
    )
} );


interface IMyButton extends ButtonProps {

}

const MyButton2 = memo((props: IMyButton) => {
    return <Button variant={props.variant}
                   onClick={props.onClick}
                   color={props.color}>{props.title}
    </Button>
})