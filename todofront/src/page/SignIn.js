import React, { useState, useEffect, useRef }  from "react";
import { fetchToken } from "../apis/auth";

export const SignIn = () => {
    const userNameRef = useRef(null);
    const passwordRef = useRef(null);

    const handleClick = () => {
        const userName = userNameRef.current.value;
        const password = passwordRef.current.value;
        console.log(userNameRef.current.value)
        const response = fetchToken(userName, password);

        console.log(response);
    }
    return (
        <>
            <div>
                <label>メールアドレス</label>
                <input type='text' ref={userNameRef}/>
            </div>
            <div>
                <label>パスワード</label>
                <input type="text" ref={passwordRef}/>
            </div>

            <input type="button" value="更新" onClick={handleClick} />
        </>
    );
};
