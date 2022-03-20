import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import FullCalendar, { EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import ReactTooltip from 'react-tooltip'

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
                eventContent={(e) => {
                    const title = e.event.title;
                    const description = e.event.extendedProps.description;
                    return (
                    <div data-tip={description}>   
                        {title}
                        <ReactTooltip className="events-tooltip" effect="float" type="dark" place="right" multiline />
                    </div>);
                }}
                viewDidMount={((e) => {
                    setEventsDetail(e.view.type === 'listMonth' || e.view.type === 'listDay');
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