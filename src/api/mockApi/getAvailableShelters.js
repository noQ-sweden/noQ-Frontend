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
                    name: "Test"
                },
                id: 28,
                name: "Test",
                street: "Test Street 12",
                postcode: "12345",
                city: "Teststad"
            },
            products: [
                {
                    id: 1,
                    name: "Rum",
                    description: "Description Rum 1",
                    total_places: 5,
                    host: { 
                        region: {
                            id: 1,
                            name: "Test"
                        },
                        id: 28,
                        name: "Test",
                        street: "Test Street 12",
                        postcode: "12345",
                        city: "Teststad"
                    },
                    type: "woman-only",
                    places_left: 3
                },
                {
                    id: 50,
                    name: "Hygienartiklar",
                    description: "Tvål och shampoo",
                    total_places: 0,
                    host: { 
                        region: {
                            id: 1,
                            name: "Test"
                        },
                        id: 28,
                        name: "Test",
                        street: "Test Street 12",
                        postcode: "12345",
                        city: "Teststad"
                    },
                    type: "hygieneproducts",
                    places_left: 0
                },
                {
                    id: 52,
                    name: "Rum",
                    description: "Description Rum 2",
                    total_places: 4,
                    host: { 
                        region: {
                            id: 1,
                            name: "Test"
                        },
                        id: 28,
                        name: "Test",
                        street: "Test Street 12",
                        postcode: "12345",
                        city: "Teststad"
                    },
                    type: "room",
                    places_left: 1
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
                name: "Test",
                street: "Test Street 12",
                postcode: "12345",
                city: "Teststad"
            },
            products: [
                {
                    id: 2,
                    name: "4-bädsrum ",
                    description: "Description Rum 2",
                    total_places: 4,
                    host: { 
                        region: {
                            id: 1,
                            name: "Test"
                        },
                        id: 1,
                        name: "Test",
                        street: "Test Street 12",
                        postcode: "12345",
                        city: "Teststad"
                    },
                    type: "room",
                },
                {
                    id: 3,
                    name: "Sovsal",
                    description: "Description Rum 2",
                    total_places: 15,
                    host: { 
                        region: {
                            id: 1,
                            name: "Test"
                        },
                        id: 1,
                        name: "Test",
                        street: "Test Street 12",
                        postcode: "12345",
                        city: "Teststad"
                    },
                    type: "room",
                }            
            ]
        }
    ];
    return hosts;
}
