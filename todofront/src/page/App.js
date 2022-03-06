import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './Home';
import { SignIn } from './SignIn';

import '../static/App.css';
import { useTodo } from "../hooks/useTodo";
import { useAccounts } from '../hooks/useAccounts';
import { useEvents } from "../hooks/useEvents";
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

    //イベントの一覧
    const { events, setEvents } = useEvents(accountList, todoList);

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
