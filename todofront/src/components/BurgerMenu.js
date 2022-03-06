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
        <div style={{ width: "100%", height: 50, backgroundColor: "#2C3E50" }}>
            <Menu width="100">
                <div className="buger-menu-content">
                    <label>表示するアカウント</label>
                    {
                        accountCheckItems
                    }
                </div>
                <div className="buger-menu-content">
                    <label>表示するTodo</label>
                    {
                        todoStatusCheckItems
                    }
                </div>
                <div className="buger-menu-content_bottom">
                    <Button onClick={handleSignOut} color='primary' type="button" variant="outlined">
                        サインアウト
                    </Button>
                </div>
            </Menu>
            <div style={{ color: 'white', float: "left", marginLeft: 80, marginTop: 10, fontWeight: 800, fontSize: 20 }} >ToDo Calendar</div>
        </div>
    );
}