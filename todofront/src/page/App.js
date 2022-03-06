import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './Home';
import { SignIn } from './SignIn';

import '../static/App.css';
import { useTodo } from "../hooks/useTodo";
import { useAccounts } from '../hooks/useAccounts';
import { BugerMenu } from '../components/BurgerMenu';
import { InputMultiCheckBox } from '../components/MultiCheckBox';

import { validateToken, getUserId } from "../common/signinUserProvider";

const RouterApp = () => {
    const { accountList, setAccountList } = useAccounts();

    //チェックボックス表示用のリストを生成
    const accounts = accountList.map((v) => {
        return {
            id: v.id,
            item: v.username,
            color: v.color
        };
    });
    //要素がチェック状態にあるか検索した結果を返す関数
    const checkItem = (id) => {
        const findAccount = accountList.find((account) => id === account.id);
        return findAccount.selected;
    }
    //チェックされた際にaccountListの更新を行う
    const handleChange = (e) => {
        const newAccounts = accountList.map((account) => {
            if (account.username === e.target.value) {
                account['selected'] = e.target.checked;
            }
            return account;
        })
        setAccountList(newAccounts);
    };
    const accountsBugerItem = <InputMultiCheckBox multiCheckValues={accounts} checkedValues={checkItem} handleChange={handleChange} />;

    //todoの一覧
    const {
        todoList,
        addTodoListItem,
        updateTodoListItem,
        deleteTodoListItem
    } = useTodo();

    const [events, setEvents] = useState([]);
    useEffect(() => {
        const selectedAccounts = accountList.filter((account) => account.selected)
        const newEvents = todoList.filter((v) => {
            //チェック中のユーザのタスクか
            return selectedAccounts.some((account) => account.id === v.engaged_user_id);
        }).map((v) => {
            //カレンダーで読み込める形式にする
            const eventColor = selectedAccounts.find((account) => account.id === v.engaged_user_id).color;
            return {
                id: v.id,
                title: v.title,
                description: v.memo,
                start: v.start_date.split('T')[0],
                end: v.end_date.split('T')[0],
                backgroundColor: eventColor,
                borderColor: eventColor,
                editable: false
            }
        });
        setEvents(newEvents);
    }, [accountList, todoList]);

    return (
        <>
            <BugerMenu items={[accountsBugerItem]} />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/home" element={<Home events={{ events }} accounts={accountList} todoList={todoList} addTodo={addTodoListItem} updateTodo={updateTodoListItem} deleteTodo={deleteTodoListItem} />} />
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
                has_auth ? <RouterApp /> : <SignIn nextUrl="/home" />
            }
        </div>
    );
}

export default App;
