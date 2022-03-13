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
            const startDate = v.start_date.split('T')[0];
            const endDate = v.end_date.split('T')[0];;
            return {
                id: v.id,
                title: showEventsDetail ? generateEventTitleDetail(v, selectedTodoStatus, selectedAccounts) : generateEventTitle(v, selectedAccounts),
                description: v.memo,
                start: startDate,
                end: endDate,
                backgroundColor: eventColor,
                borderColor: eventColor,
                editable: false
            }
        });
        setEvents(newEvents);
    }, [accountList, todoList, todoStatus, showEventsDetail]);
    return {events, setEvents};
};


function countHoriday(start, diffDays) {

    const [startY, startM, startD] = start.split('-');
    const startDate = new Date(startY, startM, startD); 

    let addDays = 0;
    for(let i = 1; i < diffDays; i++) {
        startDate.setDate(startDate.getDate() + i);
        const dayIndex = startDate.getDay();
        console.log(startDate, startDate.getDate(), dayIndex);
        if (dayIndex === 0) {
            addDays += 1;
            i = i + 4;
        } else if (dayIndex === 6) {
            addDays += 2;
            i = i + 2;
        } else {
            console.log('dayIndex', dayIndex, (5 - dayIndex), i)
            i = i + (5 - dayIndex); 
        }
    } 
    console.log(start, diffDays, startDate, addDays);

    return addDays;
}

function addDay(current, addCount) {
    const [startY, startM, startD] = current.split('-');
    const currentDate = new Date(startY, startM, startD);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + addCount + 1);

    const result = `${endDate.getFullYear()}-${endDate.getMonth().toString().padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}`;
    console.log('addDay', current, addCount, endDate, result);
    return result;
}

function generateEventTitle(todo, selectedAccounts) {
    const detailTitle = `${findFiveFingerIcon(todo.five_finger)} ${todo.title}　${selectedAccounts.find((account)=>account.id === todo.engaged_user_id).username}`;
    return detailTitle;
}

function generateEventTitleDetail(todo, selectedStatus, selectedAccounts) {
    const detailTitle = `${todo.title} (${selectedStatus.find((s) => s.id === todo.state).text}) ${findFiveFingerIcon(todo.five_finger)} ${selectedAccounts.find((account)=>account.id === todo.engaged_user_id).username}`;
    return detailTitle;
}

function findFiveFingerIcon(id) {
    return fiveFinger.find((v) => v.id === id).icon;
}