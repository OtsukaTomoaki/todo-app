
import { SignInForm } from "../components/SignInForm";
import { Typing } from "../components/Typing";

export const SignIn = ({ nextUrl }) => {

    return (
        <div className="signin-wrap">
            <div>
                <div className="signin-title">
                    <Typing text='ToDo Calendar' speed={100} />
                </div>

                <SignInForm onSuccess={() => window.location.href = nextUrl} onFailed={(e) => console.log(e)} />
            </div>
        </div>
    );
};
