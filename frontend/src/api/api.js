import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const apiclient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

export const fetchSeriesList = async (offset = 0) => {
    try {
        const response = await apiclient.get("/series", {
            params: {
                apikey: API_KEY,
                offset: offset
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching series:", error);
        return null;
    }
};

export const fetchLiveMatches = async () => {
    try {
        const response = await apiclient.get("/currentMatches", {
            params: { apikey: API_KEY }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching live matches:", error);
        return null;
    }
};

export const fetchMatchScorecard = async (matchId) => {
    try {
        const response = await apiclient.get("/match_scorecard", {
            params: { 
                apikey: API_KEY, 
                id: matchId 
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching scorecard:", error);
        return null;
    }
};

export const fetchMatchInfo = async (matchId) => {
    try {
        const response = await apiclient.get("/match_info", {
            params: { 
                apikey: API_KEY, 
                id: matchId 
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching match info:", error);
        return null;
    }
};

export default apiclient;