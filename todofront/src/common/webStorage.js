const tokenKey = 'todoToken';

export const setTokenToLocalStorage = (value) => {
    localStorage.setItem(tokenKey, value);
};

export const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem(tokenKey);
    return token;
};

export const removeTokenToLocalStorage = () => {
    localStorage.removeItem(tokenKey);
};

export const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};


export const setLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value));
};
