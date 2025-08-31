import axios from "axios";
// import { cookies } from "next/headers";

export function serverApi() {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
}


// export async function serverApi() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("auth_token")?.value;

//   return axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
//     headers: {
//       "Content-Type": "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }),
//     },
//     withCredentials: true,
//   });
// }
