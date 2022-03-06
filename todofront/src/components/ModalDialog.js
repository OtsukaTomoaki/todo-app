import Modal from "react-modal";
Modal.setAppElement("#root");

export const ModalDialog = ({ isShow, toggleShow, form }) => {
    console.log(form);
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
                base: "content-base",
                afterOpen: "content-after",
                beforeClose: "content-before"
            }}
            closeTimeoutMS={500}
        >
            {form}
            {/* <button onClick={() => toggleShow(false)}>Close Modal</button> */}
        </Modal>
    );
}