import { useState } from "react";
import { Link } from '@mui/material';
import { SignUpForm } from "../components/SignForm";
import { Typing } from "../components/Typing";
import { ErrorDialog } from "../components/ErrorDialog";

export const SignUp = ({ nextUrl }) => {
    const [isShow, setIsShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    return (
        <div className="container">
            <ErrorDialog message={errorMessage} isShow={isShow} setIsShow={setIsShow} />
            <div className="signin-wrap">
                <div className="front-app-title">
                    <Typing text='ToDo Calendar' speed={100} />
                </div>
                <div className="signin-form">
                    <SignUpForm
                        onSuccess={() => window.location.href = nextUrl}
                        onFailed={(e) => {
                            setErrorMessage(e);
                            setIsShow(true);
                        }} />
                </div>
                <div className="sign-up-link">
                    <Link href="signin">すでに登録済みのユーザでToDo Calendarを使う</Link>
                </div>
            </div>

        </div>
    );
};
