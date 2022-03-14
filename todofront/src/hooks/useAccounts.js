import { useState, useEffect } from "react";
import * as accountsData from "../apis/accounts";
import { colorProvider } from "../common/colorProvider";
import { getLocalStorage, setLocalStorage } from "../common/webStorage";

const STORAGE_KEY = 'accounts';

export const useAccounts = () => {
    const [accountList, setAccountList] = useState([]);
    const colors = colorProvider();
    const colorKeys = Object.keys(colors);

    //accountの更新時にlocalStorageの更新も行うようにする
    const setAccountWithWebStorage = (accouts) => {
        const selectedList = accouts.map((account) => {
            return { id: account.id, selected: account.selected}
        });
        setLocalStorage(STORAGE_KEY, selectedList);
        setAccountList(accouts);
    };
    //全て取得
    useEffect(() => {
        const prevSelectedList = getLocalStorage(STORAGE_KEY);

        accountsData.getAllAccountsData().then((response) => {
            const newAccount = response.map((account, i) => {
                //ユーザを表示する際の色を割り当てる
                const colorIndex = i % colorKeys.length;
                const userColor = colors[colorKeys[colorIndex]];
                const prevStorageVal = prevSelectedList?.find((storage) => storage.id === account.id);
                account['selected'] = prevStorageVal ? prevStorageVal.selected : true;
                account['color'] = userColor;
                return account;
            })
            setAccountList([...newAccount]);
        });
    }, []);

    return { accountList, setAccountList: setAccountWithWebStorage };
};