export const volunteers = [
  {
    id: 1,
    name: "Alice Andersson",
    email: "alice@volunteer.com",
    status: "Tillgänglig",
    tasks_assigned: 2,
    tasks: [
      {
        id: 101,
        activity_title: "Laga mat",
        description: "Hjälp till att laga lunch",
        start_time: "2025-05-01T10:00:00Z",
        end_time: "2025-05-01T13:00:00Z",
        status: "tilldelad",
      },
      {
        id: 102,
        activity_title: "Städa rum",
        description: "Rengör gästrum efter besök",
        start_time: "2025-05-02T09:00:00Z",
        end_time: "2025-05-02T11:00:00Z",
        status: "otilldelad",
      },
    ],
  },
  {
    id: 2,
    name: "Björn Berg",
    email: "bjorn@volunteer.com",
    status: "Upptagen",
    tasks_assigned: 0,
  },
  {
    id: 3,
    name: "Carla Carlsson",
    email: "carla@volunteer.com",
    status: "Tillgänglig",
    tasks_assigned: 1,
    tasks: [
      {
        id: 103,
        activity_title: "Dela ut flygblad",
        description: "Sprid information om event",
        start_time: "2025-05-04T10:00:00Z",
        end_time: "2025-05-04T12:00:00Z",
        status: "tilldelad",
      },
    ],
  },
];
