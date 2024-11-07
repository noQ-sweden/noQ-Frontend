import { getRandomInt, getFirstName, getGender, getLastName, getPhoneNumber, getSteetName } from "./utility";

export var users = [];

// Define functions to modify user list
export function addUser(userData) {
    users.push(userData);
    return users;
}

export function deleteUser(userId) {
    const index = users.findIndex((user) => user.id === userId);
    if (index !== -1) {
      users.splice(index, 1);
      return true;
    }    
    return false;
}

export function updateUser(userData) {
    const userId = userData.id;
    users[userId - 1].email = userData.email;
    users[userId - 1].password = userData.password;
    users[userId - 1].first_name = userData.first_name;
    users[userId - 1].last_name = userData.last_name;
    users[userId - 1].phone = userData.phone;
    users[userId - 1].gender = userData.gender;
    users[userId - 1].street = userData.street;
    users[userId - 1].postcode = userData.postcode;
    users[userId - 1].city = userData.city;
    users[userId - 1].country = userData.country;
    users[userId - 1].region = userData.region;
    users[userId - 1].day_of_birth = userData.day_of_birth;
    users[userId - 1].personnr_lastnr = userData.personnr_lastnr;
    return users[userId - 1];
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
            "id": i + 1,
            "email": firstName + "." + lastName + "@test.nu",
            "password": "test1234",
            "first_name": firstName,
            "last_name": lastName,
            "phone": getPhoneNumber(),
            "gender": gender,
            "street": getSteetName() + " " + (getRandomInt(124) + 1),
            "postcode": 33444,
            "city": "Stockholm",
            "country": "Sverige",
            "region": 0,
            "unokod": firstName[0] + lastName[0] + "0721",
            "personnr_lastnr": "1234"
        }
        users.push(user);
    }

    return true;
}
