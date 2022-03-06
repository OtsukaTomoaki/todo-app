import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

export const Calendar = ({ events }) => {
    let clickCnt = 0;
    let oneClickTimer;
    const eventsClick = (e) => {
        clickCnt++;
        if (clickCnt === 1) {
            oneClickTimer = setTimeout(function () {
                clickCnt = 0;
            }, 400);
        } else if (clickCnt === 2) {
            clearTimeout(oneClickTimer);
            clickCnt = 0;
            alert(e.event.id);
        }
    };

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                }}
                footerToolbar={{
                    right: "prev,next"
                }}
                nowIndicator='true'
                dateClick={(e) => console.log(e.dateStr)}
                eventClick={eventsClick}
                eventDidMount={(e) => {

                }}
                locale="ja"
                selectable='true'
                selectHelper='true'
                events={events}
            />
        </>
    );
};