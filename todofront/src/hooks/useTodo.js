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
    const AdvanceTodoListItemStatus = (id, done) => {
        const todoItem = todoList.find((item) => item.id === id);
        const newTodoItem = { ...todoItem, state: nextTodo(todoItem.state) };

        todoData.updateTodoData(id, newTodoItem).then((updatedTodo) => {
            const newTodoList = todoList.map((item) => {
                return item.id !== updatedTodo.id ? item : updatedTodo;
            });
            setTodoList(newTodoList);
        });
    };
    //新規Todoを追加
    const addTodoListItem = (todoContent) => {
        const newTodoItem = {
            content: todoContent,
            id: ulid(),
            done: false//デフォルトでfalse
        };
        return todoData.addTodoData(newTodoItem).then((addedTodo) => {
            setTodoList([addedTodo, ...todoList]);
        });
    };

    //Todoを削除
    const deleteTodoListItem = (id) => {
        todoData.deleteTodoData(id).then((deletedId) => {
            const newTodoList = todoList.filter((todo) => todo.id !== deletedId);
            setTodoList(newTodoList);
        })
    };

    return {
        todoList,
        AdvanceTodoListItemStatus,
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