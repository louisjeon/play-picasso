import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8800/api",
});

export const fetchPosts = () => {
  return axiosInstance.get("/posts").then((res) => res.data);
};
