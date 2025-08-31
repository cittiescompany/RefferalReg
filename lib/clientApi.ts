"use client";

import axios from "axios";
// import Cookies from "js-cookie";


const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default clientApi;



// const clientApi = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// // Attach token from cookies automatically
// clientApi.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get("auth_token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// clientApi.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       console.warn("Unauthorized! Token may have expired.");
//       // You could redirect to login or trigger refresh logic
//     }
//     return Promise.reject(error);
//   }
// );

// export default clientApi;
