import axios from "axios";

const client = axios.create({
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

export const activeRequestsHandler = async () => {
  return await client.get("http://localhost:8000/api/host/activerequests");
};

export const arrivalsHandler = async () => {
  return await client.get("http://localhost:8000/api/host/arrivals");
};

export const departuresHandler = async () => {
  return await client.get("http://localhost:8000/api/host/departures");
};

export const currentGuestsHandler = async () => {
  return await client.get("http://localhost:8000/api/host/currentguests");
};

export const availableProductsHandler = async () => {
  return await client.get("http://localhost:8000/api/host/availableproducts");
};
