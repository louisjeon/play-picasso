import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import styled from "styled-components";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Hero } from "../components/Hero";
import { NavBar } from "../components/NavBar";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Container>
          <Hero title="Play Picasso" />
          <NavBar />
          <ComponentContainer>
            <Component {...pageProps} />
          </ComponentContainer>
          <DarkModeSwitch />
        </Container>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

const ComponentContainer = styled.div`
  width: 80%;
  margin-top: 20px;
`;

export default MyApp;
