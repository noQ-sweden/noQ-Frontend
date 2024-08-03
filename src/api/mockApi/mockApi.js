import axios from 'axios';
import { bookings } from './bookings'
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


/*
    Below APIs are relate to booking. Booking has following possible statuses:
    pending, declined, accepted, checked_in
*/
const pendingBookingsUrl = "api/host/pending";

noqMockApi.onGet(pendingBookingsUrl).reply(() => {
    var pendingBookings = bookings.filter( function (booking) {
        return booking.status.description === 'pending';
    });
    return [200, JSON.stringify(pendingBookings)];
});


const urlAppoint = new RegExp(`${pendingBookingsUrl}/\\d+/appoint`);
noqMockApi.onPatch(urlAppoint).reply((config) => {
    const bookingId = config.url.substring(
        config.url.indexOf("g/") + 2,
        config.url.indexOf("/a")
    );

    const idx = bookings.findIndex(obj => obj.id === parseInt(bookingId));
    if (idx > -1) {
        bookings[idx].status.description = "accepted";
        return [200, JSON.stringify(bookings[idx])];
    } else {
        return [200, []];
    }
});

const urlDecline = new RegExp(`${pendingBookingsUrl}/\\d+/decline`);
noqMockApi.onPatch(urlDecline).reply((config) => {
    const bookingId = config.url.substring(
        config.url.indexOf("g/") + 2,
        config.url.indexOf("/d")
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
const urlPending = new RegExp(`${bookingsUrl}/\\d+/setpending`);
noqMockApi.onPatch(urlPending).reply((config) => {
    const bookingId = config.url.substring(
        config.url.indexOf("s/") + 2,
        config.url.indexOf("/s")
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

/*
    Below APIs are relate to host information
*/
noqMockApi.onGet('api/host').reply(() => {
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
    return [200, JSON.stringify(hostInfo)];
});
