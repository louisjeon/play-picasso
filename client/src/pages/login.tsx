import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../api";
import { loginFailure, loginStart, loginSuccess } from "../redux/authSlice";

const Login: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordRef2 = useRef<HTMLInputElement>(null);
  const [register, setRegister] = useState(false);
  const [error, setError] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const dispatch = useDispatch();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await axiosInstance.post("/auth/login", {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      });
      console.log(res.data);
      dispatch(loginSuccess(res.data));
      localStorage.setItem("user", JSON.stringify(res.data));
      res.data && window.location.replace("/feed");
    } catch (err) {
      console.log(err);
      dispatch(loginFailure());
      setError(true);
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (passwordRef.current?.value === passwordRef2.current?.value) {
      try {
        const res = await axiosInstance.post("/auth/register", {
          email: emailRef.current?.value,
          username: usernameRef.current?.value,
          password: passwordRef.current?.value,
        });
        console.log(res.data);
        dispatch(loginSuccess(res.data));
        res.data && window.location.replace("/feed");
      } catch (err) {
        console.log(err);
        setError(true);
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  return (
    <LoginContainer>
      <h2>{register ? "Register" : "Login"}</h2>
      <form>
        <p>Username</p>
        <input type="text" minLength={5} ref={usernameRef} />
        {register && (
          <>
            <p>Email</p>
            <input type="text" minLength={5} ref={emailRef} />
          </>
        )}
        <p>Password</p>
        <input type="password" minLength={8} ref={passwordRef} />
        {register && (
          <>
            <p>Retype Password</p>
            <input type="password" minLength={8} ref={passwordRef2} />
          </>
        )}
        <Flex>
          {register ? (
            <button onClick={handleRegister}>Register</button>
          ) : (
            <>
              <button type="submit" onClick={handleLogin}>
                Login
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setRegister((state) => !state);
                }}
              >
                Register
              </button>
            </>
          )}
        </Flex>
      </form>
      {error && !register && <h3>Login failed. Try different credentials.</h3>}
      {register && !passwordsMatch && <h3>Passwords don't match.</h3>}
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 20px;
  margin-top: 15vh;
  h2 {
    font-size: 30px;
    font-weight: bold;
  }
  form {
    input,
    button {
      border: 1px solid red;
      border-radius: 10px;
      width: 100%;
      padding: 0 10px;
    }
    button {
      flex: 1;
      margin-top: 20px;
      height: 40px;
    }
  }
`;

export default Login;
