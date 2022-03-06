import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://play-picasso.herokuapp.com/api/",
});

export const fetchPosts = async () => {
  return await axiosInstance.get("/posts").then((res) => res.data);
};
