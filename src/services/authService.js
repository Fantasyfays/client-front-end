import axios from "axios";

const API_URL = "http://localhost:8080/users";

export const loginUser = async (loginData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, loginData, {
            withCredentials: true, // Cookies worden meegezonden
        });
        console.log("API-response:", response); // Debug
        return response.data;
    } catch (error) {
        console.error("Login API Error:", error.response || error.message); // Debug
        throw error;
    }
};
