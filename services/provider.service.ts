/* eslint-disable @typescript-eslint/no-explicit-any */
// 2026-04-02
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ServiceInput = {
  title: string; // required
  description: string;
  price: number | string;
  image?: string | null;
  location?: string; // optional, default: Unknown
  availability?: boolean; // optional, default: true
  category: { id: string };
};

export const providerService = {
  getAllservicesByProvider: async (cookieStore: any) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/provider/my-services`, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching provider services:", error);
      return { success: false, message: "Failed to fetch services", data: [] };
    }
  },

  getAllServices: async (cookieStore: any) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/services/categories/all`, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error("Error fetching services:", error);
      return [];
    }
  },

  getServiceById: async (cookieStore: any, id: string) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/services/${id}`, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      return result.data;
    } catch (error) {
      console.error(`Error fetching service ${id}:`, error);
      return null;
    }
  },

  // ✅ Create service
  createServiceProvider: async (cookieStore: any, serviceData: ServiceInput) => {
    try {
      const payload = {
        title: serviceData.title,
        description: serviceData.description,
        price: serviceData.price,
        image: serviceData.image || null,
        location: serviceData.location || "Unknown",
        availability: serviceData.availability ?? true,
        categoryId: serviceData.category.id,
      };

      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/provider/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create service");
      }

      return result;
    } catch (error) {
      console.error("Error creating service:", error);
      throw error;
    }
  },

  updateServiceProvider: async (id: string, serviceData: ServiceInput, cookieStore: any) => {
    try {
      const payload = {
        title: serviceData.title,
        description: serviceData.description,
        price: serviceData.price,
        image: serviceData.image,
        location: serviceData.location,
        availability: serviceData.availability,
        categoryId: serviceData.category.id,
      };

      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/provider/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Failed to update service");

      return result;
    } catch (error) {
      console.error(`Error updating service ${id}:`, error);
      throw error;
    }
  },

  deleteServiceProvider: async (id: string, cookieStore: any) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/provider/services/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to delete service");

      return result;
    } catch (error) {
      console.error(`Error deleting service ${id}:`, error);
      throw error;
    }
  },

   getAllOrdersProvider: async (cookieStore: any) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/provider/bookings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Failed to fetch orders");

      return result.data; // array of bookings
    } catch (error) {
      console.error("Error fetching provider orders:", error);
      return [];
    }
  },
};