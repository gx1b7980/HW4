import axios from 'axios';
import { useAuth } from '../../AuthContext'; // Adjust path as necessary

export const useAxios = () => {
  const { authToken } = useAuth();

  const axiosInstance = axios.create({
    baseURL: "https://ganna.one/HW4",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return axiosInstance;
};
