import {AppRootStateType} from "../../../app/store";

export const selectIsLoggedin = (state: AppRootStateType) => state.auth.isLoggedIn