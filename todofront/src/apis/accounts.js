import axios from "axios";
import { getTokenFromLocalStorage } from '../common/webStorage'

const API_BASEURL = 'http://127.0.0.1:8000/api/accounts';

const API_TOKEN = `bearer ${getTokenFromLocalStorage()}`;

axios.defaults.baseURL = API_BASEURL;
axios.defaults.headers.common["Authorization"] = API_TOKEN;

export const getAllAccountsData = async () => {
    const response = await axios.get(API_BASEURL + '/list');
    return response.data;
};
