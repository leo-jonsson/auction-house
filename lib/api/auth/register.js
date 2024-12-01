import { API_REGISTER } from "@/lib/constants";
import { headers } from "@/lib/headers";

export const register = async ({ name, email, password }) => {
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await fetch(API_REGISTER, {
      method: "POST",
      headers: headers(),
      body,
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || "Failed to register, please try again."
      );
    }
    console.log("Registration completed");
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
