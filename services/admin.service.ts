/* eslint-disable @typescript-eslint/no-explicit-any */

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ServiceInput = {
  title: string;
  description: string;
  price: number;
  image?: string | null;
  location?: string;
  availability?: boolean;
  categoryId: string;
};

export const adminUserService = {
  getAllUsers: async (cookieStore: any) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/admin/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching users:", error);
      return { success: false, message: "Failed to fetch users", data: [] };
    }
  },

  getUserById: async (id: string, cookieStore: any) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/admin/users/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
        }
      );
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      return result.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      return null;
    }
  },

  updateUserRole: async (id: string, role: string, cookieStore: any) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/admin/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ role }),
      });
      return await response.json();
    } catch (error) {
      console.error("Error updating role:", error);
      return { success: false, message: "Failed to update role" };
    }
  },

  banUser: async (id: string, cookieStore: any) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/admin/users/ban/${id}`, {
        method: "PATCH",
        headers: { Cookie: cookieStore.toString() },
      });
      return await response.json();
    } catch (error) {
      console.error("Error banning user:", error);
      return { success: false, message: "Failed to ban user" };
    }
  },

  toggleBanUser: async (id: string, cookieStore: any) => {
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/admin/users/ban/${id}`, {
        method: "PATCH",
        headers: { Cookie: cookieStore.toString() },
      });
      return await res.json();
    } catch (error) {
      console.error("Toggle ban error:", error);
      return { success: false };
    }
  },

  getAllservicesByProvider: async (cookieStore: any) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/services`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      return result;
    } catch (error) {
      console.error("Error fetching services:", error);
      return { success: false, message: "Failed to fetch services", data: [] };
    }
  },

  createServiceProvider: async (payload: ServiceInput, cookieStore: any) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/provider/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });
      return await response.json();
    } catch (error) {
      console.error("Error creating service:", error);
      return { success: false, message: "Failed to create service" };
    }
  },

  updateServiceProvider: async (id: string, payload: ServiceInput, cookieStore: any) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/provider/services/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });
      return await response.json();
    } catch (error) {
      console.error("Error updating service:", error);
      return { success: false, message: "Failed to update service" };
    }
  },

  deleteServiceProvider: async (id: string, cookieStore: any) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/provider/services/${id}`, {
        method: "DELETE",
        headers: { Cookie: cookieStore.toString() },
      });
      return await response.json();
    } catch (error) {
      console.error("Error deleting service:", error);
      return { success: false, message: "Failed to delete service" };
    }
  },
};