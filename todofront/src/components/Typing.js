import React, { useState, useEffect } from "react";


export const Typing = ({ text, speed }) => {
    const [content, setContent] = useState('');
    useEffect(TypeEffect(text, setContent, speed), []);

    return (
        <div>
            {content}
        </div>
    );
};

const TypeEffect = (text, setContent, speed, callbackDone) => {
    return () => {
        let timerId;
        //初回描画時にのみ実行
        const chars = text[Symbol.iterator]();

        (function type() {
            const nextChar = chars.next();
            if (nextChar.done) {
                if (callbackDone)
                    callbackDone();
                return;
            }
            // console.log(nextChar.value)
            //1文字ずつ足し込んだ後に再帰呼び出し
            setContent((currentText) => currentText + nextChar.value);
            timerId = setTimeout(type, speed);
        }());
        return () => {
            clearTimeout(timerId);
        }//アンマウント時にタイマーの解除を行う
    }
};