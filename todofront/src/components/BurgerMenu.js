import React from "react";
import { slide as Menu } from "react-burger-menu";

const Links = () => {
    return [
        {
            text: "home",
            path: "/"
        },
        {
            text: "profile",
            path: "/profile"
        },
        {
            text: "career",
            path: "/career"
        },
        {
            text: "contact",
            path: "/contact"
        }
    ]
};
const HeaderItem = ({ text, path }) => {
    return (
        <div className="header-item">z</div>
    );
};

const Header = () => {
    const headerItems = Links();

    return (
        <>
            {
                headerItems.map((v, i) => {
                    return <HeaderItem text={v.text} path={v.path} key={i} />
                })
            }
        </>
    );
}
export const BugerMenu = () => {
    return (
        <div style={{ width: "100%", height: 50, backgroundColor: "#2C3E50"}}>
            <Menu width="100">
                <Header />
            </Menu>

            <div style={{ color: 'white', float: "left", marginLeft: 80, marginTop: 15, fontWeight: 800 }} >ToDo Calendar</div>
        </div>
    );
}