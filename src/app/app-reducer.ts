import {authAPI} from "../api/auth-api";
import {Dispatch} from "redux";
import {setIsLoggedInAC} from "../features/auth/Login/auth-reducer";
import {ResultCode} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false as boolean
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED' as const, isInitialized})

export const initializeAppTC = () => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.SUCCEEDED) {
            dispatch(setIsLoggedInAC(true));
        } else {
            handleServerAppError(dispatch, res.data)
        }

    } catch (e) {
        handleServerNetworkError(dispatch, (e as Error).message)
    } finally {
        dispatch(setIsInitializedAC(true));
    }
}



export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

type ActionsType = SetAppStatusActionType | SetAppErrorActionType | ReturnType<typeof setIsInitializedAC>