import axios from "axios";
import { setTokenToLocalStorage } from "../common/webStorage"

const authUrl = 'http://127.0.0.1:8000/api/accounts'

//アクセストークンの取得
export const fetchToken = async (username, password) => {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    const success = axios.post(authUrl + '/token', params).then((response) => {
        const token = response.data['token'];
        setTokenToLocalStorage(token);
        return true;
    }).catch((err) => {
        console.warn(err);
        return false;
    });
    return await success;
};

//export const diagnosticsToken