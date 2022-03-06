import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Button, MenuItem } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { fetchToken } from "../apis/auth";

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
                        fullWidth
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
                        fullWidth
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
            <Form control={control}/>
            <Button
                variant="contained"
                color="primary"
                type="submit"
            >
                サインイン
            </Button>
        </form>
    );
};