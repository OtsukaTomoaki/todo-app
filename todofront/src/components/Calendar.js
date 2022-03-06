import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

export const Calendar = ({ events, setEventsDetail, eventsClickHandler, dateClickHandler }) => {

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth,listMonth,listDay',
                }}
                footerToolbar={{
                    right: "prev,next"
                }}
                nowIndicator={true}
                dateClick={dateClickHandler}
                eventClick={eventsClickHandler}
                eventDidMount={(e) => {
                }}
                viewDidMount={((e) => {
                    setEventsDetail(e.view.type === 'listMonth');
                })}
                locale="ja"
                buttonText= {{
                    prev:     '<',
                    next:     '>',
                    prevYear: '<<',
                    nextYear: '>>',
                    today:    '今日',
                    month:    'カレンダー',
                    week:     '週',
                    day:      '日',
                    listMonth: '今月のToDo',
                    listDay: '今日のToDo'
                }}
                selectable={true}
                selectHelper={true}
                allDaySlot={false}
                events={events}
            />
        </>
    );
};