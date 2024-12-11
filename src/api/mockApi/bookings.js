export var userBookings = [];
//List of guest bookings
export var bookings = [
    {
        id: 1,
        status: {
            description: "pending"
        },
        booking_time:"2024-06-01T09:43:18.476Z",
        start_date: "2024-06-13",
        end_date: "2024-06-17",
        product: {
            id: 26,
            name: "woman-only",
            description: "2-bäddsrum för kvinnor",
            total_places: 2,
            host: {
                region: {
                    id: 3,
                    name: "Stockholm City"
                },
                id: 3,
                name: "Grimmans Akutboende",
                street: "Parkgatan 48",
                postcode: "",
                city: "Sundbyberg"
            },
            type: "woman-only"
        },
        user: {
            region: {
                id: 2,
                name: "Farsta"
            },
            id: 1,
            user: 11,
            first_name: "Katarina",
            last_name: "Davidsson",
            gender: "K",
            street: "Kvarntorget 9",
            postcode: "",
            city: "Handen",
            country: "",
            phone: "0705-434613",
            email: "katarina.davidsson@hotmejl.se",
            unokod: "6871",
            day_of_birth: null,
            personnr_lastnr: "",
            requirements: null,
            last_edit: "2024-06-05",
            flag: true
        }
    },
    {
        id: 2,
        status: {
            description: "pending"
        },
        booking_time:"2024-06-01T09:43:18.476Z",
        start_date: "2024-07-21",
        end_date: "2024-07-25",
        product: {
            id: 25,
            name: "room",
            description: "2-bäddsrum",
            total_places: 2,
            host: {
                region: {
                        id: 3,
                        name: "Stockholm City"
                },
                id: 3,
                name: "Grimmans Akutboende",
                street: "Parkgatan 48",
                postcode: "",
                city: "Sundbyberg"
            },
            type: "room"
        },
        user: {
            region: {
                id: 2,
                name: "Farsta"
                },
                id: 3,
                user: 13,
                first_name: "Stefan",
                last_name: "Johansson",
                gender: "M",
                street: "Kyrkogränd 6",
                postcode: "",
                city: "Handen",
                country: "",
                phone: "0701-401093",
                email: "stefan.johansson@hotmejl.se",
                unokod: "5246",
                day_of_birth: null,
                personnr_lastnr: "",
                requirements: null,
                last_edit: "2024-05-05",
                flag: true
        }
    },
    {
        id: 3,
        status: {
            description: "pending"
        },
        booking_time:"2024-06-01T09:43:18.476Z",
        start_date: "2024-08-01",
        end_date: "2024-08-25",
        product: {
            id: 45,
            name: "room",
            description: "5-bäddsrum",
            total_places: 5,
            host: {
                region: {
                    id: 3,
                    name: "Stockholm City"
                },
                id: 3,
                name: "Grimmans Akutboende",
                street: "Parkgatan 48",
                postcode: "",
                city: "Sundbyberg"
            },
            type: "room"
        },
        user: {
            region: {
                id: 3,
                name: "Stockholm City"
            },
            id: 6,
            user: 16,
            first_name: "Marie-Louise",
            last_name: "Eriksson",
            gender: "K",
            street: "Skolstigen 9",
            postcode: "",
            city: "Stockholm",
            country: "",
            phone: "0701-465846",
            email: "marie-louise.eriksson@hotmejl.se",
            unokod: "1019",
            day_of_birth: null,
            personnr_lastnr: "",
            requirements: null,
            last_edit: "2024-05-23",
            flag: false
        }
    },
    {
        id: 4,
        status: {
            description: "pending"
        },
        booking_time:"2024-06-01T09:43:18.476Z",
        start_date: "2024-08-03",
        end_date: "2024-08-05",
        product: {
            id: 25,
            name: "room",
            description: "2-bäddsrum",
            total_places: 2,
            host: {
                region: {
                        id: 3,
                        name: "Stockholm City"
                },
                id: 3,
                name: "Grimmans Akutboende",
                street: "Parkgatan 48",
                postcode: "",
                city: "Sundbyberg"
            },
            type: "room"
        },
        user: {
            region: {
                id: 2,
                name: "Farsta"
                },
                id: 3,
                user: 13,
                first_name: "Stefan",
                last_name: "Johansson",
                gender: "M",
                street: "Kyrkogränd 6",
                postcode: "",
                city: "Handen",
                country: "",
                phone: "0701-401093",
                email: "stefan.johansson@hotmejl.se",
                unokod: "5246",
                day_of_birth: null,
                personnr_lastnr: "",
                requirements: null,
                last_edit: "2024-05-05",
                flag: false
        }
    },
    {
        id: 5,
        status: {
            description: "confirmed"
        },
        booking_time:"2024-06-01T09:43:18.476Z",
        start_date: "2024-08-04",
        end_date: "2024-08-20",
        product: {
            id: 1,
            name: "room",
            description: "5-bäddsrum",
            total_places: 5,
            host: {
                region: {
                    id: 2,
                    name: "Trelleborg"
                },
                id: 4,
                name: "Ny Gemenskap",
                street: "Kyrkgatan 4",
                postcode: "",
                city: "Trelleborg"
            },
            type: "room"
        },
        user: {
            region: {
                id: 3,
                name: "Stockholm City"
            },
            id: 6,
            user: 16,
            first_name: "Marie-Louise",
            last_name: "Eriksson",
            gender: "K",
            street: "Skolstigen 9",
            postcode: "",
            city: "Stockholm",
            country: "",
            phone: "0701-465846",
            email: "marie-louise.eriksson@hotmejl.se",
            unokod: "1019",
            day_of_birth: null,
            personnr_lastnr: "",
            requirements: null,
            last_edit: "2024-05-23",
            flag: false
        }
    },
    {
        id: 6,
        status: {
            description: "confirmed"
        },
        booking_time:"2024-06-01T09:43:18.476Z",
        start_date: "2024-08-06",
        end_date: "2024-08-12",
        product: {
            id: 1,
            name: "room",
            description: "5-bäddsrum",
            total_places: 5,
            host: {
                region: {
                    id: 2,
                    name: "Trelleborg"
                },
                id: 4,
                name: "Ny Gemenskap",
                street: "Kyrkgatan 4",
                postcode: "",
                city: "Trelleborg"
            },
            type: "room"
        },
        user: {
            region: {
                id: 3,
                name: "Stockholm City"
            },
            id: 6,
            user: 16,
            first_name: "Marie-Louise",
            last_name: "Eriksson",
            gender: "K",
            street: "Skolstigen 9",
            postcode: "",
            city: "Stockholm",
            country: "",
            phone: "0701-465846",
            email: "marie-louise.eriksson@hotmejl.se",
            unokod: "1019",
            day_of_birth: null,
            personnr_lastnr: "",
            requirements: null,
            last_edit: "2024-05-23",
            flag: true
        }
    },
    {
        id: 7,
        status: {
            description: "checked_in"
        },
        booking_time:"2024-06-01T09:43:18.476Z",
        start_date: "2024-08-14",
        end_date: "2024-09-27",
        product: {
            id: 25,
            name: "room",
            description: "2-bäddsrum",
            total_places: 2,
            host: {
                region: {
                        id: 3,
                        name: "Stockholm City"
                },
                id: 3,
                name: "Grimmans Akutboende",
                street: "Parkgatan 48",
                postcode: "",
                city: "Sundbyberg"
            },
            type: "room"
        },
        user: {
            region: {
                id: 2,
                name: "Farsta"
                },
                id: 5,
                user: 15,
                first_name: "Johan",
                last_name: "Johansson",
                gender: "M",
                street: "Kyrkogränd 6",
                postcode: "",
                city: "Handen",
                country: "",
                phone: "0701-401093",
                email: "johan.johansson@hotmejl.se",
                unokod: "5224",
                day_of_birth: null,
                personnr_lastnr: "",
                requirements: null,
                last_edit: "2024-05-05",
                flag: false
        }
    }
];

