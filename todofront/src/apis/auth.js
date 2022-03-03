import axios from "axios";

const authUrl = 'http://127.0.0.1:8000/api/accounts'
const tokenKey = 'todoToken';

//アクセストークンの取得
export const fetchToken = async (username, password) => {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    const response = await axios.post(authUrl + '/token', params);
    console.log(response.data);
    localStorage.setItem(tokenKey, response.data);
    return response.data;
};

//export const diagnosticsToken