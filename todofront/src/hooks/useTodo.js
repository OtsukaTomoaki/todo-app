import { useState, useEffect } from "react";
import { ulid } from "ulid";

import * as todoData from "../apis/todos";

export const useTodo = () => {
    const [todoList, setTodoList] = useState([]);

    //全て取得
    useEffect(() => {
        todoData.getAllTodoData().then((response) => {
            setTodoList(response);
        });
    }, []);

    //ステータス変更
    const updateTodoListItem = (id, todoContent) => {
        todoData.updateTodoData(id, todoContent).then((updatedTodo) => {
            const newTodoList = todoList.map((item) => {
                return item.id !== updatedTodo.id ? item : updatedTodo;
            });
            setTodoList(newTodoList);
        });
    };
    //新規Todoを追加
    const addTodoListItem = (todoContent) => {

        return todoData.addTodoData(todoContent).then((addedTodo) => {
            setTodoList([addedTodo, ...todoList]);
        });
    };

    //Todoを削除
    const deleteTodoListItem = (id) => {
        todoData.deleteTodoData(id).then((deletedId) => {
            const newTodoList = todoList.filter((todo) => todo.id !== id);
            setTodoList([...newTodoList]);
        })
    };

    return {
        todoList,
        updateTodoListItem,
        addTodoListItem,
        deleteTodoListItem
    };
};

const nextTodo = (currentState) => {
    let nextState;
    switch (currentState) {
        case 'PARKING':
            nextState = 'TO';
            break;
        case 'TO':
            nextState = 'DO';
            break;
        case 'DO':
            nextState = 'DONE';
            break;
        default:
            nextState = 'PARKING';
            break;
    }
    return nextState;
};