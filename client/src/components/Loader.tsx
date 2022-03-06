import styled from "@emotion/styled";

export const Loader = () => {
  return (
    <LoaderContainer>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  margin: auto;

  div {
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: red;
    animation: lds-grid 1.2s linear infinite;
  }

  div:nth-of-type(1) {
    top: 8px;
    left: 8px;
    animation-delay: 0s;
  }

  div:nth-of-type(2) {
    top: 8px;
    left: 32px;
    animation-delay: -0.4s;
  }

  div:nth-of-type(3) {
    top: 8px;
    left: 56px;
    animation-delay: -0.8s;
  }

  div:nth-of-type(4) {
    top: 32px;
    left: 8px;
    animation-delay: -0.4s;
  }

  div:nth-of-type(5) {
    top: 32px;
    left: 32px;
    animation-delay: -0.8s;
  }

  div:nth-of-type(6) {
    top: 32px;
    left: 56px;
    animation-delay: -1.2s;
  }

  div:nth-of-type(7) {
    top: 56px;
    left: 8px;
    animation-delay: -0.8s;
  }

  div:nth-of-type(8) {
    top: 56px;
    left: 32px;
    animation-delay: -1.2s;
  }

  div:nth-of-type(9) {
    top: 56px;
    left: 56px;
    animation-delay: -1.6s;
  }

  @keyframes lds-grid {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }
`;
