import { API_LOGIN } from "@/lib/constants";
import { headers } from "@/lib/headers";
import * as storage from "@/lib/utilities/storage";

export const login = async ({ email, password }) => {
  const body = JSON.stringify({ email, password });
  try {
    const res = await fetch(API_LOGIN, {
      method: "POST",
      headers: headers(),
      body,
    });

    if (!res.ok) {
      // Handle specific HTTP errors
      const error = await res.json();
      throw new Error(error.message || "Login failed");
    }

    const data = await res.json();
    storage.save("token", data.data.accessToken);
    storage.save("user", data.data);
    return data; // Successful login response
  } catch (error) {
    throw error; // Re-throw to be handled in the calling function
  }
};
