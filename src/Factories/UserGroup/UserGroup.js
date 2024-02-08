import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserGroupView from "../../Views/UserGroup/UserGroup";
import { Snackbar } from "../../Component/Snackbar";
import axios from "axios";
import Commons from "../../Services/Common/Common";
function UserGroup(props) {
  const navigate = useNavigate(); //Route move api
  const [snacks, setSnacks] = React.useState({
    type: "info",
    open: false,
    message: "",
  });
  //그리드 데이터
  const [rowData, setRowData] = useState([
    { first: "Tesla", userId: "Model Y", groupName: 64950, electric: true },
    { first: "Ford", userId: "F-Series", groupName: 33850, electric: false },
    { first: "Toyota", userId: "Corolla", groupName: 29600, electric: false },
  ]);
  //Login 변수
  const [inputs, setInputs] = React.useState({
    userId: "",
    userNm: "",
    email: "",
    userTel: "",
  });
  const today = new Date();
  const newDay = new Date();
  const today1 = new Date();
  const newDay1 = new Date();
  const [dateInputs, setDateInputs] = React.useState({
    startDate: new Date(newDay.setDate(today.getDate() + 1)),
    endDate: new Date(newDay1.setDate(today1.getDate() + 7)),
  });
  React.useEffect(() => {
    UserGroupSelect();
  }, []);

  //사용자그룹 불러오기 API
  const UserGroupSelect = async () => {
    console.log(Commons.DateFormating(dateInputs.startDate, 4));
    console.log(Commons.DateFormating(dateInputs.endDate, 4));
    var userId = sessionStorage.getItem("userId");

    let getData = new URLSearchParams({
      USER_ID: userId,
    });
    await axios
      .get("/userGroupSelect", {
        headers: {
          "Content-Type": `application/json`,
        },
        params: getData,
      })
      .then((e) => {
        console.log(e.data);
        if (e.data.length === 0) {
          setSnacks({
            ...snacks,
            open: true,
            type: "info",
            message: "정보를 다시 확인 해주세요.",
          });
        } else {
          setSnacks({
            ...snacks,
            open: true,
            type: "success",
            message: "아이디는 " + e.data[0].user_ID + "입니다.",
          });
        }
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  return (
    <div className="FindId">
      <UserGroupView
        inputs={inputs}
        setInputs={setInputs}
        rowData={rowData}
        setRowData={setRowData}
        dateInputs={dateInputs}
        setDateInputs={setDateInputs}
        UserGroupSelect={UserGroupSelect}
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
export default UserGroup;
