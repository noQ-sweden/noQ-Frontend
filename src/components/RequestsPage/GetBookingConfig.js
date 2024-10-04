export const GetBookingConfig = (userGroup) => {

    let bookingConfig = null;
        
    if (userGroup == "host") {
        bookingConfig = {
            fetchUrl: "/api/host/pending",
            assignUrl: (bookingId) => `/api/host/pending/${bookingId}/appoint`,
            batchAssignUrl:"/api/host/pending/batch/accept",
            rejectUrl: (bookingId) => `/api/host/pending/${bookingId}/decline`,
            undoUrl: (bookingId) => `/api/host/bookings/${bookingId}/setpending`,
            okButtonText: "Tilldela",
            nokButtonText: "Neka"
        };    
    } else if (userGroup == "caseworker") {
        bookingConfig = {
            fetchUrl: "/api/caseworker/bookings/pending",
            assignUrl: (bookingId) => `/api/caseworker/bookings/${bookingId}/accept`,
            batchAssignUrl:"/api/caseworker/bookings/batch/accept",
            rejectUrl: (bookingId) => `/api/caseworker/bookings/${bookingId}/decline`,
            undoUrl: (bookingId) => `/api/caseworker/bookings/${bookingId}/setpending`,
            okButtonText: "Tillråda",
            nokButtonText: "Avråda"
        };
    } else {
        console.log("Invalid userGroup for RequestPageView.");
    }
    return bookingConfig;
}