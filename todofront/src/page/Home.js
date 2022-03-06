import { useState } from "react";
import { Calendar } from "../components/Calendar";
import { ModalDialog } from "../components/ModalDialog";
import { TodoForm } from "../components/TodoForm";

export const Home = ({ events, accounts, todoList, addTodo}) => {
    const [showEventModal, setShowEventModal] = useState(false);
    const form = <TodoForm accounts={accounts} toggleShow={setShowEventModal} updateTodo={addTodo}/>;

    return (
        <>
            <ModalDialog isShow={showEventModal} toggleShow={setShowEventModal} form={form}/>
            <button onClick={() => setShowEventModal(true)}>showmodal</button>
            <div style={{ margin: "5px 5px 0 5px" }}>
                <Calendar events={events} />
            </div>
        </>
    );
};