import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api";

const apiclient = axios.create({
    baseURL: BACKEND_URL,
    timeout: 10000,
});

apiclient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const loginUser = async (formData) => {
    // Send standard JSON with the exact keys your UserLogin model expects
    const credentials = {
        email: formData.email,
        password: formData.password
    };

    const response = await apiclient.post("/auth/login", credentials);
    return response.data;
};

export const registerUser = async (userData) => {
    const response = await apiclient.post("/auth/register", userData);
    return response.data;
};

export const fetchSeriesList = async (offset = 0) => {
    try {
        const response = await apiclient.get("/cricket/series", {
            params: { offset: offset }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching series:", error);
        return null;
    }
};

export const fetchLiveMatches = async () => {
    try {
        const response = await apiclient.get("/cricket/matches");
        return response.data;
    } catch (error) {
        console.error("Error fetching live matches:", error);
        return null;
    }
};

export const fetchMatchScorecard = async (matchId) => {
    try {
        const response = await apiclient.get(`/cricket/scorecard/${matchId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching scorecard:", error);
        return null;
    }
};

export const fetchMatchInfo = async (matchId) => {
    try {
        const response = await apiclient.get(`/cricket/info/${matchId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching match info:", error);
        return null;
    }
};

export default apiclient;