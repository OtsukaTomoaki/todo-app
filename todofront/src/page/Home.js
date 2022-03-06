import { useState } from "react";
import { Calendar } from "../components/Calendar";
import { ModalDialog } from "../components/ModalDialog";
import { AddTodoForm, UpdateTodoForm } from "../components/TodoForm";
import { generateClickHandler } from "../common/clickHandler";

export const Home = ({ events, setEventsDetail, accounts, todoList, addTodo, updateTodo, deleteTodo}) => {
    const [showEventModal, setShowEventModal] = useState(false);
    const [todoForm, setTodoForm] = useState(<></>);
    const showAddForm = (e) => {
        const form = <AddTodoForm accounts={accounts} toggleShow={setShowEventModal} addTodo={addTodo} date={e.dateStr}/>;
        setTodoForm(form)
        setShowEventModal(true);
    };
    const dateClickHandler = generateClickHandler(undefined, showAddForm);
    const showUpdateForm = (e) => {
        const updatedTodo = todoList.find((todo) => todo.id === e.event.id);
        const form = <UpdateTodoForm accounts={accounts} toggleShow={setShowEventModal} updateTodo={updateTodo} deleteTodo={deleteTodo} todo={updatedTodo}/>;
        setTodoForm(form);
        setShowEventModal(true);
    };
    const eventsClickHandler = generateClickHandler(undefined, showUpdateForm);

    return (
        <>
            <ModalDialog isShow={showEventModal} toggleShow={setShowEventModal} form={todoForm}/>
            <div style={{ margin: "5px 5px 0 5px" }}>
                <Calendar events={events} setEventsDetail={setEventsDetail} eventsClickHandler={eventsClickHandler} dateClickHandler={dateClickHandler}/>
            </div>
        </>
    );
};