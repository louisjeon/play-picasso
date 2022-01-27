import { ChakraProvider } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContainer } from "./components/AppContainer";
import { Hero } from "./components/Hero";
import { NavBar } from "./components/NavBar";
import Index from "./pages";
import Draw from "./pages/draw";
import Feed from "./pages/feed";
import Find from "./pages/find";
import Login from "./pages/login";
import { MyPage } from "./pages/mypage";
import Stocks from "./pages/stocks";

export const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <AppContainer>
          <Hero title="Play Picasso" />
          <NavBar />
          <MainContainer>
            <Routes>
              <Route path="/">
                <Route index element={<Index />} />
                <Route path="feed" element={<Feed />} />
                <Route path="stocks" element={<Stocks />} />
                <Route path="find" element={<Find />} />
                <Route path="draw" element={<Draw />} />
                <Route path="login" element={<Login />} />
                <Route path="mypage" element={<MyPage />} />
              </Route>
            </Routes>
          </MainContainer>
        </AppContainer>
      </BrowserRouter>
    </ChakraProvider>
  );
};

const MainContainer = styled.div`
  width: 80%;
  margin-top: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;
