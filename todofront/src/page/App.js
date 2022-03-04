import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Home } from './Home';
import { SignIn } from './SignIn';

import '../static/App.css';
import { useTodo } from "../hooks/useTodo";
import { useAccounts } from '../hooks/useAccounts';
import { BugerMenu } from '../components/BurgerMenu';

const RouterApp = () => {
    const {
        todoList,
        addTodoListItem,
        toggleTodoListItemStatus,
        deleteTodoListItem
    } = useTodo();
    const events = todoList.map((v) => {
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
    const { accountList } = useAccounts();
    const accounts = accountList.map((v) => {
        return {
            id: v.id,
            item: v.username
        };
    });
    const multiCheckValues = [
        { id: 1, item: "フロントエンド" },
        { id: 2, item: "バックエンド" },
        { id: 3, item: "ネイティブ" }
    ];
    return (
        <>
            <BugerMenu />
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
