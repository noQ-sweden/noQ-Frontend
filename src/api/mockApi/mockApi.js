import axios from "axios";
import { bookings } from "./bookings";
import { generateAvailablePlaces } from "./hostFrontPage";
import { generateStays, generateStaysMultipleUsers } from "./userStays";
import { countBookings } from "./countBookings";
import AxiosMockAdapter from "axios-mock-adapter";
import { products } from "./products.js";
import {
  addUser,
  deleteUser,
  updateUser,
  getUsers,
  initUserList,
} from "./users.js";
import { getAvailableShelters } from "./getAvailableShelters"; // Import the function
import { availableProducts } from "./caseworkerFrontPage.js";
import { userTest } from "./users.js";

export const axiosMockNoqApi = axios.create({
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

const hostInfo = {
  region: {
    id: 5,

    name: "Övriga landet",
  },
  id: 1,
  name: "Bostället",
  street: "Skolgatan 0",
  postcode: "70362",
  city: "Örebro",
};

const noqMockApi = new AxiosMockAdapter(axiosMockNoqApi, {
  delayResponse: 0,
  onNoMatch: "throwException",
});

noqMockApi.onPost("api/login/").reply((config) => {
  const data = JSON.parse(config.data);
  const login = {
    login_status: true,

    message: "Login Successful",
    groups: ["user"],
    first_name: ["user"],
    last_name: "",
  };

  // User: user.user@test.nu
  if (
    data.email == "user.user@test.nu" &&
    data.password == "P4ssw0rd_for_Te5t+User"
  ) {
    login.first_name = "Hans";
    login.last_name = "User";
    return [200, JSON.stringify(login)];
  } else if (
    data.email == "lisa-gast@noq.nu" &&
    data.password == "P4ssw0rd_for_Te5t+User"
  ) {
    login.first_name = "Lisa";
    login.last_name = "Guest";
    return [200, JSON.stringify(login)];
  } else if (
    data.email == "tommy-gast@noq.nu" &&
    data.password == "P4ssw0rd_for_Te5t+User"
  ) {
    login.first_name == "Tommy";
    login.last_name == "Guest";
    return [200, JSON.stringify(login)];
  }
  // Host: user.host@test.nu
  else if (
    data.email == "user.host@test.nu" &&
    data.password == "P4ssw0rd_for_Te5t+User"
  ) {
    login.groups = ["host"];
    login.host = hostInfo;
    login.first_name = "User";
    login.last_name = "Host";
    return [200, JSON.stringify(login)];
  }
  // Caseworker: user.caseworker@test.nu
  else if (
    data.email == "user.caseworker@test.nu" &&
    data.password == "P4ssw0rd_for_Te5t+User"
  ) {
    login.groups = ["caseworker"];
    login.first_name = "User";
    login.last_name = "Caseworker";
    initUserList();
    return [200, JSON.stringify(login)];
  }
  // Volunteer: user.volunteer@test.nu
  else if (
    data.email == "user.volunteer@test.nu" &&
    data.password == "P4ssw0rd_for_Te5t+User"
  ) {
    login.groups = ["volunteer"];
    login.first_name = "User";
    login.last_name = "Volunteer";
    return [200, JSON.stringify(login)];
  }
  // Failed login
  else {
    login.login_status = false;
    login.message = "Login Failed";
    login.groups = null;
    login.first_name = null;
    login.last_name = null;
    return [200, JSON.stringify(login)];
  }
});

/*
    Below APIs are relate to booking. Booking has following possible statuses:
    pending, declined, accepted, checked_in
*/

const pendingBookingsUrl = "api/host/pending";

noqMockApi.onGet(pendingBookingsUrl).reply(() => {
  var pendingBookings = bookings.filter(function (booking) {
    return (
      booking.status.description === "pending" && booking.product.host.id === 3
    );
  });
  return [200, JSON.stringify(pendingBookings)];
});

noqMockApi.onPatch("api/host/pending/batch/accept").reply((config) => {
  const bookingIds = JSON.parse(config.data);

  for (const id of bookingIds) {
    const bookingId = id.booking_id;
    const idx = bookings.findIndex((obj) => obj.id === parseInt(bookingId));
    if (idx > -1) {
      bookings[idx].status.description = "accepted";
    }
  }

  return [200, JSON.stringify({ message: "Bulk update successful" })];
});

const urlAppoint = new RegExp(`${pendingBookingsUrl}/\\d+/appoint`);
noqMockApi.onPatch(urlAppoint).reply((config) => {
  const bookingId = config.url.substring(
    config.url.indexOf("g/") + 2,
    config.url.indexOf("/appoint")
  );

  const idx = bookings.findIndex((obj) => obj.id === parseInt(bookingId));
  if (idx > -1) {
    bookings[idx].status.description = "accepted";
    return [200, JSON.stringify(bookings[idx])];
  } else {
    return [200, []];
  }
});

let urlDecline = new RegExp(`${pendingBookingsUrl}/\\d+/decline`);
noqMockApi.onPatch(urlDecline).reply((config) => {
  const bookingId = config.url.substring(
    config.url.indexOf("g/") + 2,
    config.url.indexOf("/decline")
  );

  const idx = bookings.findIndex((obj) => obj.id === parseInt(bookingId));
  if (idx > -1) {
    bookings[idx].status.description = "declined";
    return [200, JSON.stringify(bookings[idx])];
  } else {
    return [200, []];
  }
});

const bookingsUrl = "api/host/bookings";
let urlPending = new RegExp(`${bookingsUrl}/\\d+/setpending`);
noqMockApi.onPatch(urlPending).reply((config) => {
  const bookingId = config.url.substring(
    config.url.indexOf("s/") + 2,
    config.url.indexOf("/setpending")
  );

  const idx = bookings.findIndex((obj) => obj.id === parseInt(bookingId));
  if (idx > -1) {
    bookings[idx].status.description = "pending";
    return [200, JSON.stringify(bookings[idx])];
  } else {
    return [200, []];
  }
});

noqMockApi.onGet(bookingsUrl).reply(() => {
  return [200, bookings];
});

const incomingBookingsUrl = "api/host/bookings/incoming";

noqMockApi.onGet(incomingBookingsUrl).reply(() => {
  var confirmedBookings = bookings.filter(function (booking) {
    return booking.status.description === "confirmed";
  });
  return [200, JSON.stringify(confirmedBookings)];
});

const urlCheckIn = new RegExp(`${bookingsUrl}/\\d+/checkin`);
noqMockApi.onPatch(urlCheckIn).reply((config) => {
  const bookingId = config.url.substring(
    config.url.indexOf("s/") + 2,
    config.url.indexOf("/checkin")
  );

  const idx = bookings.findIndex((obj) => obj.id === parseInt(bookingId));
  if (idx > -1) {
    bookings[idx].status.description = "checked_in";
    return [200, JSON.stringify(bookings[idx])];
  } else {
    return [200, []];
  }
});

const outgoingBookingsUrl = "api/host/bookings/outgoing";

// This handles fetching outgoing bookings that are checked in and leaving today
noqMockApi.onGet(outgoingBookingsUrl).reply(() => {
  var outgoingBookings = bookings.filter(function (booking) {
    return (
      booking.status.description === "checked_in" &&
      booking.end_date === new Date().toISOString().split("T")[0]
    );
  });
  return [200, JSON.stringify(outgoingBookings)];
});

// Regular expression for the checkout URL
const urlCheckOut = new RegExp(`${bookingsUrl}/\\d+/checkout`);

// This handles the patch request for checking out a booking
noqMockApi.onPatch(urlCheckOut).reply((config) => {
  const bookingId = config.url.substring(
    config.url.indexOf("s/") + 2,
    config.url.indexOf("/checkout")
  );

  const idx = bookings.findIndex((obj) => obj.id === parseInt(bookingId));
  if (idx > -1) {
    bookings[idx].status.description = "completed"; // Updating status to 'completed'
    return [200, JSON.stringify(bookings[idx])];
  } else {
    return [200, []]; // If no booking found, return an empty array
  }
});

/*
    Booking actions for Caseworker
*/
const caseworkerBookingUrl = "api/caseworker/bookings";

noqMockApi.onGet(caseworkerBookingUrl + "/pending").reply(() => {
  var pendingBookings = bookings.filter(function (booking) {
    return booking.status.description === "pending";
  });
  return [200, JSON.stringify(pendingBookings)];
});

let urlAccept = new RegExp(`${caseworkerBookingUrl}/\\d+/accept`);
noqMockApi.onPatch(urlAccept).reply((config) => {
  const bookingId = config.url.substring(
    config.url.indexOf("s/") + 2,
    config.url.indexOf("/accept")
  );

  const idx = bookings.findIndex((obj) => obj.id === parseInt(bookingId));
  if (idx > -1) {
    bookings[idx].status.description = "accepted";
    return [200, JSON.stringify(bookings[idx])];
  } else {
    return [200, []];
  }
});

urlDecline = new RegExp(`${caseworkerBookingUrl}/\\d+/decline`);
noqMockApi.onPatch(urlDecline).reply((config) => {
  const bookingId = config.url.substring(
    config.url.indexOf("s/") + 2,
    config.url.indexOf("/decline")
  );

  const idx = bookings.findIndex((obj) => obj.id === parseInt(bookingId));
  if (idx > -1) {
    bookings[idx].status.description = "declined";
    return [200, JSON.stringify(bookings[idx])];
  } else {
    return [200, []];
  }
});

urlPending = new RegExp(`${caseworkerBookingUrl}/\\d+/setpending`);
noqMockApi.onPatch(urlPending).reply((config) => {
  const bookingId = config.url.substring(
    config.url.indexOf("s/") + 2,
    config.url.indexOf("/setpending")
  );

  const idx = bookings.findIndex((obj) => obj.id === parseInt(bookingId));
  if (idx > -1) {
    bookings[idx].status.description = "pending";
    return [200, JSON.stringify(bookings[idx])];
  } else {
    return [200, []];
  }
});

noqMockApi.onPatch("api/caseworker/bookings/batch/accept").reply((config) => {
  const bookingIds = JSON.parse(config.data);

  for (const id of bookingIds) {
    const bookingId = id.booking_id;
    const idx = bookings.findIndex((obj) => obj.id === parseInt(bookingId));
    if (idx > -1) {
      bookings[idx].status.description = "accepted";
    }
  }

  return [200, JSON.stringify({ message: "Bulk update successful" })];
});

const caseworkerStatisticsUrl = "api/caseworker/guests/nights/count";
const urlUserStatistics = new RegExp(
  `^${caseworkerStatisticsUrl}/\\d+/\\d{4}-\\d{2}-\\d{2}/\\d{4}-\\d{2}-\\d{2}$`
);
noqMockApi.onGet(urlUserStatistics).reply((config) => {
  const params = config.url.split("/");
  const stays = generateStays(params[5], params[6], params[7]);

  return [200, JSON.stringify(stays)]; //userId, startDate, endDate
});

const urlStatistics = new RegExp(
  `${caseworkerStatisticsUrl}/\\d{4}-\\d{2}-\\d{2}/\\d{4}-\\d{2}-\\d{2}`
);
noqMockApi.onGet(urlStatistics).reply((config) => {
  const params = config.url.split("/");
  const stays = generateStaysMultipleUsers(params[5], params[6]);

  return [200, JSON.stringify(stays)];
});

/*
    Below APIs are relate to host information
*/
noqMockApi.onGet("api/host").reply(() => {
  return [200, JSON.stringify(hostInfo)];
});

// mock for rooms/products
// const productsUrl = /\/hosts\/\d+\/products/;

noqMockApi.onGet("api/host/products").reply(200, products);
//api/host/hosts/1/products
const hostProductsUrl = /api\/host\/hosts\/(\d+)\/products/;
noqMockApi.onGet(hostProductsUrl).reply((config) => {
  const hostId = parseInt(
    config.url.match(/api\/host\/hosts\/(\d+)\/products/)[1]
  );
  const productList = products.filter((p) => p.host.id === hostId);
  return productList ? [200, productList] : [404];
});

const productUrl = /api\/host\/products\/(\d+)/;
noqMockApi.onGet(productUrl).reply((config) => {
  const productId = parseInt(config.url.match(/api\/host\/products\/(\d+)/)[1]);
  const product = products.find((p) => p.id === productId);
  return product ? [200, product] : [404];
});

noqMockApi.onPost("api/host/products").reply((config) => {
  let newProduct = JSON.parse(config.data);
  products.push(newProduct);
  return [200, newProduct];
});

noqMockApi.onPut(productUrl).reply((config) => {
  const productId = parseInt(config.url.match(/api\/host\/products\/(\d+)/)[1]);
  const updatedProduct = JSON.parse(config.data);
  const index = products.findIndex((product) => product.id === productId);
  if (index !== -1) {
    products[index] = updatedProduct;
    return [200, updatedProduct];
  }
  return [404];
});

noqMockApi.onDelete(productUrl).reply((config) => {
  const productId = parseInt(config.url.match(/api\/host\/products\/(\d+)/)[1]);
  const index = products.findIndex((product) => product.id === productId);
  if (index !== -1) {
    products.splice(index, 1);
    return [200];
  }
  return [404];
});

noqMockApi.onGet("api/host/count_bookings").reply(() => {
  console.log("mockApi called");
  return [200, countBookings];
});

const availableUrl = "api/host/available";
const urlAvailablePerDay = new RegExp(`${availableUrl}/\\d+`);
noqMockApi.onGet(urlAvailablePerDay).reply((config) => {
  const nr_of_days = config.url.substring(config.url.indexOf("e/") + 2);
  const available = generateAvailablePlaces(parseInt(nr_of_days));
  return [200, JSON.stringify(available)];
});

//Diako added this
const availableSheltersUrl = "/api/user/available";
const urlAvailableSheltersPerDay = new RegExp(
  `${availableSheltersUrl}/[\\d-]+`
);

noqMockApi.onGet(urlAvailableSheltersPerDay).reply(() => {
  const availableShelters = getAvailableShelters(); // Call the function to get available shelters
  return [200, JSON.stringify(availableShelters)]; // Return the generated data
});

noqMockApi.onPost("/api/user/request_booking").reply((config) => {
  let bookingData = JSON.parse(config.data);
  console.log(bookingData);

  return [200, "Hello!"];
});

noqMockApi.onGet("/api/caseworker/available_all").reply(() => {
  return [200, JSON.stringify(availableProducts)];
});

noqMockApi.onGet("/api/volunteer/available").reply((config) => {
  const { selected_date, host_id } = config.params || {};

  // Fetch the full list of available shelters with products
  let availableShelters = getAvailableShelters();

  // Filter by host_id if provided
  if (host_id) {
    availableShelters = availableShelters.filter(
      (shelter) => shelter.host.id === parseInt(host_id)
    );
  }

  // Filter by selected_date if provided
  if (selected_date) {
    availableShelters = availableShelters
      .map((shelter) => ({
        ...shelter,
        products: shelter.products
          .map((product) => {
            // Set `places_left` based on mock availability for the date
            // Assuming each product has a `dates` array with availability records
            const availability = product.availability?.find(
              (avail) => avail.date === selected_date
            );
            return {
              ...product,
              places_left: availability
                ? availability.places_left
                : product.total_places,
            };
          })
          .filter((product) => product.places_left > 0), // Exclude fully booked products for the date
      }))
      .filter((shelter) => shelter.products.length > 0); // Exclude hosts with no available products
  }

  return [200, availableShelters];
});

noqMockApi.onGet("/api/volunteer/guest/search").reply((config) => {
  const { first_name = "", last_name = "" } = config.params || {};

  // Check if both first_name and last_name are empty
  if (!first_name.trim() && !last_name.trim()) {
    return [
      400,
      {
        error:
          "Either first name or last name must be provided for the search.",
      },
    ];
  }

  // Filter users by first and last name, case-insensitive, and map to only return the id
  const matchingUsers = userTest
    .filter(
      (userObj) =>
        userObj.user.first_name
          .toLowerCase()
          .includes(first_name.toLowerCase()) &&
        userObj.user.last_name.toLowerCase().includes(last_name.toLowerCase())
    )
    .map((userObj) => ({ id: userObj.user.id })); // Access id inside the user object

  if (matchingUsers.length === 0) {
    return [404, { error: "No matching guest found" }];
  }

  return [200, matchingUsers];
});

const Guestbookings = [];

noqMockApi.onPost("/api/volunteer/request_booking").reply((config) => {
  const newBooking = JSON.parse(config.data);

  // Check for duplicate bookings
  const duplicate = Guestbookings.find(
    (b) =>
      b.product_id === newBooking.product_id &&
      b.user_id === newBooking.user_id &&
      b.start_date === newBooking.start_date &&
      b.end_date === newBooking.end_date
  );
  if (duplicate) {
    return [409, { error: "A booking with these details already exists." }];
  }

  newBooking.id = Guestbookings.length + 1;
  newBooking.status = { description: "pending" };

  Guestbookings.push(newBooking);

  console.log("New Booking Created:", newBooking);

  return [200, newBooking];
});

noqMockApi.onPatch(/\/api\/volunteer\/confirm_booking\/\d+/).reply((config) => {
  const bookingId = parseInt(config.url.match(/confirm_booking\/(\d+)/)[1]);

  // Find the booking in mock data
  const bookingIndex = Guestbookings.findIndex((b) => b.id === bookingId);
  console.log("Booking ID to Confirm:", bookingId);

  if (bookingIndex !== -1) {
    const booking = Guestbookings[bookingIndex];

    // Only allow confirmation if booking is "pending"
    if (booking.status.description !== "pending") {
      return [400, { error: "Only pending bookings can be confirmed." }];
    }

    booking.status = { description: "confirmed" };

    // Simulate sending a confirmation email if the user email exists
    if (booking.user && booking.user.email) {
      console.log(`Confirmation email sent to ${booking.user.email}`);
    } else {
      console.log("No email available for the user.");
    }

    return [200, booking];
  } else {
    return [404, { error: "Booking not found" }];
  }
});

/*
  Caseworker user management
*/
noqMockApi.onGet("api/caseworker/user/all").reply(() => {
  return [200, JSON.stringify(getUsers())];
});

const caseworkerUserUrl = "api/caseworker/user";
const urlCaseworkerUserId = new RegExp(`${caseworkerUserUrl}/\\d+`);
noqMockApi.onGet(urlCaseworkerUserId).reply(() => {
  return [200, "TBD"];
});

noqMockApi.onPost("/api/caseworker/user").reply((config) => {
  let userData = JSON.parse(config.data);
  addUser(userData);
  return [200, "{}"];
});

noqMockApi.onPut(urlCaseworkerUserId).reply((config) => {
  const userData = JSON.parse(config.data);
  const updatedUserData = updateUser(userData);
  return [200, JSON.stringify(updatedUserData)];
});

noqMockApi.onDelete(urlCaseworkerUserId).reply((config) => {
  const userId = parseInt(config.url.match(/api\/host\/products\/(\d+)/)[1]);
  if (deleteUser(userId)) {
    return [200];
  }
  return [404]; //not found
});
