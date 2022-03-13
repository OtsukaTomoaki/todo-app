import { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@material-ui/core/Button';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { InfoDialog } from "./Dialog";
import { removeTokenToLocalStorage } from "../common/webStorage";

export const BugerMenu = ({ accountCheckItems, todoStatusCheckItems, notifications, showNotification }) => {
    const [isDialogShow, setIsDialogShow] = useState(false);

    //お知らせボタンクリック
    const onNotificationClick = () => {
        if(notifications.length){
            showNotification(notifications, 10);
        } else {
            setIsDialogShow(true);
        }
    }
    //サインアウトボタンクリック
    const handleSignOut = () => {
        //認証情報を削除して、サインイン画面にリダイレクトする
        removeTokenToLocalStorage();
        window.location.href = '/signin';
    };
    return (
        <div className="buger-menu-wrap">
            <InfoDialog message="新規のお知らせはありません。" isShow={isDialogShow} setIsShow={setIsDialogShow} />
            <Menu width={450}>
                <div className="buger-menu-content">
                    <label className="buger-menu-content-title">表示するメンバー</label>
                    <div className="buger-menu-content-item">
                    {
                        accountCheckItems
                    }
                    </div>
                </div>
                <div className="buger-menu-content">
                    <label className="buger-menu-content-title">表示する進捗</label>
                    <div className="buger-menu-content-item">
                    {
                        todoStatusCheckItems
                    }
                    </div>
                </div>
            </Menu>
            <div className="header-app-name" >ToDo Calendar</div>
            <div className="header-left-item">
                <span>
                <Button onClick={onNotificationClick} color='inherit' type="button">
                    { notifications.length > 0 ? <span className="notification-count">{notifications.length}</span> : <></>}
                    <CircleNotificationsIcon />
                    お知らせ
                </Button>                
                </span>
                <span>
                <Button onClick={handleSignOut} color='inherit' type="button">
                    <LogoutIcon />
                    サインアウト
                </Button>
                </span>

            </div>
        </div>
    );
}