
const MultiCheckButtonItems = ({ onChange, multiCheckValues, checkedValues }) => {
    return multiCheckValues.map((value) => {
        return (
            //key属性にvalue.idを指定する
            <li key={value.id}>
                    <input
                        type="checkbox"
                        value={value.item}
                        onChange={onChange}
                        checked={checkedValues(value.id)}
                    />
                    {value.item}
            </li>
        );
    });
};

export const InputMultiCheckBox = ({ multiCheckValues, checkedValues, handleChange }) => {
    return (
        <div className="">
            <ul style={{ listStyle: "none", textAlign:"left" }}>
                <MultiCheckButtonItems onChange={handleChange} multiCheckValues={multiCheckValues} checkedValues={checkedValues}/>
            </ul>
        </div>
    );
};