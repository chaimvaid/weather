import axios from "axios";
import { setAuthorizationHeaders } from "./features/redux/sessionSlice";
import { store } from "./app/store"

const initAxios = () => {
    const dispatch = store.dispatch;
    const setHeaders = (config) => dispatch(setAuthorizationHeaders(config));
    axios.interceptors.request.use((config) => {
        // set jwt token for each request
        setHeaders(config);
        return config;
    },
    error => Promise.reject(error));
}

export default initAxios;