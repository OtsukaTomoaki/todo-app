import React from "react";
import { Calendar } from "../components/Calendar";

export const Home = ({ events, accounts }) => {

    return (
        <>
            <Calendar events={events}/>
        </>
    );
};