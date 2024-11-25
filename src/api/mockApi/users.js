import { v4 as uuidv4 } from "uuid";
import {
  getRandomInt,
  getFirstName,
  getGender,
  getLastName,
  getPhoneNumber,
  getSteetName,
} from "./utility";

export var users = [];

// Define functions to modify user list
export function addUser(userData) {
  if (!userData.id) {
    userData.id = uuidv4();
  }
  const newUser = { ...userData };
  users.push(newUser);
  return newUser;
}

export function deleteUser(userId) {
  const index = users.findIndex((user) => user.id === userId);
  if (index !== -1) {
    users.splice(index, 1);
  }

  // Delete from local storage
  const storedUsers = localStorage.getItem("users");
  let localStorageUsers = storedUsers ? JSON.parse(storedUsers) : [];
  const localStorageIndex = localStorageUsers.findIndex(
    (user) => user.id === userId
  );
  // Update local storage
  localStorage.setItem("users", JSON.stringify(localStorageUsers));

  return index !== -1 || localStorageIndex !== -1;
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
      id: uuidv4(),
      email: firstName + "." + lastName + "@test.nu",
      password: "test1234",
      first_name: firstName,
      last_name: lastName,
      phone: getPhoneNumber(),
      gender: gender,
      street: getSteetName() + " " + (getRandomInt(124) + 1),
      postcode: 33444,
      city: "Stockholm",
      country: "Sverige",
      region: 0,
      unokod: firstName[0] + lastName[0] + "0721",
      personnr_lastnr: "1234",
    };
    users.push(user);
  }

  return true;
}
// mock data for users
export const userTest = [
  {
    user: {
      region: { id: 2, name: "Farsta" },
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
      flag: true,
    },
  },
];
