import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { addAccounts, fetchToken } from "../apis/accounts";
import { TextStyle } from "../common/styleProvider";

const Form = ({ control, addNew }) => {
    return (
        <>
            <Controller
                control={control}
                name="email"

                render={({ field }) => (
                    <TextField
                        {...field}
                        label="メールアドレス"
                        style={TextStyle}
                        margin="normal"
                        placeholder="example@icloud.com"
                        required
                    />
                )}
            />
            { addNew ? (
                            <Controller
                            control={control}
                            name="username"
            
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="ユーザ名"
                                    style={TextStyle}
                                    margin="normal"
                                    placeholder="yamada tarou"
                                    required
                                />
                            )}
                        />
            ) : <></> }
            <Controller
                control={control}
                name="password"
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="パスワード"
                        style={TextStyle}
                        required
                        margin="normal"
                        type="password"
                    />
                )}
            />
        </>
    )
};

export const SignInForm = ({ onSuccess, onFailed }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const onSubmit = async (data) => {
        const success = await fetchToken(data.email, data.password);
        if (success) {
            return onSuccess();
        } else {
            return onFailed();
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Form control={control} />
            <div className="signin-botton-wrap">
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    サインイン
                </Button>
            </div>
        </form>
    );
};

export const SignUpForm = ({ onSuccess, onFailed }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            username: '',
            password: ''
        }
    });
    const onSubmit = async (data) => {
        const { success, message } = await addAccounts(data.email, data.username, data.password);
        if (success) {
            return onSuccess(message);
        } else {
            return onFailed(message);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Form control={control} addNew={true} />
            <div className="signin-botton-wrap">
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    ユーザを登録してはじめる
                </Button>
            </div>
        </form>
    );
};