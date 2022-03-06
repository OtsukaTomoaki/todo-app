import { getTokenFromLocalStorage } from './webStorage'

export const parseJwt = () => {
    const token = getTokenFromLocalStorage();

    if(!token)
    {
        return false;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export const getUserId = () => {
    return parseJwt()['userid'];
};

export const validateToken = () => {
    const tokenPayload = parseJwt();

    if(!tokenPayload) {
        return false
    } else {
        //トークンの有効期限を確認する
        const nowTimeStamp = Math.floor(new Date().getTime()/ 1000 );
        const tokenExp = parseFloat(tokenPayload['exp']);

        console.log(nowTimeStamp, tokenExp);
        return nowTimeStamp < tokenExp;
    }
}