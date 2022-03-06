import { useState, useEffect } from "react";

export const useEvents = (accountList, todoList) => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const selectedAccounts = accountList.filter((account) => account.selected)
        const newEvents = todoList.filter((v) => {
            //チェック中のユーザのタスクか
            return selectedAccounts.some((account) => account.id === v.engaged_user_id);
        }).map((v) => {
            //カレンダーで読み込める形式にする
            const eventColor = selectedAccounts.find((account) => account.id === v.engaged_user_id).color;
            return {
                id: v.id,
                title: v.title,
                description: v.memo,
                start: v.start_date.split('T')[0],
                end: v.end_date.split('T')[0],
                backgroundColor: eventColor,
                borderColor: eventColor,
                editable: false
            }
        });
        setEvents(newEvents);
    }, [accountList, todoList]);
    return {events, setEvents};
};