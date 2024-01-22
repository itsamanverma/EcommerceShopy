export const registration = async (formData) => {
  try {
    let response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return response.json();
    
  } catch (error) {
    throw error;
  }
};
