import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Post } from "../components/Post";
import { axiosInstance } from "../config";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/posts");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <FeedContainer>
      {posts.map((post, index) => (
        <Post className="post" key={index} {...post} />
      ))}
    </FeedContainer>
  );
};

const FeedContainer = styled.div`
  overflow: hidden;
`;

export default Feed;
