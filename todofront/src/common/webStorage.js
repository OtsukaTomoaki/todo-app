const tokenKey = 'todoToken';


export const setTokenToLocalStorage = (value) => {
    localStorage.setItem(tokenKey, value);
};

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem(tokenKey);
};

export const  setCookie = (name, value, days) => {
    let expires;
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/; HttpOnly";
}
