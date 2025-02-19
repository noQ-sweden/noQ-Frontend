/*
    Expected output
    {
        "host": {
        "region": {
            "id": 0,
            "name": "string"
        },
        "id": 0,
        "name": "string",
        "street": "string",
        "postcode": "",
        "city": ""
        },
        "products": [
        {
            "id": 0,
            "name": "string",
            "description": "string",
            "total_places": 0,
            "host": {
            "region": {
                "id": 0,
                "name": "string"
            },
            "id": 0,
            "name": "string",
            "street": "string",
            "postcode": "",
            "city": ""
            },
            "type": "string",
            "places_left": 0
        }
        ]
    }
*/

// Define and export generateAvailableShelter function
export function getAvailableShelters() {
    const hosts = [
        {
            host: { 
                region: {
                    id: 1,
                    name: "Stockholm"
                },
                id: 28,
                name: "Bostället",
                street: "Storvägen 59",
                postcode: "12345",
                city: "Malmö",
            },
            products: [
                {
                    id: 1,
                    name: "Rum",
                    description: "Description Rum 1",
                    total_places: 5,
                    places_left: 3,
                    type: "woman-only",
                    features: [
                        { label: "Öppet", value: "Dygnet runt."},
                        { label: "Bara kvinnor", value: "Ja" },
                        { label: "Egen toalett", value: "Nej" },
                        { label: "Egen dusch", value: "Nej" },
                        { label: "Hiss", value: "Nej" },
                        { label: "TV", value: "Ja, i gemensamma utrymmen" },
                        { label: "Wi-Fi", value: "Ja" },
                        { label: "Tillgänglighetsanpassning för rörelsehindrade", value: "Ja" },
                    ],
                    available_dates: [
                        { available_date: "2025-02-25" },
                        { available_date: "2025-02-27" }
                    ]
                },
                
                {
                    id: 52,
                    name: "Rum",
                    description: "Description Rum 2",
                    total_places: 4,
                    places_left: 1,
                    type: "room",
                    available_dates: [
                        { available_date: "2025-02-26" }
                    ]
                },
            ]
        },
        {
            host: { 
                region: {
                    id: 1,
                    name: "Test"
                },
                id: 1,
                name: "Ny gemenskap",
                street: "Skolvägen 12",
                postcode: "12345",
                city: "Teststad"
            },
            products: [
                {
                    id: 2,
                    name: "4-bädsrum ",
                    description: "Rum 2",
                    total_places: 4,
                    places_left: 2,
                    type: "room",
                    features: [
                        { label: "Öppet", value: "Dygnet runt."},
                        { label: "Matsal", value: "Ja" },
                        { label: "Wi-Fi", value: "Ja" },
                        { label: "Hiss", value: "Nej" },
                        { label: "Rökning inomhus", value: "Nej" },
                        { label: "Husdjur", value: "Nej" },
                        { label: "Egen toalett", value: "Nej" },
                        { label: "Egen dusch", value: "Nej" },
                        { label: "Pentry", value: "Nej" },
                        { label: "TV", value: "Ja" },
                        { label: "Tillgänglighetsanpassning för rörelsehindrade", value: "Nej" },
                    ],
                    available_dates: [
                        { available_date: "2025-02-28" },
                        { available_date: "2025-03-01" }
                    ]
                },
                {
                    id: 3,
                    name: "Sovsal",
                    description: "Description Rum 2",
                    total_places: 15,
                    places_left: 5,
                    type: "room",
                    available_dates: [
                        { available_date: "2025-02-26" }
                    ]
                },
               
            ]
        },
        {
            host: { 
                region: {
                    id: 5,
                    name: "Stockholm"
                },
                id: 5,
                name: "Hvilan",
                street: "Ingemarsgatan 9",
                postcode: "113 54",
                city: "Stockholm"
            },
            products: [
                {
                    id: 5,
                    name: "Dubbelrum",
                    description: "Rum 2",
                    total_places: 13,
                    places_left: 5,
                    type: "room",
                    features: [
                        { label: "Öppet", value: "Dygnet runt."},
                        { label: "Matsal", value: "Ja" },
                        { label: "Wi-Fi", value: "Ja" },
                        { label: "Hiss", value: "Nej" },
                        { label: "Rökning inomhus", value: "Nej" },
                        { label: "Husdjur", value: "Nej" },
                        { label: "Egen toalett", value: "Nej" },
                        { label: "Egen dusch", value: "Nej" },
                        { label: "Pentry", value: "Nej" },
                        { label: "TV", value: "Ja" },
                        { label: "Tillgänglighetsanpassning för rörelsehindrade", value: "Nej" },
                        
                    ],
                },
                {
                    id: 6,
                    name: "Enkelrum",
                    description: "Description Rum 2",
                    total_places: 8,
                    places_left: 4,
                    type: "room",
                },
            ]
        }
    ];
    return hosts;
}
