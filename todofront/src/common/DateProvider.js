export const GetDateTimeToday = () => {
    const jstNow = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
    return jstNow.toISOString().split('+')[0];;
}