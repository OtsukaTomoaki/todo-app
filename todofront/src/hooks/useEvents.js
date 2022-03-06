import { useState, useEffect } from "react";
import { fiveFinger } from "../common/fiveFingerProvider";

export const useEvents = (accountList, todoList, todoStatus, showEventsDetail) => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const selectedAccounts = accountList.filter((v) => v.selected)
        const selectedTodoStatus = todoStatus.filter((v) => v.selected)
        const newEvents = todoList.filter((v) => {
            //チェック中のユーザのタスクか
            return (
                selectedAccounts.some((account) => account.id === v.engaged_user_id)
                &&
                selectedTodoStatus.some((status) => status.id === v.state)
            );
        }).map((v) => {
            //カレンダーで読み込める形式にする
            const eventColor = selectedAccounts.find((account) => account.id === v.engaged_user_id).color;
            return {
                id: v.id,
                title: showEventsDetail ? generateEventTitleDetail(v, selectedTodoStatus, selectedAccounts) : generateEventTitle(v),
                description: v.memo,
                start: v.start_date.split('T')[0],
                end: v.end_date.split('T')[0],
                backgroundColor: eventColor,
                borderColor: eventColor,
                editable: false
            }
        });
        setEvents(newEvents);
    }, [accountList, todoList, todoStatus, showEventsDetail]);
    return {events, setEvents};
};

function generateEventTitle(todo) {
    const detailTitle = `${findFiveFingerIcon(todo.five_finger)} ${todo.title}`;
    return detailTitle;
}

function generateEventTitleDetail(todo, selectedStatus, selectedAccounts) {
    const detailTitle = `${todo.title} (${selectedStatus.find((s) => s.id === todo.state).text}) ${findFiveFingerIcon(todo.five_finger)} ${selectedAccounts.find((account)=>account.id === todo.engaged_user_id).username}`;
    return detailTitle;
}

function findFiveFingerIcon(id) {
    return fiveFinger.find((v) => v.id === id).icon;
}