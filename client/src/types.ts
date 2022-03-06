import { Feelings } from "./hooks/useFeelings";

export interface IUser {
  coverPicture: string;
  createdAt: string;
  email: string;
  followers: string[];
  followings: string[];
  isAdmin: boolean;
  likedPosts: string[];
  password: string;
  profilePicture: string;
  updatedAt: string;
  username: string;
  _id: string;
}

export interface IPost {
  _id: string;
  createdAt: string;
  desc: string;
  img: string;
  likes: string[];
  updatedAt: string;
  userId: string;
  username: string;
  feeling: Feelings;
}

export interface IState {
  auth: {
    error: boolean;
    isFetching: false;
    user: IUser;
  };
  userNav: boolean;
}
