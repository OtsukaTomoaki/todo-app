import { useState, useEffect } from "react";
import * as accountsData from "../apis/accounts";


export const useAccounts = () => {
    const [accountList, setAccountList] = useState([]);
    //全て取得
    useEffect(() => {
        accountsData.getAllAccountsData().then((response) => {
            const newAccount = response.map((account) => {
                account['selected'] = true;
                return account;
            })
            setAccountList([...newAccount]);
        });
    }, []);

    return { accountList, setAccountList };
};