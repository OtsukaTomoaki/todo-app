import React from "react";
import { Calendar } from "../components/Calendar";
import { InputMultiCheckBox } from "../components/MultiCheckBox"

export const Home = ({ events, accounts }) => {

    return (
        <div style={{ margin: "5px 5px 0 5px" }}>
            <Calendar events={events}/>
        </div>
    );
};