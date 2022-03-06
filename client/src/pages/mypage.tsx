import { Flex, Image } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../api";
import { useUser } from "../hooks/useUser";
import { loginSuccess } from "../redux/authSlice";

const MyPage = () => {
  const user = useUser();
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef2 = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newPasswordsMatch, setNewPasswordsMatch] = useState(true);
  const dispatch = useDispatch();
  const [changePassword, setChangePassword] = useState(false);

  const handleFileChange = (e: any) => {
    console.log(e.currentTarget.files[0]);
  };

  const handleUpdateInfo = async (e: any) => {
    e.preventDefault();
    if (currentPasswordRef.current?.value) {
      const res = await axiosInstance.post("/auth/login", {
        username: user.usename,
        password: currentPasswordRef.current?.value,
      });
      console.log(res.data);
      // if (validPassword) {
      //   let body = {
      //     username: usernameRef.current?.value,
      //     email: emailRef.current?.value,
      //     password: user.password,
      //   };
      //   if (changePassword) {
      //     if (
      //       newPasswordRef.current?.value === newPasswordRef2.current?.value
      //     ) {
      //       body.password = newPasswordRef.current?.value;
      //     } else {
      //       setError(true);
      //       setErrorMessage("New passwords don't match.");
      //     }
      //   }
      //   if (!error) {
      //     try {
      //       const res = await axiosInstance.put(`/users/${user._id}`, body);
      //     } catch (err) {
      //       console.log(err);
      //     }
      //   }
      // } else {
      //   setError(true);
      //   setErrorMessage("Invalid current password");
      // }
    } else {
      setError(true);
      setErrorMessage("Please type current password.");
    }
  };

  return (
    <MyPageContainer>
      <h2>My Page</h2>
      <form>
        <Image
          boxSize="10rem"
          borderRadius="full"
          src={
            user?.profilePicture ||
            "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"
          }
          alt="Fluffybuns the destroyer"
          style={{ margin: "auto" }}
        />
        <input type="file" onChange={handleFileChange} />
        <p>Username</p>
        <input
          type="text"
          minLength={5}
          ref={usernameRef}
          defaultValue={user.username}
        />
        <>
          <p>Email</p>
          <input
            type="text"
            minLength={5}
            ref={emailRef}
            defaultValue={user.email}
          />
        </>
        <p>Current Password</p>
        <input type="password" minLength={8} ref={currentPasswordRef} />
        {changePassword && (
          <>
            <p>New Password</p>
            <input type="password" minLength={8} ref={newPasswordRef} />
            <p>Retype New Password</p>
            <input type="password" minLength={8} ref={newPasswordRef2} />
          </>
        )}
        {error && <h3 className="errorMessage">{errorMessage}</h3>}
        <button onClick={handleUpdateInfo}>Update Info</button>
        {!changePassword && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setChangePassword(true);
            }}
          >
            Change Password
          </button>
        )}
      </form>
    </MyPageContainer>
  );
};

const MyPageContainer = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 20px;

  h2 {
    font-size: 30px;
    font-weight: bold;
  }

  form {
    margin-bottom: 40px;

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

export default MyPage;
