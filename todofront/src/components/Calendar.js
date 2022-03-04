import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export const Calendar = ({ events }) => {
    console.log(events);

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                nowIndicator
                dateClick={(e) => console.log(e.dateStr)}
                eventClick={(e) => console.log(e.event.id)}
                eventDidMount= {(e)=>{

                }}
                locale="ja"
                events={events}
                // events={[
                //     {
                //         title: 'Business Lunch',
                //         description: 'foo bare',
                //         start: '2022-03-03T13:00:00',
                //         end: "2022-03-04T13:00:00",
                //         backgroundColor: "red",
                //         borderColor: "red",
                //         editable: true
                //         // constraint: 'businessHours'
                //     }
                // ]}
            />
        </>
    );
};