import axios from "axios"

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "bd90b833-7e9a-4cbd-b628-b221fb8d5c21",
    },
})
