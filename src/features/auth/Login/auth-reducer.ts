import { Dispatch } from 'redux'
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../../../app/app-reducer'
import {authAPI, LoginParams} from "../../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {AxiosError} from "axios";
import {ResultCode} from "../../../api/todolists-api";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (isLoggedIn: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', isLoggedIn} as const)

// thunks
export const loginTC = (data: LoginParams) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await  authAPI.login(data)
        if (res.data.resultCode === ResultCode.SUCCEEDED) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
            return res.data
        }

    } catch (e) {
        handleServerNetworkError(dispatch, (e as Error).message)
    }
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((e) => {
            handleServerNetworkError(dispatch, (e as Error).message)
        })
}


// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType