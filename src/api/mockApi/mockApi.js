import axios from 'axios';
import { bookings } from './bookings'
import { generateAvailablePlaces } from './hostFrontPage'
import { countBookings } from './countBookings'
import AxiosMockAdapter from 'axios-mock-adapter';
import {products} from "./products.js";

export const axiosMockNoqApi = axios.create({
  headers: {
      "Content-type": "application/json",
    },
  withCredentials: true,
});

const hostInfo =
{
    region: {
      id: 5,
      name: "Övriga landet"
    },
    id: 1,
    name: "Bostället",
    street: "Skolgatan 0",
    postcode: "70362",
    city: "Örebro"
}

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
        login.host = hostInfo;
        return [200, JSON.stringify(login)];
    } else if (data.email == 'user.caseworker@test.nu' && data.password == 'P4ssw0rd_for_Te5t+User') {
        login.groups = ["caseworker"];
        return [200, JSON.stringify(login)];
    } else {
        login.login_status = false;
        login.message = "Login Failed";
        login.groups = null;
        login.host = null;
        return [200, JSON.stringify(login)];
    }
});



/*
    Below APIs are relate to booking. Booking has following possible statuses:
    pending, declined, accepted, checked_in
*/


const pendingBookingsUrl = "api/host/pending";

noqMockApi.onGet(pendingBookingsUrl).reply(() => {
    var pendingBookings = bookings.filter( function (booking) {
        return booking.status.description === 'pending' && booking.product.host.id === 3;
    });
    return [200, JSON.stringify(pendingBookings)];
});

noqMockApi.onPatch("api/host/pending/batch/accept").reply((config) => {
    const bookingIds = JSON.parse(config.data);

    for (const id of bookingIds) {
        const bookingId = id.booking_id;
        const idx = bookings.findIndex(obj => obj.id === parseInt(bookingId));
        if (idx > -1) {
            bookings[idx].status.description = "accepted";
        }
    }

    return [200, JSON.stringify({'message': 'Bulk update successful'})];
});

const urlAppoint = new RegExp(`${pendingBookingsUrl}/\\d+/appoint`);
noqMockApi.onPatch(urlAppoint).reply((config) => {
    const bookingId = config.url.substring(
        config.url.indexOf("g/") + 2,
        config.url.indexOf("/appoint")
    );

    const idx = bookings.findIndex(obj => obj.id === parseInt(bookingId));
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

    const idx = bookings.findIndex(obj => obj.id === parseInt(bookingId));
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

    const idx = bookings.findIndex(obj => obj.id === parseInt(bookingId));
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

    var confirmedBookings = bookings.filter( function (booking) {
        return booking.status.description === 'confirmed';
    });
    return [200, JSON.stringify(confirmedBookings)];
});


const urlCheckIn = new RegExp(`${bookingsUrl}/\\d+/checkin`);
noqMockApi.onPatch(urlCheckIn).reply((config) => {
    const bookingId = config.url.substring(
        config.url.indexOf("s/") + 2,
        config.url.indexOf("/checkin")
    );

    const idx = bookings.findIndex(obj => obj.id === parseInt(bookingId));
    if (idx > -1) {
        bookings[idx].status.description = "checked_in";
        return [200, JSON.stringify(bookings[idx])];
    } else {
        return [200, []];
    }
});

const outgoingBookingsUrl = "api/host/bookings/outgoing";

// This handles fetching outgoing bookings that are confirmed
noqMockApi.onGet(outgoingBookingsUrl).reply(() => {
    var confirmedBookings = bookings.filter( function (booking) {
        return booking.status.description === 'confirmed';
    });
    return [200, JSON.stringify(confirmedBookings)];
});

// Regular expression for the checkout URL
const urlCheckOut = new RegExp(`${bookingsUrl}/\\d+/checkout`);

