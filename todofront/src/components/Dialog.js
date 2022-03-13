import Modal from "react-modal";
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import { CloseButton } from "./Button";

Modal.setAppElement("#root");
export const InfoDialog = ({ message, isShow, setIsShow }) => {
    return (
        <Dialog message={message} isShow={isShow} setIsShow={setIsShow} />
    );
}

export const ErrorDialog = ({ message, isShow, setIsShow }) => {
    return (
        <Dialog message={message} isShow={isShow} setIsShow={setIsShow} error={true}/>
    );
}

const Dialog = ({ message, isShow, setIsShow, error }) => {
    const contentClassName = error ? "dialog-content-after_error" : "dialog-content-after_info";
    const icon = error ? <ErrorIcon /> : <InfoIcon />;
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
                afterOpen: contentClassName,
                beforeClose: "dialog-content-before"
            }}
            closeTimeoutMS={500}
        >
            <CloseButton  onClick={() => setIsShow(false)} />
            {icon}
            {message}
        </Modal>
    );
};