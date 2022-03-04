import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Home } from './Home';
import { SignIn } from './SignIn';

import '../static/App.css';
import { useTodo } from "../hooks/useTodo";
import { useAccounts } from '../hooks/useAccounts';

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
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<SignIn nextUrl="/home" />} />

                <Route exact path="/home" element={<Home events={{events}} accounts={accountList} />} />
            </Routes>
        </BrowserRouter>
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
