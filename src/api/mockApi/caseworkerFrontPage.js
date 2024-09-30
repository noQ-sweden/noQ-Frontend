// Define the hosts for the caseworker
export const caseworkerHosts = [
    {
      id: 11,
      name: "Bostället",
      street: "Storvägen 59",
      postcode: "",
      city: "Malmö",
      region: {
        id: 9,
        name: "Skåne"
      },
      caseworkers: [56],
    },
    {
      id: 17,
      name: "Ny gemenskap",
      street: "Skolvägen 358",
      postcode: "",
      city: "Lund",
      region: {
        id: 9,
        name: "Skåne"
      },
      caseworkers: [56],
    },
    {
      id: 20,
      name: "Grimmans Akutboende",
      street: "Skolgatan 4",
      postcode: "",
      city: "Lund",
      region: {
        id: 9,
        name: "Skåne"
      },
      caseworkers: [56],
    },
  ];
  
  // Define the available products for the caseworker
  export const availableProducts = [
    {
      id: 101,
      name: "room",
      description: "4-bäddsrum",
      total_places: 4,
      host: caseworkerHosts[0],  // Bostället
      type: "room",
      places_left: 3,
    },
    {
      id: 102,
      name: "woman-only",
      description: "4-bäddsrum för kvinnor",
      total_places: 4,
      host: caseworkerHosts[0],  // Bostället
      type: "woman-only",
      places_left: 3,
    },
    {
      id: 113,
      name: "room",
      description: "6-bäddsrum",
      total_places: 6,
      host: caseworkerHosts[1],  // Ny gemenskap
      type: "room",
      places_left: 4,
    },
    {
      id: 114,
      name: "woman-only",
      description: "6-bäddsrum för kvinnor",
      total_places: 6,
      host: caseworkerHosts[1],  // Ny gemenskap
      type: "woman-only",
      places_left: 6,
    },
    {
      id: 119,
      name: "room",
      description: "2-bäddsrum",
      total_places: 2,
      host: caseworkerHosts[2],  // Grimmans Akutboende
      type: "room",
      places_left: 1,
    },
    {
      id: 120,
      name: "woman-only",
      description: "2-bäddsrum för kvinnor",
      total_places: 2,
      host: caseworkerHosts[2],  // Grimmans Akutboende
      type: "woman-only",
      places_left: 1,
    },
  ];
  