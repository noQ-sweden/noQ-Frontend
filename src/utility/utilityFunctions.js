export const getMonth = (date) => {
    if (typeof date === 'undefined') {
        return "NaN";
    }
    const values = date.split('-');
    var month = '';
    switch(values[1]) {
        case '01':
            month="JAN";
            break;
        case '02':
            month="FEB";
            break;
        case '03':
            month="MAR";
            break;
        case '04':
            month="APR";
            break;
        case '05':
            month="MAJ";
            break;
        case '06':
            month="JUN";
            break;
        case '07':
            month="JUL";
            break;
        case '08':
            month="AUG";
            break;
        case '09':
            month="SEP";
            break;
        case '10':
            month="OCT";
            break;
        case '11':
            month="NOV";
            break;
        default:
            month="DEC";
    }
    return month;
}

export const getGender = (gender) => {
    if (gender === 'K') {
        return "Kvinna";
    } else if (gender === 'M') {
        return "Man";
    } else {
        return "Annan"
    }
}

export const getDayNumber = (date) => {
    if (typeof date === 'undefined') {
        return "NaN";
    }
    const values = date.split('-');
    return values[2];
}

export const getDate = (datetime) => {
    if (typeof datetime === 'undefined') {
        return "NaN";
    }
    const date = datetime.split('T')[0];
    return date;
}

export const getStatus = (status) => {
    /*
        statuses = [
            {"id": State.PENDING, "description": "pending"}, //red
            {"id": State.DECLINED, "description": "declined"},
            {"id": State.ACCEPTED, "description": "accepted"},
            {"id": State.CHECKED_IN, "description": "checked_in"},
            {"id": State.IN_QUEUE, "description": "in_queue"}, // yellow
            {"id": State.RESERVED, "description": "reserved"},
            {"id": State.CONFIRMED, "description": "confirmed"},
        ]
    */
    if (status === 'accepted') {
        return "Tilldelat";
    } else if (status === 'declined') {
        return "Nekad";
    } else if (status === 'pending') {
        return "Avvaktar";
    } else if (status === 'checked_in') {
        return "Incheckad";
    } else if (status === 'in_queue') {
        return "I kö";
    } else if (status === 'reserved') {
        return "Reserverad";
    } else if (status === 'confirmed') {
        return "Bekräftad";
    } else {
        return ""
    }
}
