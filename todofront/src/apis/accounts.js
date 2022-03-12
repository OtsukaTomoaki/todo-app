import axios from "axios";
import { getTokenFromLocalStorage, setTokenToLocalStorage } from '../common/webStorage'

const API_BASEURL = 'http://127.0.0.1:8000/api/accounts';

const API_TOKEN = `bearer ${getTokenFromLocalStorage()}`;

axios.defaults.baseURL = API_BASEURL;
axios.defaults.headers.common["Authorization"] = API_TOKEN;

export const getAllAccountsData = async () => {
    const response = await axios.get(API_BASEURL + '/list');
    return response.data;
};

export const addAccounts = async (email, username, password) => {
    const newAccount = {
        email, username, password
    };
    const {success, message}  = await axios.post(API_BASEURL + '/signup', newAccount).then((response) => {
        const token = response.data['token'];
        setTokenToLocalStorage(token);
        return { success: true, message: '' };
    }).catch((err) => {
        console.warn(err.response);
        let message = err.response.data?.email;
        if(!message) {
            message = err.response.data?.username;
        }
        return { success: false, message };
    });
    return await {success, message};
};

export const fetchToken = async (email, password) => {
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);

    const success = axios.post(API_BASEURL + '/token', params).then((response) => {
        const token = response.data['token'];
        setTokenToLocalStorage(token);
        return true;
    }).catch((err) => {
        console.warn(err.response);
        return false;
    });
    return success;
};
