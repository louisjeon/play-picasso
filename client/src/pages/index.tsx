import { Flex, Image } from "@chakra-ui/react";
import styled from "@emotion/styled";
import images from "../images";

const Home = () => {
  return (
    <HomeContainer>
      <h2>Play Picasso</h2>
      <br />
      <Flex justifyContent="space-evenly">
        {Object.entries(images).map(([alt, src], index) => {
          return <Image key={index} src={src} alt={alt} width="100px" />;
        })}
      </Flex>
      <br />
      <p>
        Play Picasso is a modern art social network service where users can
        share their feelings with simple drawings.
      </p>
      <br />
      <p>You can like posts and follow users.</p>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  h2 {
    font-size: 40px;
  }
  p {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
`;

export default Home;
