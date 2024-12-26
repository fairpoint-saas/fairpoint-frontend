import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("authToken");

const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: `${VITE_API_URL}/api`,
  headers: { Authorization: `Bearer ${token}` }
  
  // withCredentials: true // => you might need this option if using cookies and sessions
});

export const getProductById = (id) =>
  axios
    .get(`${VITE_API_URL}/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));

export const addCostToProduct = (productId, costData) =>
  axios
    .post(`${VITE_API_URL}/api/products/${productId}/costs`, costData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));

export const deleteCostFromProduct = (productId, costId) =>
  axios
    .delete(`${VITE_API_URL}/api/products/${productId}/costs/${costId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));

export const updateCostInProduct = (productId, costId, costData) =>
  axios
    .put(`${VITE_API_URL}/api/products/${productId}/costs/${costId}`, costData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));

export const deleteProductById = (id) =>
  axios
    .delete(`${VITE_API_URL}/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));

export const getProducts = () =>
  axios
    .get(`${VITE_API_URL}/api/products`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));

export const uploadImage = file => {
  if (!file) {
    throw new Error("No file provided");
  }
  return api
    .post('/upload', file)
    .then(res => res.data)
    .catch((error) => console.error(error));
};

export const getProductsWithUnitCostId = (id) =>
  axios
    .get(`${VITE_API_URL}/api/products/cost/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));

export const updateProduct = (id, updates) =>
  axios
    .put(`${VITE_API_URL}/api/products/${id}`, updates, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));