export function generateBookings() {
    const user = {
        region: {
            id: 2,
            name: "Farsta"
        },
        id: 5,
        user: 15,
        first_name: "Johan",
        last_name: "Johansson",
        gender: "M",
        street: "Kyrkogränd 6",
        postcode: "",
        city: "Handen",
        country: "",
        phone: "0701-401093",
        email: "johan.johansson@hotmejl.se",
        unokod: "5224",
        day_of_birth: null,
        personnr_lastnr: "",
        requirements: null,
        last_edit: "2024-05-05",
        flag: false
    };

    const product = {
        id: 25,
        name: "room",
        description: "2-bäddsrum",
        total_places: 2,
        host: {
            region: {
                id: 3,
                name: "Stockholm City"
            },
            id: 3,
            name: "Grimmans Akutboende",
            street: "Parkgatan 48",
            postcode: "",
            city: "Sundbyberg"
        },
        type: "room"
    };

    const getRandomDate = (startDate) => {
        const date = new Date(startDate);
        const daysToAdd = Math.floor(Math.random() * 30); // Add up to 30 days for randomness
        date.setDate(date.getDate() + daysToAdd);
        return date;
    };

    const formatDate = (date) => date.toISOString().split("T")[0]; // Format as "YYYY-MM-DD"

    const isOverlapping = (newStart, newEnd, existingBookings) => {
        for (const booking of existingBookings) {
            const existingStart = new Date(booking.start_date);
            const existingEnd = new Date(booking.end_date);
            if (
                (newStart >= existingStart && newStart <= existingEnd) ||
                (newEnd >= existingStart && newEnd <= existingEnd) ||
                (newStart <= existingStart && newEnd >= existingEnd)
            ) {
                return true;
            }
        }
        return false;
    };

    const bookings = [];
    const currentDate = new Date();
    let id = 1;

    while (userBookings.length < 3) {
        const startDate = getRandomDate(currentDate);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 3) + 1); // 1 to 3 days duration

        if (!isOverlapping(startDate, endDate, bookings)) {
             userBookings.push({
                id: id++,
                status: {
                    description: "reserved"
                },
                booking_time: new Date().toISOString(),
                start_date: formatDate(startDate),
                end_date: formatDate(endDate),
                product: product,
                user: user
            });
        }
    }
}
