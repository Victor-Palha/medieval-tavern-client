import axios from "axios";

export const api = axios.create({
    baseURL: "https://medieval-tavern-api.azurewebsites.net/api/",
    // baseURL: "http://localhost:3311/api/",
    headers: {
        "Content-Type": "application/json",
    },
})