import Checkbox from '@mui/material/Checkbox';

const MultiCheckButtonItems = ({ onChange, multiCheckValues, checkedValues }) => {
    return multiCheckValues.map((value) => {
        return (
            //key属性にvalue.idを指定する
            <li key={value.id}>

                <Checkbox
                    value={value.item}
                    onChange={onChange}
                    checked={checkedValues(value.id)}
                    sx={{
                        color: value.color,
                        '&.Mui-checked': {
                            color: value.color,
                        },
                    }}
                />
                {value.item}
            </li>
        );
    });
};

export const InputMultiCheckBox = ({ multiCheckValues, checkedValues, handleChange }) => {
    return (
        <div className="">
            <ul style={{ listStyle: "none", textAlign: "left" }}>
                <MultiCheckButtonItems onChange={handleChange} multiCheckValues={multiCheckValues} checkedValues={checkedValues} />
            </ul>
        </div>
    );
};

export const AccountMultiCheckBox = (accountList, setAccountList) => {
        //チェックボックス表示用のリストを生成
        const accounts = accountList.map((v) => {
            return {
                id: v.id,
                item: v.username,
                color: v.color
            };
        });
        //要素がチェック状態にあるか検索した結果を返す関数
        const checkItem = (id) => {
            const findAccount = accountList.find((account) => id === account.id);
            return findAccount.selected;
        }
        //チェックされた際にaccountListの更新を行う
        const handleChange = (e) => {
            const newAccounts = accountList.map((account) => {
                if (account.username === e.target.value) {
                    account['selected'] = e.target.checked;
                }
                return account;
            })
            setAccountList(newAccounts);
        };
        return <InputMultiCheckBox multiCheckValues={accounts} checkedValues={checkItem} handleChange={handleChange} />;
};

export const TodoStatusMultiCheckBox = (todoStatusList, setTodoStatusList) => {
    //チェックボックス表示用のリストを生成
    const statusItems = todoStatusList.map((status) => {
        return {
            id: status.id,
            item: status.text,
        };
    });

    //要素がチェック状態にあるか検索した結果を返す関数
    const checkItem = (id) => {
        const findStatus = todoStatusList.find((v) => id === v.id);
        return findStatus.selected;
    }
    //チェックされた際にstatusListの更新を行う
    const handleChange = (e) => {
        const newStatus = todoStatusList.map((v) => {
            if (v.text === e.target.value) {
                v['selected'] = e.target.checked;
            }
            return v;
        })
        setTodoStatusList(newStatus);
    };
    return <InputMultiCheckBox multiCheckValues={statusItems} checkedValues={checkItem} handleChange={handleChange} />;
};