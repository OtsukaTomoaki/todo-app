import React from "react";
import { slide as Menu } from "react-burger-menu";
import Button from '@material-ui/core/Button';

import { removeTokenToLocalStorage } from "../common/webStorage";

export const BugerMenu = ({ accountCheckItems, todoStatusCheckItems }) => {
    const handleSignOut = () => {
        removeTokenToLocalStorage();
        window.location.reload();
    };
    return (
        <div className="buger-menu-wrap">
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
                <Button onClick={handleSignOut} color='inherit' type="button">
                    サインアウト
                </Button>
            </div>
        </div>
    );
}