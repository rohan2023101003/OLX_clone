import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3000"; // Backend URL
axios.defaults.withCredentials = true; // Enable sending cookies with requests

export const fetchUserData = async () => {
  try {
    const response = await axios.get('/user/home');
    console.log('User-data:', response.data);
    return response.data;
  } catch (error) {
    
    console.error('Error fetching user data:', error);
    throw error;
  }
};

