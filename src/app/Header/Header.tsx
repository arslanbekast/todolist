import React from "react"
import { AppBar, Box, Button, IconButton, LinearProgress, Toolbar, Typography } from "@mui/material"
import { Menu } from "@mui/icons-material"
import { useSelector } from "react-redux"
import { selectAppStatus } from "app/app.selectors"
import { selectIsLoggedIn } from "features/auth/model/auth.selectors"
import { useActions } from "common/hooks"
import { authThunks } from "features/auth/model/authSlice"

export const Header = () => {
    const status = useSelector(selectAppStatus)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const { logout } = useActions(authThunks)

    const logoutHandler = () => logout()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    {isLoggedIn && (
                        <Button color="inherit" onClick={logoutHandler}>
                            Log out
                        </Button>
                    )}
                </Toolbar>
                {status === "loading" && <LinearProgress />}
            </AppBar>
        </Box>
    )
}
