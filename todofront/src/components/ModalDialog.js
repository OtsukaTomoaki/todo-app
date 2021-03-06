import Modal from "react-modal";
import { CloseButton } from "./Button";

Modal.setAppElement("#root");

export const ModalDialog = ({ isShow, toggleShow, form }) => {
    return (
        <Modal
            isOpen={isShow}
            onRequestClose={() => toggleShow(false)}
            overlayClassName={{
                base: "overlay-base",
                afterOpen: "overlay-after",
                beforeClose: "overlay-before"
            }}
            className={{
                base: "dialog-content-base",
                afterOpen: "dialog-content-after",
                beforeClose: "dialog-content-before"
            }}
            closeTimeoutMS={500}
        >
            <CloseButton onClick={() => toggleShow(false)} />
            {form}
            {/* <button onClick={() => toggleShow(false)}>Close Modal</button> */}
        </Modal>
    );
}