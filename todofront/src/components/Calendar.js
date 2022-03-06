import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

export const Calendar = ({ events, eventsClickHandler, dateClickHandler }) => {

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,listMonth',
                }}
                footerToolbar={{
                    right: "prev,next"
                }}
                nowIndicator={true}
                dateClick={dateClickHandler}
                eventClick={eventsClickHandler}
                eventDidMount={(e) => {
                }}
                locale="ja"
                selectable={true}
                selectHelper={true}
                allDaySlot={false}
                events={events}
            />
        </>
    );
};