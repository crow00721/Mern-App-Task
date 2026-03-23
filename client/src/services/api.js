import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-app-task-esl5.onrender.com/api",
});

export const askAI = (prompt) => API.post("/ask-ai", { prompt });

export const saveChat = (data) => API.post("/save", data);