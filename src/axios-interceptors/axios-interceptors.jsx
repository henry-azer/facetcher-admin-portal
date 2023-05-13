import axios from "axios";
import Cookies from "universal-cookie";
import { ACCESS_TOKEN } from "../constants/app_constants";

const cookies = new Cookies();

axios.interceptors.request.use((config) => {
    const token = cookies.get(ACCESS_TOKEN); 
    if (token && token !== "undefined") {
         config.headers.Authorization = `Bearer ${token}`;
     }
    return config;
});

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);