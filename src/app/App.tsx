import React, {useEffect} from 'react'
import './App.css'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'

// You can learn about the difference by reading this guide on minimizing bundle size.
// https://mui.com/guides/minimizing-bundle-size/
// import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Menu } from '@mui/icons-material';
import LinearProgress from "@mui/material/LinearProgress";
import {useAppDispatch, useAppSelector} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {createBrowserRouter, Navigate, Route, RouterProvider, Routes} from "react-router-dom";
import {Login} from "../features/auth/Login/Login";
import CircularProgress from "@mui/material/CircularProgress";
import {selectIsLoggedin} from "../features/auth/Login/auth-selectors";
import {logoutTC} from "../features/auth/Login/auth-reducer";


function App() {

    const status  = useAppSelector<RequestStatusType>(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(selectIsLoggedin)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        const circularProgressStyle = {display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}
        return <div
            style={circularProgressStyle}>
            <CircularProgress/>
        </div>
    }

    const handleLogoutButtonClick = () => {
        dispatch(logoutTC())
    }

    return (
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>

                    {
                        isLoggedIn
                            ? <Button color="inherit" onClick={handleLogoutButtonClick}>Logout</Button>
                            : <Button color="inherit">Login</Button>
                    }

                </Toolbar>
                {status === 'loading' && <LinearProgress color='secondary'/>}
            </AppBar>
            <Container fixed>
                <RouterProvider router={router} />
                {/*<Routes>*/}
                {/*    <Route path="/" element={<TodolistsList />} />*/}
                {/*    <Route path="/Login" element={<Login />} />*/}
                {/*    <Route path="/404" element={<h4>404: PAGE NOT FOUND</h4>} />*/}
                {/*    <Route path="*" element={<Navigate to={"/404"} />} />*/}
                {/*</Routes>*/}
            </Container>
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <TodolistsList />
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: '/404',
        element: <h4>404: PAGE NOT FOUND</h4>
    },
    {
        path: '*',
        element: <Navigate to={"/404"} />
    }
])

export default App
