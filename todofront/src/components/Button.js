import { Button } from "@material-ui/core";

export const SubmitButton = ({ text, onClick }) => {
    return (
        <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={onClick}
        >
            {text}
        </Button>
    )
};

export const DefaultButton = ({ text, onClick }) => {
    return (
        <Button
            variant="outlined"
            color='inherit'
            type="button"
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

export const InheritButton = ({ text, onClick }) => {
    return (
        <Button
            onClick={onClick}
            color='inherit'
            type="button">
            {text}
        </Button>
    );
};

export const CloseButton = ({ onClick }) => {
    return (
        <div className="dialog-close-button-wrap">
            <InheritButton text="✖️" onClick={onClick} />
        </div>
    );
}