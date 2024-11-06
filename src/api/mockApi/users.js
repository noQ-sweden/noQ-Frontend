import { getRandomInt, getFirstName, getGender, getLastName, getPhoneNumber } from "./utility";

export var users = [];

// Define functions to modify user list
export function addUser(userData) {
    users.push(userData);
    return users;
}

export function deleteUser(userId) {
    return users;
}

export function modifyUser(userData) {
    return users;
}

export function getUsers() {
    return users;
}

export function initUserList() {
    var nrOfUsers = getRandomInt(20);

    for (var i = 0; i < nrOfUsers; ++i) {
        var gender = getGender();
        var firstName = getFirstName(gender);
        var lastName = getLastName();

        var user = {
            "email": firstName + "." + lastName + "@test.nu",
            "password": "test1234",
            "first_name": firstName,
            "last_name": lastName,
            "phone": getPhoneNumber(),
            "gender": gender,
            "street": "string",
            "postcode": "string",
            "city": "string",
            "country": "Sverige",
            "region": 0,
            "day_of_birth": "2024-11-06",
            "personnr_lastnr": "1234"
        }
        users.push(user);
    }

    return true;
}
