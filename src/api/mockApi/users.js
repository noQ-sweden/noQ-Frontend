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
  // console.log("attemting to update user with ID:", userData.id);
  const userIndex = users.findIndex((user) => user.id === userData.id);

  if (userIndex === -1) {
    console.error("Error updating user not found with ID:", userData.id);
    return null;
  }

  const allowedFields = [
    "email",
    "password",
    "first_name",
    "last_name",
    "phone",
    "gender",
    "street",
    "postcode",
    "city",
    "country",
    "region",
    "unokod",
    "personnr_lastnr",
    "requirements",
  ];

  const validatedData = Object.keys(userData)
    .filter((key) => allowedFields.includes(key))
    .reduce((obj, key) => {
      obj[key] = userData[key];
      return obj;
    }, {});

  users[userIndex] = { ...users[userIndex], ...validatedData };

  // console.log("Updated user with ID:", users[userIndex].id);
  return users[userIndex];
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
      requirements: "",
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
