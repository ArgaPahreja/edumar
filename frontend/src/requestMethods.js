import axios from "axios";

const BASE_URL = "http://edumar-api.vercel.app/";
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

