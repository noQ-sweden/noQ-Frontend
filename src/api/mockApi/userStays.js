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

function getRandomInt(max) {
    let value = Math.floor(Math.random() * (max + 1));
    return value
}

function addDays(date, nrOfDays) {
    const oldDate = new Date(date);
    oldDate.setDate(oldDate.getDate() + nrOfDays);
    const newDate = oldDate.toISOString().split("T")[0];
    return newDate;
}

function addStay(host, startDate, nrOfNights) {
    const stay = {
        "total_nights": nrOfNights,
        "start_date": startDate,
        "end_date": addDays(startDate, nrOfNights),
        "host": getHost()
    }
    return stay;
}

function getNrOfStays(maxDays) {
    if (maxDays <= 2) {
        return 1;
    } else if (maxDays > 2 && maxDays < 10) {
        return 3;
    } else {
        return 5;
    }
}

function getHost(){
    const hosts = [
        {
            region: {
                id: 3,
                name: "Stockholm City"
            },
            id: 3,
            name: "Grimmans Akutboende",
            street: "Parkgatan 48",
            postcode: "",
            city: "Sundbyberg",
        },
        {
            region: {
                id: 3,
                name: "Stockholm City"
            },
            id: 2,
            name: "Aspudden",
            street: "Skärslipargränden 13",
            postcode: "12650",
            city: "Hägersten",
        },
        {
            region: {
                id: 3,
                name: "Stockholm City"
            },
            id: 1,
            name: "BoCenter",
            street: "Fleminggatan 113",
            postcode: "11245",
            city: "Stockholm",
        }
    ];
    return hosts[getRandomInt(hosts.length - 1)]
}

export function generateStays(userId, startDate, endDate) {
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    const diffInMs = Math.abs(eDate - sDate);
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24))
    let userStays = {
        "user_id": userId,
        "first_name": firstNames[userId - 1],
        "last_name": lastNames[userId - 1],
        "user_stay_counts": null
    }
    const nrOfStays = getNrOfStays(diffInDays);
    let stays = [];
    let start = startDate;
    for (var i = 0; i < nrOfStays; ++i) {
        const total_nights = getRandomInt(diffInDays/nrOfStays);
        const end = addDays(start, total_nights)
        let stay = addStay(getHost(), start, total_nights);
        stays.push(stay);
        start = end;
    }
    userStays.user_stay_counts = stays;

    return userStays;
}

export function generateStaysMultipleUsers(startDate, endDate) {
    let stays = [];
    const nrOfUsers = getRandomInt(20);
    for (var i = 1; i < nrOfUsers + 1; ++i) {
        const userStays = generateStays(i, startDate, endDate);
        stays.push(userStays);
    }

    return stays;
}
