import axios from "axios";

import { axiosMockNoqApi } from "./mockApi/mockApi";
const API_BASE_URL = import.meta.env.NOQ_BASE_URL;

const axiosNoqApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

export default import.meta.env.NOQ_IS_MOCK_API === "true"
  ? axiosMockNoqApi
  : axiosNoqApi;

export const fetchAllUsers = async () => {
  try {
    const response = await axiosNoqApi.get("/api/caseworker/users");
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw new Error("Failed to fetch users");
  }
};

export const fetchUserById = async (userId) => {
  try {
    const respons = await axiosNoqApi.get(`/api/caseworker/user/${userId}`);
    return respons.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user by ID");
  }
};

// Function to create an item in the Backend
export const createUser = async (formData) => {
  try {
    const response = await axiosNoqApi.post(
      "/api/caseworker/register",
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw new Error("Failed to create item");
  }
};

// Function to update an item in the Backend
export const updateUser = async (user_id, formData) => {
  try {
    const response = await axiosNoqApi.put(
      `/api/caseworker/update/user/${user_id}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw new Error("Failed to update item");
  }
};

// Function to delete an item from the Backend
export const deleteUser = async (userId) => {
  try {
    const response = await axiosNoqApi.delete(
      `/api/caseworker/delete/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw new Error("Failed to delete item");
  }
};
