import axios from "axios";
export const BASE_URL = "https://api.mosuedu.com/api/v1";

export const api = () => {
    const api = axios.create({
        baseURL: BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        timeout: 10000, // 10 seconds
    });

    return api;
};
