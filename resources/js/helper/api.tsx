import axios from "axios";
import { Category } from "../types";

const API_URL = "http://127.0.0.1:8000/api/categories"; // Make sure this matches your Laravel API endpoint

// Set the default axios config for CORS
axios.defaults.withCredentials = true; // Include credentials (cookies) if using Sanctum or any authentication
axios.defaults.baseURL = API_URL; // Set base URL for convenience

// Fetch categories
export const getCategories = async () => axios.get<Category[]>(API_URL);

// Add category
export const addCategory = async (category: Omit<Category, "id">) => axios.post<Category>(API_URL, category);

// Update category
export const updateCategory = async (id: number, category: Omit<Category, "id">) =>
  axios.put<Category>(`${API_URL}/${id}`, category);

// Delete category
export const deleteCategory = async (id: number) => axios.delete(`${API_URL}/${id}`);
