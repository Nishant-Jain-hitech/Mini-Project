import axios from "axios";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api";

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

apiclient.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "An unexpected error occurred";

    if (error.response) {
      const detail = error.response.data?.detail;

      if (Array.isArray(detail)) {
        message = detail[0]?.msg || "Validation error";
      } else if (typeof detail === "string") {
        message = detail;
      } else if (detail?.msg) {
        message = detail.msg;
      }
    } else if (error.request) {
      message = "No response from server. Check your connection.";
    } else {
      message = error.message;
    }

    error.message = message;
    return Promise.reject(error);
  },
);


export const loginUser = async (formData) => {
  const credentials = {
    email: formData.email,
    password: formData.password,
  };
  const response = await apiclient.post("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await apiclient.post("/auth/register", userData);
  return response.data;
};

export const updateProfile = async (username, profileImage) => {
  const response = await apiclient.put("/auth/update-profile", {
    username: username,
    profile_image: profileImage,
  });
  return response.data;
};

export const toggleWatchlistAPI = async (payload) => {
  const response = await apiclient.post("/auth/watchlist/toggle", payload);
  return response.data;
};

export const fetchWatchlist = async () => {
  const response = await apiclient.get("/auth/watchlist");
  return response.data;
};

export const fetchLiveMatches = async () => {
  const response = await apiclient.get("/cricket/matches");
  return response.data;
};

export const fetchMatchScorecard = async (matchId) => {
  const response = await apiclient.get(`/cricket/scorecard/${matchId}`);
  if (response.data?.status === "failure") {
    throw new Error(response.data.reason || "API Limit reached");
  }
  return response.data;
};


export const fetchFallbackScorecard = async () => {
  const response = await apiclient.get("/cricket/fallback-scorecard");
  return response.data;
};


export const fetchNews = async () => {
  const response = await apiclient.get("/cricket/news");
  return response.data;
};


export const fetchSeriesList = async (offset = 0) => {
  const response = await apiclient.get("/cricket/series", {
    params: { offset: offset },
  });
  return response.data;
};

export const fetchMatchInfo = async (matchId) => {
  const response = await apiclient.get(`/cricket/info/${matchId}`);
  return response.data;
};

export default apiclient;
