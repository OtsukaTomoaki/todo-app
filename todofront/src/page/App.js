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
    const {
        todoList,
        addTodoListItem,
        toggleTodoListItemStatus,
        deleteTodoListItem
    } = useTodo();
    let events = todoList.map((v) => {
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

    const { accountList, setAccountList } = useAccounts();
    const accounts = accountList.map((v) => {
        return {
            id: v.id,
            item: v.username
        };
    });

    const checkItem = (id) => {
        const findAccount = accountList.find((account) => id === account.id);
        return findAccount.selected;
    }

    const handleChange = (e) => {
        const newAccounts = accountList.map((account) => {
            if(account.username === e.target.value){
                account['selected'] = e.target.checked;
            }
            return account;
        })
        setAccountList([...newAccounts]);
    };

    const accountsBugerItem = <InputMultiCheckBox multiCheckValues={accounts} checkedValues={checkItem} handleChange={handleChange}/>;
    return (
        <>
            <BugerMenu items={[accountsBugerItem]}/>
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
