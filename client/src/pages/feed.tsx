import styled from "@emotion/styled";
import React from "react";
import { useQuery } from "react-query";
import { fetchPosts } from "../api";
import { Loader } from "../components/Loader";
import { Post } from "../components/Post";
import { IPost } from "../types";

const Feed: React.FC = () => {
  const { isLoading: postsLoading, data: posts } = useQuery<IPost[]>(
    ["posts"],
    () => fetchPosts()
  );

  return (
    <FeedContainer>
      {postsLoading ? (
        <Loader />
      ) : (
        posts?.map((post, index) => <Post key={index} {...post} />)
      )}
    </FeedContainer>
  );
};

const FeedContainer = styled.div`
  justify-content: space-around;
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: auto;
`;

export default Feed;
