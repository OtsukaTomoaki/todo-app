import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './Home';
import { SignIn } from './SignIn';

import '../static/App.css';
import { useTodo } from "../hooks/useTodo";
import { useAccounts } from '../hooks/useAccounts';
import { useEvents } from "../hooks/useEvents";
import { useNotification } from "../hooks/useNotification";
import { useTodoStatus } from "../hooks/useTodoStatus";
import { BugerMenu } from '../components/BurgerMenu';
import { AccountMultiCheckBox, TodoStatusMultiCheckBox } from '../components/MultiCheckBox';
import { Notification } from "../components/Notification";

import { validateToken } from "../common/signinUserProvider";
import { SignUp } from "./SignUp";

const RouterApp = () => {
    //アカウント一覧
    const { accountList, setAccountList } = useAccounts();
    const accountsBugerItem = AccountMultiCheckBox(accountList, setAccountList);

    //todoのステータス一覧
    const {todoStatus, setTodoStatus} = useTodoStatus();
    const todoStatusBugerItem = TodoStatusMultiCheckBox(todoStatus, setTodoStatus);

    //todoの一覧
    const {
        todoList,
        addTodoListItem,
        updateTodoListItem,
        deleteTodoListItem
    } = useTodo();

    const [showEventsDetail, setShowEventsDetail] = useState(false);
    //イベントの一覧
    const { events, setEvents } = useEvents(accountList, todoList, todoStatus, showEventsDetail);

    //お知らせの一覧
    const { notification, setNotification } = useNotification(todoList, accountList);
    return (
        <>
            <BugerMenu accountCheckItems={accountsBugerItem} todoStatusCheckItems={todoStatusBugerItem}/>
            <Notification notifications={notification}/>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/home" element={<Home events={{ events }} setEventsDetail={setShowEventsDetail} accounts={accountList} todoList={todoList} addTodo={addTodoListItem} updateTodo={updateTodoListItem} deleteTodo={deleteTodoListItem} />} />
                </Routes>
                <Routes>
                    <Route exact path="/signin" element={ <SignIn nextUrl="/home" />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

const AnounymouseRouterApp = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/signin" element={ <SignIn nextUrl="/home" />} />
                    <Route exact path="/signup" element={ <SignUp nextUrl="/home" />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

function App() {
    const has_auth = validateToken();
    return (
        <div className="App">
            {
                has_auth ? <RouterApp /> : <AnounymouseRouterApp />
            }
        </div>
    );
}

export default App;
