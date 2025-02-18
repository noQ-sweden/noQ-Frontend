import axios from "axios";
import { bookings, userBookings, generateBookings } from "./bookings";
import { generateAvailablePlaces } from "./hostFrontPage";
import { generateStays, generateStaysMultipleUsers } from "./userStays";
import { countBookings } from "./countBookings";
import AxiosMockAdapter from "axios-mock-adapter";
import { products } from "./products.js";
import { getAvailableShelters } from "./getAvailableShelters"; // Import the function
import { availableProducts } from "./caseworkerFrontPage.js";


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
const urlUserStatistics = new RegExp(`^${caseworkerStatisticsUrl}/\\d+/\\d{4}-\\d{2}-\\d{2}/\\d{4}-\\d{2}-\\d{2}$`);
noqMockApi.onGet(urlUserStatistics).reply((config) => {
  const params = config.url.split("/");
  const stays = generateStays(params[5], params[6], params[7]);

  return [200, JSON.stringify(stays)]; //userId, startDate, endDate
});

const urlStatistics = new RegExp(`${caseworkerStatisticsUrl}/\\d{4}-\\d{2}-\\d{2}/\\d{4}-\\d{2}-\\d{2}`);
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
  //bookings.push(newBooking);
  /*
  Return data:
  {
  "id": 0,
  "status": {
    "description": "string"
  },
  "start_date": "2024-09-24",
  "end_date": "2024-09-24",
  "product": {
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
    "type": "string"
  },
  "user": {
    "region": {
      "id": 0,
      "name": "string"
    },
    "id": 0,
    "user": 0,
    "first_name": "string",
    "last_name": "string",
    "gender": "s",
    "street": "",
    "postcode": "",
    "city": "",
    "country": "",
    "phone": "string",
    "email": "string",
    "unokod": "string",
    "day_of_birth": "2024-09-24",
    "personnr_lastnr": "",
    "requirements": 0,
    "last_edit": "2024-09-24"
  }
}
  */
  return [200, "Hello!"];
});

noqMockApi.onGet("api/user/bookings").reply(() => {
  generateBookings();
  return [200, JSON.stringify(userBookings)]; // Return the generated data
});

const userBookingUrl = "api/user/bookings";
const urlBookingDelete = new RegExp(`${userBookingUrl}/\\d+`);
noqMockApi.onDelete(urlBookingDelete).reply((config) => {
  const bookingId = parseInt(config.url.match(/api\/user\/bookings\/(\d+)/)[1]);
  const index = userBookings.findIndex((booking) => booking.id === bookingId);
  if (index !== -1) {
    bookings.splice(index, 1);
    return [200];
  }
  return [404];
});

const userConfirmUrl = "api/user/bookings/confirm";
const urlBookingConfirm = new RegExp(`${userConfirmUrl}/\\d+`);
noqMockApi.onGet(urlBookingConfirm).reply((config) => {
  const bookingId = parseInt(config.url.match(/api\/user\/bookings\/confirm\/(\d+)/)[1]);
  const index = userBookings.findIndex((booking) => booking.id === bookingId);
  if (index !== -1) {
    userBookings[index].status.description = "confirmed";
    return [200, JSON.stringify(userBookings)];
  }
  return [404];
});

noqMockApi.onGet("/api/caseworker/available_all").reply(() => {
  return [200, JSON.stringify(availableProducts)];
});

noqMockApi.onGet("/api/volunteer/available").reply(config => {
  const { selected_date, host_id } = config.params || {}

  // Fetch the full list of available shelters with products
  let availableShelters = getAvailableShelters()

  // Filter by host_id if provided
  if (host_id) {
    availableShelters = availableShelters.filter(shelter => shelter.host.id === parseInt(host_id))
  }

  // Filter by selected_date if provided
  if (selected_date) {
    availableShelters = availableShelters.map(shelter => ({
      ...shelter,
      products: shelter.products.map(product => {
        // Set `places_left` based on mock availability for the date
        // Assuming each product has a `dates` array with availability records
        const availability = product.availability?.find(avail => avail.date === selected_date)
        return {
          ...product,
          places_left: availability ? availability.places_left : product.total_places
        }
      }).filter(product => product.places_left > 0) // Exclude fully booked products for the date
    })).filter(shelter => shelter.products.length > 0) // Exclude hosts with no available products
  }

  return [200, availableShelters]
});

