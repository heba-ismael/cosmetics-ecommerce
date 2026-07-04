// Single point for all API requests in the project
// Any change to the base URL or error handling happens here only

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://dummyjson.com";

/**
 * Base function that wraps fetch and handles errors consistently
 */
async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  const data = await res.json();
  if (data?.message) {
    // dummyjson returns { message: "..." } when something goes wrong (e.g. product not found)
    throw new Error(data.message);
  }
  return data;
}

export function getProductsByCategory(category, limit) {
  const query = limit ? `?limit=${limit}` : "";
  return request(`/products/category/${category}${query}`);
}

export function getProductById(id) {
  return request(`/products/${id}`);
}

export function getAllCategories() {
  return request(`/products/categories`);
}

export function searchProducts(query) {
  return request(`/products/search?q=${encodeURIComponent(query)}`);
}

export async function loginUser(username, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, expiresInMins: 60 }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Invalid username or password");
  }
  return data;
}

// dummyjson has no real registration system that persists new users, so this
// endpoint is a demo - it returns a realistic-looking user but doesn't actually
// save it, and you can't log in with it afterwards
export async function registerUser(userData) {
  const res = await fetch(`${BASE_URL}/users/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    throw new Error("Something went wrong while creating your account");
  }
  return res.json();
}
