

export const generateClickHandler = (clickEvents, doubleClickEvents) => {
    let clickCnt = 0;
    let oneClickTimer;
    const eventsClick = (e) => {
        clickCnt++;
        if (clickCnt === 1) {
            oneClickTimer = setTimeout(function () {
                clickCnt = 0;
                if(clickEvents){
                    clickEvents(e);
                }
            }, 400);
        } else if (clickCnt === 2) {
            clearTimeout(oneClickTimer);
            clickCnt = 0;
            if(doubleClickEvents){
                doubleClickEvents(e);
            }
        }
    };
    return eventsClick;
} ;