import { API_PROFILES } from "@/lib/constants";
import { headers } from "@/lib/headers";
import * as storage from "@/lib/utilities/storage";

export default class ProfileAPI {
  apiProfile = `${API_PROFILES}`;

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

  profile = {
    read: async (username) => {
      const endpoint = `${this.apiProfile}/${username}?_following=true&_followers=true`;
      return await this.fetchData(endpoint);
    },

    readAll: async () => {
      const endpoint = `${this.apiProfile}?_following=true&_followers=true`;
      return await this.fetchData(endpoint);
    },

    update: async (username, formData) => {
      const endpoint = `${this.apiProfile}/${username}`;
      return await this.fetchData(endpoint, "PUT", formData);
    },

    readPosts: async (username) => {
      const endpoint = `${this.apiProfile}/${username}/posts?_comments=true&_author=true&_reactions=true`;
      return await this.fetchData(endpoint);
    },

    search: async (query) => {
      const endpoint = `${this.apiProfile}/search?q=${query}`;
      return await this.fetchData(endpoint);
    },

    signOut: async () => {
      try {
        storage.remove("user");
        storage.remove("token");
      } catch (err) {
        console.error(err);
      } finally {
        window.location.href = "/";
      }
    },
  };
}
