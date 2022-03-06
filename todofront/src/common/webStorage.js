const tokenKey = 'todoToken';

export const setTokenToLocalStorage = (value) => {
    localStorage.setItem(tokenKey, value);
};

export const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem(tokenKey);
    return token;
};