// Volunteer 
const mockUser = [
  { user: { id: 1, unokod: "UNO123", first_name: "Lars", last_name: "Andersson" } },
  { user: { id: 2, unokod: "UNO456", first_name: "Karin", last_name: "Johansson" } },
  { user: { id: 3, unokod: "UNO789", first_name: "Erik", last_name: "Nilsson" } },
];

 let mockTest =[...mockUser];
noqMockApi.onGet("/api/volunteer/guest/search").reply((config) => {
  const { first_name = "", last_name = "", uno = "" } = config.params || {};
  
  console.log("Search parameters:", { first_name, last_name, uno });

  // Check if at least one search parameter is provided
  if (!first_name.trim() && !last_name.trim() && !uno.trim()) {
    return [400, { error: "At least one search parameter (name or uno) must be provided." }];
  }

  const matchingUsers = mockTest
    .filter(userObj => {
      const matchesFirstName = first_name ? userObj.user.first_name.toLowerCase() === first_name.toLowerCase() : true;
      const matchesLastName = last_name ? userObj.user.last_name.toLowerCase() === last_name.toLowerCase() : true;
      const matchesUno = uno ? userObj.user.uno.toLowerCase() === uno.toLowerCase() : true;
    
      return matchesFirstName && matchesLastName && matchesUno;
    })
    .map(userObj => ({
      id: userObj.user.id,
      uno: userObj.user.uno,
      first_name: userObj.user.first_name,
      last_name: userObj.user.last_name,
    }));

  if (matchingUsers.length === 0) {
    return [404, { error: "No matching guest found" }];
  }

  return [200, matchingUsers];
});


const Guestbookings = [];

export const fetchUsers = () => {
  return mockUser; 
};


noqMockApi.onGet("/api/volunteer/guest/list").reply(() => {
  const users = mockTest.map((userObj) => ({
    id: userObj.user.id,
    uno: userObj.user.uno,
    first_name: userObj.user.first_name,
    last_name: userObj.user.last_name,
  }));

  return [200, users];
});

noqMockApi.onPost("/api/volunteer/guest/create").reply((config) => {
  const { first_name, last_name, uno } = JSON.parse(config.data);

 
  if (!first_name || !last_name || !uno) {
    return [400, { error: "All fields (first_name, last_name, uno) are required." }];
  }

 
  const existingUser = mockTest.find((userObj) => userObj.user.uno === uno);
  if (existingUser) {
    return [409, { error: "A user with this UNO code already exists." }];
  }


  const newUser = {
    user: {
      id: mockTest.length + 1,
      uno,
      first_name,
      last_name,
    },
  };
  mockTest.push(newUser);

  console.log("New User Created:", newUser);

  return [201, newUser.user];
});

noqMockApi.onPost("/api/volunteer/booking/request").reply((config) => {
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
  //newBooking.uno = newBooking.uno;

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

noqMockApi.onGet(/api\/user\/available_host\/\d+/).reply((config) => {
  const hostId = parseInt(config.url.match(/api\/user\/available_host\/(\d+)/)[1]);

  // all available 
  const availableShelters = getAvailableShelters();

  // Find the requested host by ID
  const hostData = availableShelters.find(shelter => shelter.host.id === hostId);

  if (!hostData) {
    return [404, { error: "Host not found" }];
  }

  // match backend API structure
  const response = [{
    host: hostData.host,  
    products: hostData.products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      total_places: product.total_places,
      type: product.type,
      available_dates: product.available_dates || [] 
    }))
  }];

  return [200, response];
});
