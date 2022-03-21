import axios from "axios";
import { getTokenFromLocalStorage } from '../common/webStorage'

const API_BASEURL = 'http://127.0.0.1:8000/api/todo';

const API_TOKEN = `bearer ${getTokenFromLocalStorage()}`;

axios.defaults.baseURL = API_BASEURL;
axios.defaults.headers.common["Authorization"] = API_TOKEN;

export const getAllTodoData = async () => {
    const response = await axios.get(`${API_BASEURL}/`);
    return response.data;
};

export const addTodoData = async (todo) => {
    const response = await axios.post(`${API_BASEURL}/`, todo);
    return response.data;
}

export const getTodoData = async (id) => {
    const response = await axios.get(`${API_BASEURL}/detail/${id}`);
    return response.data;
};

export const updateTodoData = async (id, todo) => {
    const response = await axios.put(`${API_BASEURL}/detail/${id}`, todo);
    return response.data;
}

export const deleteTodoData = async (id) => {
    const response = await axios.delete(`${API_BASEURL}/detail/${id}`);
    return response.data;
}