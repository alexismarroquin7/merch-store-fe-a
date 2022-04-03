import axios from "axios";

export const axiosInstance = () => axios.create({
  baseURL: process.env.NODE_ENV === 'production'
  ? `https://merch-store-be-a.herokuapp.com/api` 
  : `http://localhost:9000/api`
});