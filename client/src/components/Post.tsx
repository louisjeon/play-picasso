import { Box, Flex, Image } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../config";
import { Feelings, useFeelings } from "../hooks/useFeelings";
import { IState } from "../types";

interface PostProps {
  _id: string;
  createdAt: string;
  desc: string;
  img: string;
  likes: Array<string>;
  updatedAt: string;
  userId: string;
  username: string;
  feeling: Feelings;
}

export const Post: React.FC<PostProps> = ({
  _id,
  createdAt,
  desc,
  img,
  likes,
  updatedAt,
  userId,
  username,
  feeling,
}) => {
  const user: any = useSelector<IState>((state) => state.auth.user);
  const likedBefore = likes.includes(user._id);
  const feelings = useFeelings();
  const [clicked, setClicked] = useState(false);
  const [liked, setLiked] = useState(likedBefore);
  const [newLike, setNewLike] = useState(0);

  const timeForm = () => {
    let [date, time] = createdAt.split("T");
    date = date.replaceAll("-", ".");
    let [hour, minute] = time.split(":");
    return date + " " + hour + ":" + minute;
  };

  const handleClick = () => {
    if (clicked) {
      handleLike();
    } else {
      setClicked(true);
      setTimeout(() => {
        setClicked(false);
      }, 500);
    }
  };

  const handleLike = async () => {
    try {
      await axiosInstance.put(`/posts/${_id}/like`, { userId: user._id });
      setLiked((unliking) => {
        if (likedBefore) {
          if (unliking) {
            setNewLike(-1);
          } else {
            setNewLike(0);
          }
        } else {
          if (unliking) {
            setNewLike(0);
          } else {
            setNewLike(1);
          }
        }
        return !liked;
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PostContainer>
      <Flex id="profile">
        <Image
          boxSize="2rem"
          borderRadius="full"
          src="https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"
          alt="Fluffybuns the destroyer"
        />
        {username} {feelings[feeling]}
      </Flex>
      <Image src={img} onClick={handleClick} />
      <Flex id="tools">
        <span
          id="likes"
          className="material-icons"
          style={{ color: liked ? "red" : "inherit" }}
        >
          {liked ? "favorite" : "favorite_border"}
        </span>
        {likes.length + newLike} likes
      </Flex>
      <Box id="desc">
        <span>{username} </span>
        {desc}
      </Box>
      <Box id="time">{timeForm()}</Box>
    </PostContainer>
  );
};

const PostContainer = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: black;
  border: 1px solid red;
  border-radius: 10px;
  margin-bottom: 20px;

  #profile {
    align-items: center;
    height: 40px;
  }

  #tools {
    margin: 5px 2px 0;
    #likes {
      font-size: 30px;
    }
  }

  #desc,
  #time {
    margin: 0 5px;
  }

  #desc {
    span {
      font-weight: bold;
    }
  }
`;
