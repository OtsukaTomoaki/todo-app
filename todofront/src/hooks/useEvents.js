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
            const engagedAccount = findEngagedAccount(v, selectedAccounts);
            const startDate = v.start_date.split('T')[0];
            const endDate = v.end_date.split('T')[0];
            const statusText = selectedTodoStatus.find((s) => s.id === v.state).text;
            const fiveFinger = findFiveFingerIcon(v.five_finger);
            return {
                id: v.id,
                title: showEventsDetail ? generateEventTitleDetail(v, statusText, engagedAccount, fiveFinger) : generateEventTitle(v, engagedAccount, fiveFinger),
                description: generateEventDescription(v, statusText, engagedAccount, fiveFinger),
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


function generateEventTitle(todo, account, fiveFinger) {
    const detailTitle = `${fiveFinger.icon} ${todo.title}　${account.username}`;
    return detailTitle;
}

//イベントの詳細表示(カレンダーのツールチップで表示)
function generateEventDescription(todo, statusText, account, fiveFinger) {
    const description = 
    `タイトル：${todo.title}<br />
    担当者：${account.username}<br />
    進捗：${statusText}<br />
    ファイブフィンガー：${fiveFinger.text}${fiveFinger.icon}`;
    return description;
}

function findEngagedAccount(todo, accounts) {
    return accounts.find((account)=>account.id === todo.engaged_user_id);
}

function generateEventTitleDetail(todo, statusText, account, fiveFinger) {
    const detailTitle = `${todo.title} (${statusText}) ${fiveFinger.icon} ${account.username}`;
    return detailTitle;
}

function findFiveFingerIcon(id) {
    return fiveFinger.find((v) => v.id === id);
}