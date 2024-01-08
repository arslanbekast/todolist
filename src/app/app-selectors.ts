import { AppRootStateType } from "./store"

export const selectIsStatus = (state: AppRootStateType) => state.app.status
export const selectIsInitialized = (state: AppRootStateType) => state.app.isInitialized
export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
