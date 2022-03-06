import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Button, MenuItem } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { parseJwt } from "../common/signinUserProvider";
import { TextStyle, SmallTextStyle } from "../common/styleProvider";
import { fiveFinger } from "../common/fiveFingerProvider";

const Form = ({ control, accounts }) => {
    return (
        <>
            <Controller
                control={control}
                name="title"
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="タイトル"
                        style={TextStyle}
                        required
                        margin="normal"
                        placeholder="タイトル"
                    />
                )}
            />
            <Controller
                control={control}
                name="start_date"

                render={({ field }) => (
                    <TextField
                        {...field}
                        label="開始日"
                        margin="normal"
                        placeholder="開始日"
                        required
                        style={SmallTextStyle}
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                )}
            />
            <Controller
                control={control}
                name="days_required"
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="所要日数"
                        margin="normal"
                        placeholder="所要日数"
                        style={SmallTextStyle}
                        required
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                )}
            />
            <Controller
                control={control}
                name="engaged_user_id"
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="担当者"
                        margin="normal"
                        style={TextStyle}
                        required
                        id="select_engaged_user_id"
                        select
                    >
                        {
                            accounts.map((account) => <MenuItem key={account.id} value={account.id}>{account.username}</MenuItem>)
                        }
                    </TextField>
                )}
            />
            <Controller
                control={control}
                name="state"
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="進捗"
                        style={TextStyle}
                        margin="normal"
                        id="select_state"
                        select
                    >
                        <MenuItem value="PARKING">保留中</MenuItem>
                        <MenuItem value="TODO">未着手</MenuItem>
                        <MenuItem value="DOING">仕掛り中</MenuItem>
                        <MenuItem value="DONE">完了</MenuItem>
                    </TextField>
                )}
            />

            <Controller
                control={control}
                name="memo"

                render={({ field }) => (
                    <TextField
                        {...field}
                        label="概要"
                        style={TextStyle}
                        margin="normal"
                        placeholder="概要"
                        multiline
                        maxRows={8}
                    />
                )}
            />

            <Controller
                control={control}
                name="five_finger"
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="ファイブ・フィンガー"
                        style={TextStyle}
                        margin="normal"
                        id="select_five_finger"
                        select
                    >
                        {
                            fiveFinger.map((v) => <MenuItem key={v.id} value={v.id}>{v.text}{v.icon}</MenuItem>)
                        }
                    </TextField>
                )}
            />
        </>
    )
};

export const AddTodoForm = ({ accounts, addTodo, toggleShow, date }) => {
    const { userid } = parseJwt();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            title: '',
            days_required: 1,
            state: "TODO",
            engaged_user_id: userid,
            start_date: date,
            five_finger: 3
        },
    });
    const onSubmit = (data) => {
        addTodo(data);
        toggleShow(false);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Form control={control} accounts={accounts} />
            <Button
                variant="contained"
                color="primary"
                type="submit"
            >
                追加
            </Button>
        </form>
    );
};

export const UpdateTodoForm = ({ accounts, updateTodo, deleteTodo, toggleShow, todo }) => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            id: todo.id,
            title: todo.title,
            memo: todo.memo,
            days_required: todo.days_required,
            state: todo.state,
            engaged_user_id: todo.engaged_user_id,
            start_date: todo.start_date.split('T')[0],
            five_finger: todo.five_finger
        },
    });
    const onSubmit = (data) => {
        updateTodo(todo.id, data);
        toggleShow(false);
    };

    const onDelete = () => {
        const confirmOk = window.confirm('削除します。よろしいですか？');
        if (confirmOk) {
            deleteTodo(todo.id);
            toggleShow(false);
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Form control={control} accounts={accounts} />
            <Button
                variant="contained"
                color="primary"
                type="submit"
            >
                更新
            </Button>
            <Button
                variant="contained"
                color="secondary"
                type="button"
                onClick={onDelete}
            >
                削除
            </Button>
        </form>
    );
};
