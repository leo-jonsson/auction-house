import { API_LISTINGS } from "@/lib/constants";
import { headers } from "@/lib/headers";
import * as storage from "@/lib/utilities/storage";

export default class ListingAPI {
  apiListing = `${API_LISTINGS}`;

  // Handles API responses and redirects if a 401 Unauthorized error occurs.
  handleResponse = async (res) => {
    if (res.status === 401) {
      window.location.href = "/";
      throw new Error("Unauthorized - Redirecting to home page.");
    }
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error: ${res.status} ${errorText}`);
    }
    return res.json();
  };

  // Generic method for API requests
  fetchData = async (endpoint, method = "GET", body = null) => {
    try {
      const res = await fetch(endpoint, {
        method,
        headers: headers(),
        body: body ? JSON.stringify(body) : undefined,
      });
      return await this.handleResponse(res);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  listings = {
    readAll: async () => {
      const endpoint = `${this.apiListing}`;
      return await this.fetchData(endpoint);
    },
  };
}
