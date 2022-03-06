import React from "react";
import { slide as Menu } from "react-burger-menu";

import { removeTokenToLocalStorage } from "../common/webStorage";

export const BugerMenu = ({ items, user }) => {
    const handleSignOut = () => {
        removeTokenToLocalStorage();
        window.location.reload();
    };
    return (
        <div style={{ width: "100%", height: 50, backgroundColor: "#2C3E50" }}>
            <Menu width="100">
                <div>
                    <label>表示するアカウント</label>
                    {
                        items.map((v, i) => {
                            return <div key={i}>{v}</div>
                        })
                    }
                </div>
                <button onClick={handleSignOut}>
                    サインアウト
                </button>
            </Menu>
            <div style={{ color: 'white', float: "left", marginLeft: 80, marginTop: 10, fontWeight: 800, fontSize: 20 }} >ToDo Calendar</div>
        </div>
    );
}