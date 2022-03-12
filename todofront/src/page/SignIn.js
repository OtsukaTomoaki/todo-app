import { useState } from "react";
import { SignInForm } from "../components/SignInForm";
import { Typing } from "../components/Typing";
import { ErrorDialog } from "../components/ErrorDialog";

export const SignIn = ({ nextUrl }) => {
    const [isShow, setIsShow] = useState(false);

    return (
        <div className="container">
            <ErrorDialog message="ユーザIDまたはパスワードが誤っています。" isShow={isShow} setIsShow={setIsShow}/>
            <div className="signin-wrap">
                <div>
                    <div className="signin-title">
                        <Typing text='ToDo Calendar' speed={100} />
                    </div>

                    <SignInForm 
                    onSuccess={() => window.location.href = nextUrl} 
                    onFailed={() => setIsShow(true)} />
                </div>
            </div>
        </div>
    );
};
