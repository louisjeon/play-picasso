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

export interface IState {
  auth: {
    error: boolean;
    isFetching: false;
    user: IUser;
  };
}
