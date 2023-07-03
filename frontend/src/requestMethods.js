import axios from "axios";

const BASE_URL = "https://edumar-api.vercel.app/";
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

