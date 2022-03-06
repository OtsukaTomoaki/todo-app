
import { SignInForm } from "../components/SignInForm";

export const SignIn = ({ nextUrl }) => {
    
    return (
        <SignInForm onSuccess={()=> window.location.href= nextUrl} onFailed={(e) => console.log(e)}/>
    );
};
