import { useState, useEffect } from "react";
import * as accountsData from "../apis/accounts";
import { colorProvider } from "../common/colorProvider";

export const useAccounts = () => {
    const [accountList, setAccountList] = useState([]);
    const colors = colorProvider();
    const colorKeys = Object.keys(colors);
    //全て取得
    useEffect(() => {
        accountsData.getAllAccountsData().then((response) => {
            const newAccount = response.map((account, i) => {
                //ユーザを表示する際の色を割り当てる
                const colorIndex = i % colorKeys.length;
                const userColor = colors[colorKeys[colorIndex]];

                account['selected'] = true;
                account['color'] = userColor;
                return account;
            })
            setAccountList([...newAccount]);
        });
    }, []);

    return { accountList, setAccountList };
};