const firstNames = [
    "Kalle", "Pelle", "Ville", "Göran", "Mats",
    "Matilda", "Lisa", "Lena", "Gunilla", "Helen", 
    "Agnes", "Karl", "Erik", "Lars", "Anders",
    "Maria", "Elisabeth", "Anna", "Kristina", "Eva"
];

const lastNames = [
    "Andersson", "Johansson", "Karlsson", "Nilsson", "Eriksson",
    "Larsson", "Olsson", "Persson", "Svensson", "Gustafsson", 
    "Pettersson", "Jonsson", "Hansson", "Bengtsson", "Jönsson",
    "Lindberg", "Jacobsson", "Magnusson", "Lindström", "Olofsson"
];

function addDays(date, nrOfDays) {
    const oldDate = new Date(date);
    oldDate.setDate(oldDate.getDate() + nrOfDays);
    return oldDate.toISOString().split("T")[0];
}

function addStay(host, startDate, nrOfNights) {
    const stay = {
        "total_nights": nrOfNights,
        "start_date": startDate,
        "end_date": addDays(startDate, nrOfNights),
        "host": host
    };
    return stay;
}

function getNrOfStays(diffInDays) {
    if (diffInDays <= 2) {
        return 1;
    } else if (diffInDays > 2 && diffInDays < 10) {
        return 3;
    } else {
        return 5;
    }
}

function getHost(index) {
    const hosts = [
        {
            region: { id: 3, name: "Stockholm City" },
            id: 3,
            name: "Grimmans Akutboende",
            street: "Parkgatan 48",
            postcode: "",
            city: "Sundbyberg",
        },
        {
            region: { id: 3, name: "Stockholm City" },
            id: 2,
            name: "Aspudden",
            street: "Skärslipargränden 13",
            postcode: "12650",
            city: "Hägersten",
        },
        {
            region: { id: 3, name: "Stockholm City" },
            id: 1,
            name: "BoCenter",
            street: "Fleminggatan 113",
            postcode: "11245",
            city: "Stockholm",
        }
    ];
    return hosts[index % hosts.length];
}


export function generateStays(userId, startDate, endDate) {
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    const diffInMs = Math.abs(eDate - sDate);
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    const userStays = {
        user_id: userId,
        first_name: firstNames[userId - 1],
        last_name: lastNames[userId - 1],
        user_stay_counts: []
    };

    const nrOfStays = getNrOfStays(diffInDays);
    const stayLength = Math.floor(diffInDays / nrOfStays);
    let start = startDate;

    for (let i = 0; i < nrOfStays; i++) {
        const end = addDays(start, stayLength);
        const host = getHost(i);
        const stay = addStay(host, start, stayLength);

        userStays.user_stay_counts.push(stay);
        start = end;
    }

    return userStays;
}

export function generateStaysMultipleUsers(startDate, endDate) {
    const nrOfUsers = firstNames.length;
    const stays = [];

    for (let i = 1; i <= nrOfUsers; i++) {
        const userStays = generateStays(i, startDate, endDate);
        stays.push(userStays);
    }

    return stays;
}
