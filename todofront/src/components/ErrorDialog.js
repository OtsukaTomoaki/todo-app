import Modal from "react-modal";
import ErrorIcon from '@mui/icons-material/Error';
import { CloseButton } from "./Button";

Modal.setAppElement("#root");
export const ErrorDialog = ({ message, isShow, setIsShow }) => {
    return (
        <Modal
            isOpen={isShow}
            onRequestClose={() => setIsShow(false)}
            overlayClassName={{
                base: "overlay-base",
                afterOpen: "overlay-after",
                beforeClose: "overlay-before"
            }}
            className={{
                base: "dialog-content-base",
                afterOpen: "dialog-content-after_min",
                beforeClose: "dialog-content-before"
            }}
            closeTimeoutMS={500}
        >
            <CloseButton  onClick={() => setIsShow(false)} />
            <ErrorIcon />
            {message}
        </Modal>
    );
}