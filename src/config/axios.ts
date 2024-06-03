import axios from "axios";

export const api = axios.create({
    baseURL: "https://medieval-tavern-sd6s.onrender.com/api/",
    // baseURL: "http://localhost:3311/api/",
    headers: {
        "Content-Type": "application/json",
    },
})