/* eslint-disable @typescript-eslint/no-explicit-any */

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

// Types
export type ServiceInput = {
  title: string; // service title
  description: string;
  price: number | string;
  image?: string | null;
  location?: string; // optional, defaults to "Unknown"
  availability?: boolean; // optional, defaults to true
  category: {
    id: string;
  };
};

export const servicesService = {
  // Get all services
  getAllservices: async (cookieStore: any) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/services/`, {
        cache: "no-store",
        headers: { Cookie: cookieStore.toString() },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching services:", error);
      return { success: false, message: "Failed to fetch services", data: [] };
    }
  },

  // Get all categories
  getAllCategories: async (cookieStore: any) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/services/categories/all`,
        {
          cache: "no-store",
          headers: { Cookie: cookieStore.toString() },
        },
      );
      const result = await response.json();
      return result.data || []; // return only categories array
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  // Get services by category ID
  getServicesByCategory: async (categoryId: string, cookieStore: any) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/services/getServicesByCategory/${categoryId}`,
        {
          cache: "no-store",
          headers: { Cookie: cookieStore.toString() },
        },
      );
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      return result.data || [];
    } catch (error) {
      console.error(
        `Error fetching services for category ${categoryId}:`,
        error,
      );
      return [];
    }
  },

  // Create a new service
  createServiceProvider: async (
    cookieStore: any,
    serviceData: ServiceInput,
  ) => {
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

      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/provider/services`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to create service");
      return result;
    } catch (error) {
      console.error("Error creating service:", error);
      throw error;
    }
  },

  // Update a service
  updateServiceProvider: async (
    id: string,
    serviceData: ServiceInput,
    cookieStore: any,
  ) => {
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

      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/provider/services/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to update service");
      return result;
    } catch (error) {
      console.error(`Error updating service ${id}:`, error);
      throw error;
    }
  },
  // Get service by ID
  getServicesById: async (id: string, cookieStore: any) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/services/${id}`, {
        cache: "no-store",
        headers: { Cookie: cookieStore.toString() },
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      return result.data; // returns the single service object
    } catch (error) {
      console.error(`Error fetching service with id ${id}:`, error);
      return null;
    }
  },
  // Delete a service
  deleteServiceProvider: async (id: string, cookieStore: any) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/provider/services/${id}`,
        {
          method: "DELETE",
          headers: { Cookie: cookieStore.toString() },
        },
      );
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to delete service");
      return result;
    } catch (error) {
      console.error(`Error deleting service ${id}:`, error);
      throw error;
    }
  },
};
