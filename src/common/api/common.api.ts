import axios from "axios"

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "02589a7c-e3a4-4241-b4b5-ffbc85a6aec7",
    },
})
