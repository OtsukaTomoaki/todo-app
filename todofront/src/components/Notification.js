import { useEffect, useRef } from 'react';
import NotificationSystem from 'react-notification-system';

export const Notification = ({ notifications }) => {
    const ref = useRef();
    useEffect(() => {
        const addNotification = (newNotification) => {
            const notificationElem = ref.current;
            notificationElem.addNotification(newNotification);
        };

        notifications?.map((notification) => addNotification(notification))
    }, [notifications])

    return (
        <NotificationSystem ref={ref} />
    );
};