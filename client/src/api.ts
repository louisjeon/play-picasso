import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://play-picasso.herokuapp.com/api",
});

export const fetchPosts = () => {
  return axiosInstance.get("/posts").then((res) => res.data);
};
