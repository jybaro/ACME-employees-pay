const getPayByTime = (dayOfWeek, startMinutes, endMinutes) => {
    let pay = 0;

    let pays = [25, 15, 20]; 
    if ('SA,SU'.split(',').includes(dayOfWeek)) {
        pays = [30, 20, 25];
    }

    const limit0 = 0;
    const limit1 = 9 * 60;
    const limit2 = 18 * 60;

    let minutes = 0;

    if (startMinutes > limit0 && startMinutes <= limit1) {
        if (endMinutes <= limit1) {
            minutes = endMinutes - startMinutes; 
        } else {
            minutes = limit1 - startMinutes; 
            startMinutes = limit1 + 1;
        } 
        pay += pays[0] * minutes / 60;
    }

    if (startMinutes > limit1 && startMinutes <= limit2) {
        if (endMinutes <= limit2) {
            minutes = endMinutes - startMinutes; 
        } else {
            minutes = limit2 - startMinutes; 
            startMinutes = limit2 + 1;
        } 
        pay += pays[1] * minutes / 60;
    }

    if (startMinutes > limit2) {
        minutes = endMinutes - startMinutes; 
        pay += pays[2] * minutes / 60;
    }

    return pay;
};

const getAmountByText = (text) => {
    const parts = text.split('='); 
    let name='Unknown', amount=0, error = true, localError;
    if (parts.length === 2) {
        name = parts[0];
        const times = parts[1];
        const days = times.split(',');

        if (days.length > 0) {

            error = false;
            days.forEach(day => {

                localError = true;
                const dayCode = day.substring(0, 2);
                const timeInterval = day.substring(2);
                if (
                    dayCode.length === 2 && 
                    'MO,TU,WE,TH,FR,SA,SU'.split(',').includes(dayCode) && 
                    timeInterval.length === 11
                ) {
                    const timeParts= timeInterval.split('-');
                    if (timeParts.length === 2){
                        const timeStart = timeParts[0];
                        const timeEnd = timeParts[1];
                        if (timeStart.length === 5 && timeEnd.length === 5 ) {
                            const timeStartParts = timeStart.split(':');
                            const timeEndParts = timeEnd.split(':');
                            if (timeStartParts.length === 2 && timeEndParts.length === 2) {
                                const timeStartHours = Number(timeStartParts[0]);
                                const timeStartMinutes = Number(timeStartParts[1]);
                                const timeEndHours = Number(timeEndParts[0]);
                                const timeEndMinutes = Number(timeEndParts[1]);
                                if (
                                Math.floor(Math.abs(timeStartHours)) === timeStartHours &&
                                Math.floor(Math.abs(timeStartMinutes)) === timeStartMinutes &&
                                Math.floor(Math.abs(timeEndHours)) === timeEndHours &&
                                Math.floor(Math.abs(timeEndMinutes)) === timeEndMinutes &&
                                timeStartHours < 24 &&
                                timeEndHours < 24 &&
                                timeStartMinutes < 60 &&
                                timeEndMinutes < 60 &&
                                timeStartHours * 60 + timeStartMinutes < timeEndHours * 60 + timeEndMinutes
                                ) {
                                    localError = false;
                                    amount += getPayByTime(
                                        dayCode,
                                        timeStartHours * 60 + timeStartMinutes,
                                        timeEndHours * 60 + timeEndMinutes
                                    );
                                }
                            }
                        }
                    }
                }
                error = error || localError; 
            });
        }
    }
    return {name, amount, error};
};