import { useState } from "react";
import { Link } from '@mui/material';
import { SignInForm } from "../components/SignForm";
import { Typing } from "../components/Typing";
import { ErrorDialog } from "../components/ErrorDialog";
import { getTokenFromLocalStorage, removeTokenToLocalStorage } from "../common/webStorage";

export const SignIn = ({ nextUrl }) => {
    if (getTokenFromLocalStorage()){
        //認証ずみでサインイン画面に遷移した場合は認証情報を削除した上でリロードする
        removeTokenToLocalStorage();
        window.location.reload();
    }
    const [isShow, setIsShow] = useState(false);

    return (
        <div className="container">
            <ErrorDialog message="ユーザIDまたはパスワードが誤っています。" isShow={isShow} setIsShow={setIsShow} />
            <div className="signin-wrap">
                <div className="front-app-title">
                    <Typing text='ToDo Calendar' speed={100} />
                </div>
                <div className="signin-form">
                    <SignInForm
                        onSuccess={() => window.location.href = nextUrl}
                        onFailed={() => setIsShow(true)} />
                </div>
                <div className="sign-up-link">
                    <Link href="signup">新規にユーザを登録してToDo Calendarをはじめる</Link>
                </div>
            </div>

        </div>
    );
};
