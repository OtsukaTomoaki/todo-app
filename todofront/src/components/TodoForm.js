import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Button, MenuItem } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

export const TodoForm = ({ todo, accounts }) => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            checkBox: false,
            textBox: "",
            pullDown: "",
        },
    });
    const onSubmit = () => {
    };
    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="checkBox"
                render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={value}
                                onChange={onChange}
                                color='primary'
                            />
                        }
                        label="チェックボックス"
                    />
                )}
            />
            <Controller
                control={control}
                name="title"
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="タイトル"
                        fullWidth
                        margin="normal"
                        placeholder="タイトル"
                    />
                )}
            />
            <Controller
                control={control}
                name="memo"

                render={({ field }) => (
                    <TextField
                        {...field}
                        label="概要"
                        fullWidth
                        margin="normal"
                        placeholder="概要"
                        multiline
                        maxRows={4}
                    />
                )}
            />
            <Controller
                control={control}
                name="start_at"

                render={({ field }) => (
                    <TextField
                        {...field}
                        label="開始日"
                        margin="normal"
                        placeholder="開始日"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                )}
            />
            <Controller
                control={control}
                name="days"

                render={({ field }) => (
                    <TextField
                        {...field}
                        label="所要日数"
                        margin="normal"
                        placeholder="所要日数"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                )}
            />
            <Controller
                control={control}
                name="pullDown"
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="担当者"
                        fullWidth
                        margin="normal"
                        id="select"
                        select
                    >
                        {
                            accounts.map((account) => <MenuItem key={account.id} value={account.id}>{account.username}</MenuItem>)
                        }
                    </TextField>
                )}
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
            >
                更新
            </Button>
        </form>
    );
};