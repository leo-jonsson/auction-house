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
    const data = await res.json();
    if (res.ok) {
      storage.save("token", data.data.accessToken);
      storage.save("user", data.data);
    }
    console.log("sucess:", data.data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
