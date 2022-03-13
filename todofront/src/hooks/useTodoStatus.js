import { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../common/webStorage";

const STORAGE_KEY = 'todostatus';

const initializeTodoStatus = [
    { 
        id: 'PARKING',
        text: '保留中',
        selected: true
    },
    { 
        id: 'TODO',
        text: '未着手',
        selected: true
    },
    { 
        id: 'DOING',
        text: '仕掛り中',
        selected: true
    },
    { 
        id: 'DONE',
        text: '完了',
        selected: false
    },
];

export const useTodoStatus = () => {
    const [todoStatus, setTodoStatus] = useState(initializeTodoStatus);

    //accountの更新時にlocalStorageの更新も行うようにする
    const setTodoStatusWithWebStorage = (newTodoStatus) => {
        const selectedList = newTodoStatus.map((todo) => {
            return { id: todo.id, selected: todo.selected}
        });
        setLocalStorage(STORAGE_KEY, selectedList);
        setTodoStatus(newTodoStatus);
    };
    //LocalStorageの値をセット
    useEffect(() => {
        const prevSelectedList = getLocalStorage(STORAGE_KEY);
        if (prevSelectedList){
            const newTodoStatus = todoStatus.map((todoState, i) => {
                //ユーザを表示する際の色を割り当てる
                const prevStorageVal = prevSelectedList.find((storage) => storage.id === todoState.id);
                todoState['selected'] = prevStorageVal ? prevStorageVal.selected : true;
                return todoState;
            })
            setTodoStatusWithWebStorage(newTodoStatus);
        }
    }, []);

    return { todoStatus, setTodoStatus: setTodoStatusWithWebStorage };
};