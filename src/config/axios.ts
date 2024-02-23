import axios from "axios";

export const api = axios.create({
    baseURL: "https://medieval-tavern-api.azurewebsites.net/api/",
    headers: {
        "Content-Type": "application/json",
    },
})