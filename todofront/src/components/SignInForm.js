import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { fetchToken } from "../apis/auth";
import { TextStyle } from "../common/styleProvider";

const Form = ({ control }) => {
    return (
        <>
            <Controller
                control={control}
                name="userid"

                render={({ field }) => (
                    <TextField
                        {...field}
                        label="ユーザID（メールアドレス）"
                        style={TextStyle}
                        margin="normal"
                        placeholder="example@icloud.com"
                        required
                    />
                )}
            />
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
            userid: '',
            password: ''
        }
    });
    const onSubmit = async (data) => {
        const success = await fetchToken(data.userid, data.password);
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