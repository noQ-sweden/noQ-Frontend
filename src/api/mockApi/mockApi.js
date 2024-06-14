import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

export const axiosMockNoqApi = axios.create({
  headers: {
      "Content-type": "application/json",
    },
  withCredentials: true,
});

const noqMockApi =
    new AxiosMockAdapter(axiosMockNoqApi, { delayResponse: 0, onNoMatch: "throwException" });

noqMockApi.onPost('api/login/').reply((config) => {
    const data = JSON.parse(config.data);
    const login =
    {
        login_status: true,
        message: "Login Successful",
        groups: ["user"],
    };

    if (data.email == 'user.user@test.nu' && data.password == 'P4ssw0rd_for_Te5t+User') {
        return [200, JSON.stringify(login)];
    } else if (data.email == 'user.host@test.nu' && data.password == 'P4ssw0rd_for_Te5t+User') {
        login.groups = ["host"];
        return [200, JSON.stringify(login)];
    } else {
        login.login_status = false;
        login.message = "Login Failed";
        login.groups = null;
        return [200, JSON.stringify(login)];
    }
});

const pendingBookings = [
    {
        id: 1,
        status: {
            description: "pending"
        },
        start_date: "2024-06-13",
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
            last_edit: "2024-06-05"
        }
    },
    {
        id: 2,
        status: {
            description: "pending"
        },
        start_date: "2024-08-21",
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
                last_edit: "2024-05-05"
        }
    },
    {
        id: 3,
        status: {
            description: "pending"
        },
        start_date: "2024-07-21",
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
            last_edit: "2024-05-23"
        }
    }
];

noqMockApi.onGet('api/host/pending').reply(() => {
    return [200, JSON.stringify(pendingBookings)];
});
