import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';

import { Home } from './Home';
import { SignIn } from './SignIn';

import '../static/App.css';
import { useTodo } from "../hooks/useTodo";
import { useAccounts } from '../hooks/useAccounts';
import { BugerMenu } from '../components/BurgerMenu';
import { InputMultiCheckBox } from '../components/MultiCheckBox';

const RouterApp = () => {
    const { accountList, setAccountList } = useAccounts();
    //チェックボックス表示用のリストを生成
    const accounts = accountList.map((v) => {
        return {
            id: v.id,
            item: v.username
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
        toggleTodoListItemStatus,
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
            return {
                id: v.id,
                title: v.title,
                description: v.memo,
                start: v.start_date.split('+')[0],
                end: v.end_date.split('+')[0],
                backgroundColor: 'red',
                borderColor: 'red',
                editable: true
            }
        });
        setEvents(newEvents);
    }, [accountList, todoList]);
    
    return (
        <>
            <BugerMenu items={[accountsBugerItem]} />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<SignIn nextUrl="/home" />} />

                    <Route exact path="/home" element={<Home events={{ events }} accounts={accounts} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

function App() {
    return (
        <div className="App">
            <RouterApp />
        </div>
    );
}

export default App;
