const api = {
  baseURL: "http://localhost:5000/api",

  // Fetch all properties
  getProperties: async () => {
    const res = await fetch(`${api.baseURL}/properties`);
    const data = await res.json();
    return data.data || [];
  },

  // Add a property and return the updated list
  addProperty: async (propertyData) => {
    const res = await fetch(`${api.baseURL}/properties`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(propertyData),
    });
    const data = await res.json();
    return data; // return the newly added property or success flag
  },

  // Fetch properties of a specific owner
  getMyProperties: async (userId) => {
    const res = await fetch(`${api.baseURL}/properties/owner/${userId}`);
    const data = await res.json();
    return data.data || [];
  },

  // Delete a property and return updated list
  deleteProperty: async (id) => {
    const res = await fetch(`${api.baseURL}/properties/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },

  // Schedule property viewing
  scheduleViewing: async (data) => {
    const res = await fetch(`${api.baseURL}/viewings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};

export default api;



