import axios, {AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig} from 'axios';
import {AUTH_HOST, CLIENT_ID, CLIENT_SECRET} from "../../constants";

const handleError = async (error: AxiosError): Promise<AxiosRequestConfig | void> => {
    const originalRequest = error.config;
    console.log('handleResponse')
    if (error.response?.status === 401 || error.response?.status === 405) {
        const token = await getAuthToken();

        if (token) {
            return axios(originalRequest);
        }
    }
};

const handleRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('ct_access_token');
    console.log('handleRequest')
    if (token && config && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
};

export const initializeRequestInterceptor = () => {
    axios.interceptors.request.use(handleRequest);
};

export const initializeResponseInterceptor = () => {
    axios.interceptors.response.use(response => response, handleError);
};

const getAuthToken = async () => {
    try{
    const { data: { access_token: accessToken, expires_in: maxAge } } = await axios.post(`${AUTH_HOST}/oauth/token`, null, {
        params: { grant_type: 'client_credentials' },
        auth: {
            username: CLIENT_ID,
            password: CLIENT_SECRET
        }
    });

    storeAccessToken(accessToken);
    return accessToken;
    } catch (err) {
        // TODO: properly handle error, show notification with an error
        return err;
    }
};

const storeAccessToken  = (token) => {
    localStorage.setItem('ct_access_token', token);
};
