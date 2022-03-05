import React from "react";
import { slide as Menu } from "react-burger-menu";

export const BugerMenu = ({ items }) => {
    return (
        <div style={{ width: "100%", height: 50, backgroundColor: "#2C3E50" }}>
            <Menu width="100">
                <div>
                    <label>accounts:</label>
                    {
                        items.map((v, i) => {
                            return <div key={i}>{v}</div>
                        })
                    }
                </div>
            </Menu>
            <div style={{ color: 'white', float: "left", marginLeft: 80, marginTop: 10, fontWeight: 800, fontSize: 20 }} >ToDo Calendar</div>
        </div>
    );
}