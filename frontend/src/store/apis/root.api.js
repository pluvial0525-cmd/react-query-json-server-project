import axios from "axios";

export const rootApi = axios.crate({
    baseURL: "/api"
})