// This handles the patch request for checking out a booking
noqMockApi.onPatch(urlCheckOut).reply((config) => {
    const bookingId = config.url.substring(
        config.url.indexOf("s/") + 2,
        config.url.indexOf("/checkout")
    );

    const idx = bookings.findIndex(obj => obj.id === parseInt(bookingId));
    if (idx > -1) {
        bookings[idx].status.description = "checked_out"; // Updating status to 'checked_out'
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
    var pendingBookings = bookings.filter( function (booking) {
        return booking.status.description === 'pending';
    });
    return [200, JSON.stringify(pendingBookings)];
});

const urlAccept = new RegExp(`${caseworkerBookingUrl}/\\d+/accept`);
noqMockApi.onPatch(urlAccept).reply((config) => {
    const bookingId = config.url.substring(
        config.url.indexOf("s/") + 2,
        config.url.indexOf("/accept")
    );

    const idx = bookings.findIndex(obj => obj.id === parseInt(bookingId));
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

    const idx = bookings.findIndex(obj => obj.id === parseInt(bookingId));
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

    const idx = bookings.findIndex(obj => obj.id === parseInt(bookingId));
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
        const idx = bookings.findIndex(obj => obj.id === parseInt(bookingId));
        if (idx > -1) {
            bookings[idx].status.description = "accepted";
        }
    }

    return [200, JSON.stringify({'message': 'Bulk update successful'})];
});

/*
    Below APIs are relate to host information
*/
noqMockApi.onGet('api/host').reply(() => {
    return [200, JSON.stringify(hostInfo)];
});

// mock for rooms/products
// const productsUrl = /\/hosts\/\d+\/products/;

noqMockApi.onGet('api/host/products').reply(200, products);
//api/host/hosts/1/products
const hostProductsUrl = /api\/host\/hosts\/(\d+)\/products/;
noqMockApi.onGet(hostProductsUrl).reply((config) => {
    const hostId = parseInt(config.url.match(/api\/host\/hosts\/(\d+)\/products/)[1]);
    const productList = products.filter(p => p.host.id === hostId);
    return productList ? [200, productList] : [404];
});

const productUrl = /api\/host\/products\/(\d+)/;
noqMockApi.onGet(productUrl).reply((config) => {
    const productId = parseInt(config.url.match(/api\/host\/products\/(\d+)/)[1]);
    const product = products.find(p => p.id === productId);
    return product ? [200, product] : [404];
});

noqMockApi.onPost('api/host/products').reply((config) => {
    let newProduct  = JSON.parse(config.data);
    products.push(newProduct);
    return [200, newProduct];
});

noqMockApi.onPut(productUrl).reply((config) => {
    const productId = parseInt(config.url.match(/api\/host\/products\/(\d+)/)[1]);
    const updatedProduct = JSON.parse(config.data);
    const index = products.findIndex(product => product.id === productId);
    if (index !== -1) {
        products[index] = updatedProduct;
        return [200, updatedProduct];
    }
    return [404];
});

noqMockApi.onDelete(productUrl).reply((config) => {
    const productId = parseInt(config.url.match(/api\/host\/products\/(\d+)/)[1]);
    const index = products.findIndex(product => product.id === productId);
    if (index !== -1) {
        products.splice(index, 1);
        return [200];
    }
    return [404];
});

noqMockApi.onGet("api/host/count_bookings").reply(() =>  {
    console.log("mockApi called")
    return [200, countBookings];
});

const availableUrl = "api/host/available";
const urlAvailablePerDay = new RegExp(`${availableUrl}/\\d+`);
noqMockApi.onGet(urlAvailablePerDay).reply((config) => {
    const nr_of_days = config.url.substring(
        config.url.indexOf("e/") + 2
    );
    const available = generateAvailablePlaces(parseInt(nr_of_days))
    return [200, JSON.stringify(available)];
});

noqMockApi.onGet("api/caseworker").reply(() => {
    return [200, "Caseworker frontpage data comes here..."];
});
