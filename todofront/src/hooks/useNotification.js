import { useState, useEffect } from 'react';
import TaskIcon from '@mui/icons-material/Task';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { DefaultButton } from '../components/Button';
import { GetDateTimeToday } from '../common/DateProvider';

const NOTIFICATION_AUTO_DISMISS = 5;
const NOTIFICATION_LEVEL_WARNING = 'warning';

export const useNotification = (todoList, accounts, onClick) => {

    const [ notification, setNotification ] = useState([]);

    useEffect(() => {
        const today = GetDateTimeToday();
        //お知らせに表示する対象となり得るTodoの一覧を絞り込み
        const notificationEvents = todoList.filter(todo => {
            const startDate = todo.start_date.split('T')[0];
            return todo.state !== 'DONE' && startDate <= today; 
        });
        //遅延しているTodoの一覧
        const notificationDelay = notificationEvents
            .filter((todo => todo.end_date.split('T')[0] < today))
            .map((todo) => {
                return GenerateNotificationItem(
                    '遅延しているTODOがあります。', 
                    todo, 
                    accounts,
                    onClick);
            });
        //メンバーのFiveFinger値が低いTodoの一覧
        const notificationUpset = notificationEvents
            .filter((todo => {
                const startDate = todo.start_date.split('T')[0];
                const endDate = todo.end_date.split('T')[0];
                return (startDate <= today && today <= endDate　 && todo.five_finger === 1);
            }))
            .map((todo) => {
                return GenerateNotificationItem(
                    'メンバーが困っているTODOがあります。', 
                    todo, 
                    accounts,
                    onClick);
            });
        setNotification([...notificationDelay, ...notificationUpset]);
    }, [todoList]);

    //お知らせの再表示
    const showNotification = (notifications, autoDismiss) => {
        const newNotification = notifications.map((notification) => {
            return {...notification, autoDismiss}
        })
        setNotification(newNotification);
    };
    return { notification, setNotification, showNotification };
};

const GenerateNotificationItem = (title, todo, accounts, onClick) => {
    return {
        title: title,
        level: NOTIFICATION_LEVEL_WARNING,
        autoDismiss: NOTIFICATION_AUTO_DISMISS,
        children: (NotificationItem(todo, accounts, onClick))
    };
};

const NotificationItem = (todo, accounts, onClick) => {
    const clickHandler = () => {
        onClick(todo);
    };
    return (
        <div>
            <div>
                {`${todo.title} / ${findEngagedAccount(todo.engaged_user_id, accounts)}`}
            </div>
            <DefaultButton text='詳細' onClick={clickHandler}/>
        </div>
    );
};

//担当者名の取得
const findEngagedAccount = (id, accounts) => {
    const engagedAccount = accounts.find((account) => account.id === id);
    return engagedAccount.username;
}