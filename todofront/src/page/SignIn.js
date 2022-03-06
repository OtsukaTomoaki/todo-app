import { useState, useEffect, useRef }  from "react";
import { fetchToken } from "../apis/auth";
import { useNavigate } from 'react-router-dom';


export const SignIn = ({ nextUrl }) => {
    const userNameRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const handleClick = async () => {
        const userName = userNameRef.current.value;
        const password = passwordRef.current.value;
        const success = await fetchToken(userName, password);
        if (success) {
            console.log(nextUrl);
            navigate(nextUrl);
        } else {

        }
    }
    return (
        <>
            <div>
                <label>メールアドレス</label>
                <input type='text' ref={userNameRef}/>
            </div>
            <div>
                <label>パスワード</label>
                <input type="password" ref={passwordRef}/>
            </div>

            <input type="button" value="更新" onClick={handleClick} />
        </>
    );
};
