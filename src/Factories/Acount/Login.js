import React from "react";
import { useNavigate } from "react-router-dom";
import LoginView from "../../Views/Acount/Login";
import axios from "axios";
import { Snackbar } from "../../Component/Snackbar";
function Login(props) {
  const navigate = useNavigate(); //Route move api
  const [snacks, setSnacks] = React.useState({
    type: "info",
    open: false,
    message: "",
  });
  //Login 변수
  const [inputs, setInputs] = React.useState({
    userId: "",
    userPw: "",
    userNm: "",
    userTel: "",
    eamil: "",
    findId: false,
    findPw: false,
  });
  //회원가입 변수
  const [register, setRegister] = React.useState({
    register: false,
    userId: "",
    userNm: "",
    userPw: "",
    email: "",
    userTel: "",
  });
  //로그인 버튼 API
  const LoginBtn = async () => {
    let getData = new URLSearchParams({
      USER_ID: inputs.userId,
      PASSWORD: inputs.userPw,
    });
    // navigate("/Home");
    await axios
      .get("/select", {
        headers: {
          "Content-Type": `application/json`,
        },
        params: getData,
      })
      .then((e) => {
        //데이터가 없으면 아이디나 비밀번호가 맞지않음.
        if (e.data.length === 0) {
          setSnacks({
            ...snacks,
            open: true,
            type: "info",
            message: "아이디나 비밀번호가 틀렷습니다.",
          });
        } else {
          setSnacks({
            ...snacks,
            open: true,
            type: "success",
            message: "로그인에 성공하였습니다.",
          });
          sessionStorage.setItem("userId", e.data[0].user_ID);
          navigate("/Home");
        }
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  //회원가입 버튼 API
  const RegisterBtn = async () => {
    await axios
      .post(
        "/insert",
        new URLSearchParams({
          USER_ID: register.userId,
          USER_NM: register.userNm,
          PASSWORD: register.userPw,
          USER_EMAIL: register.email,
          USER_TEL: register.userTel,
        })
      )
      .then((e) => {
        setSnacks({
          ...snacks,
          open: true,
          type: "info",
          message: "회원가입에 성공하였습니다.",
        });
        setRegister({
          ...register,
          register: false,
        });
      })
      .catch((e) => {
        setSnacks({
          ...snacks,
          open: true,
          type: "error",
          message: "이미 가입된 회원입니다.",
        });
      });
  };
  return (
    <div className="Login">
      <LoginView
        inputs={inputs}
        setInputs={setInputs}
        LoginBtn={LoginBtn}
        RegisterBtn={RegisterBtn}
        register={register}
        setRegister={setRegister}
      />
      <Snackbar
        type={snacks.type}
        open={snacks.open}
        message={snacks.message}
        onClose={() => {
          setSnacks({
            ...snacks,
            open: false,
          });
        }}
      />
    </div>
  );
}
export default Login;
