import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Button, MenuItem } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { fetchToken } from "../apis/auth";
import { TextStyle } from "../common/styleProvider";

const Form = ({ control, accounts }) => {
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

                        margin="normal"
                        type="password"
                    />
                )}
            />
        </>
    )
};

export const SignInForm = ({ onSuccess, onFailed }) => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            userid: '',
            password: ''
        }
    });
    const onSubmit = async (data) => {
        const success = await fetchToken(data.userid, data.password);
        if (success) {
            onSuccess();
        } else {
            onFailed()
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Form control={control} />
            <div>
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