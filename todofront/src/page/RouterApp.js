import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { SignIn } from './SignIn';

export const RouterApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<SignIn nextUrl="/home"/>} />

                <Route exact path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};