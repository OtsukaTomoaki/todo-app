import { useState, useEffect } from 'react';

const NOTIFICATION_AUTO_DISMISS = 10;
const NOTIFICATION_LEVEL_WARNING = 'warning';

export const useNotification = (todoList, accounts) => {
    const [ notification, setNotification ] = useState([]);
    //担当者名の取得
    const findEngagedAccount = (id) => {
        const engagedAccount = accounts.find((account) => account.id === id);
        return engagedAccount.username;
    }
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        //お知らせに表示する対象となり得るTodoの一覧を絞り込み
        const notificationEvents = todoList.filter(todo => {
            const startDate = todo.start_date.split('T')[0];
            return todo.state !== 'DONE' && startDate <= today; 
        });
        //遅延しているTodoの一覧
        const notificationDelay = notificationEvents
            .filter((todo => todo.end_date < today))
            .map((todo) => {
                return {
                    title: '遅延しているTODOがあります。',
                    message: `${todo.title} / ${findEngagedAccount(todo.engaged_user_id)}`,
                    level: NOTIFICATION_LEVEL_WARNING,
                    autoDismiss: NOTIFICATION_AUTO_DISMISS
                };
            });
        //メンバーのFiveFinger値が低いTodoの一覧
        const notificationUpset = notificationEvents
            .filter((todo => {
                const startDate = todo.start_date.split('T')[0];
                const endDate = todo.end_date.split('T')[0];
                return (startDate <= today && today <= endDate　 && todo.five_finger === 1);
            }))
            .map((todo) => {
                return {
                    title: 'メンバーが困っているTODOがあります。',
                    message: `${todo.title} / ${findEngagedAccount(todo.engaged_user_id)}`,
                    level: NOTIFICATION_LEVEL_WARNING,
                    autoDismiss: NOTIFICATION_AUTO_DISMISS
                };
            });
        setNotification([...notificationDelay, ...notificationUpset]);
    }, [todoList]);
    return { notification, setNotification };
};