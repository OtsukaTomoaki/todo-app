import { useState, useEffect } from "react";

import * as todoData from "../apis/todos";

export const useTodo = () => {
    const [todoList, setTodoList] = useState([]);

    //全て取得(todo:全て取得するとコストが増えるので、前後も含め3ヶ月程度を絞り込んで取得できるようにする)
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
