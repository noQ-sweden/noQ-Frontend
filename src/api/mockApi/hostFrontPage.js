import { getRandomInt } from "./utility";

export var host = {
    "region": {
        "id": 5,
        "name": "Övriga landet"
    },
    "id": 1,
    "name": "Korskyrkan",
    "street": "Parkvägen 25",
    "postcode": "864 31",
    "city": "Sundsvall"
};

function addDays(date, days) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
}

export function generateAvailablePlaces(nr_of_days) {
    
    const hostSthlm = {
        region: {
            id: 3,
            name: "Stockholm City"
        },
        id: 3,
        name: "Grimmans Akutboende",
        street: "Parkgatan 48",
        postcode: "",
        city: "Sundbyberg",
    }
    const products = [
        {
            id: 45,
            name: "room",
            description: "5-bäddsrum",
            total_places: 5,
            host: hostSthlm,
            type: "room"
        },
        {
            id: 46,
            name: "room",
            description: "3-bäddsrum",
            total_places: 3,
            host: hostSthlm,
            type: "room"
        },
        {
            id: 47,
            name: "room",
            description: "7-bäddsrum",
            total_places: 7,
            host: hostSthlm,
            type: "room"
        },
    ]

    const currentDate = new Date()
    var available = {}
    for (let i = 0; i < nr_of_days; i++) {
        var dateAvailable = addDays(currentDate, i).toISOString().split('T')[0];
        var bookings = []
        var id_a = 0;
        for (const product in products) {
            const nr_of_places = products[product].total_places
            let nr_of_available_places = getRandomInt(nr_of_places);
            var availableProducts = {
                'id': id_a,
                'available_date': dateAvailable,
                'product': products[product],
                'places_left': nr_of_available_places
            }
            bookings.push(availableProducts)
            id_a += 1;
        }
        available[dateAvailable] = bookings
    }
    return {'available_dates' : available}
}