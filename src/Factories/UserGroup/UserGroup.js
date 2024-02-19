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
  const [columnDefs, setColumnDefs] = React.useState([]);
  const [dateInputs, setDateInputs] = React.useState({
    startDate: new Date(newDay.setDate(today.getDate() + 1)),
    endDate: new Date(newDay1.setDate(today1.getDate() + 7)),
  });
  React.useEffect(() => {
    UserGroupSelect();
  }, []);

  //사용자그룹 불러오기 API
  const UserGroupSelect = async () => {
    var userId = sessionStorage.getItem("userId");

    let getData = new URLSearchParams({
      START_DATE: Commons.DateFormating(dateInputs.startDate, 4),
      END_DATE: Commons.DateFormating(dateInputs.endDate, 4),
      USER_ID: userId,
    });
    let resultColArr = [
      { field: "userId", headerName: "", headerHeight: 0, minWidth: 100 },
      { field: "userIdFn", headerName: "사용자명", minWidth: 120 },
    ];
    let diffDate = Commons.DateDiff(
      Commons.DateFormating(dateInputs.startDate, 4),
      Commons.DateFormating(dateInputs.endDate, 4)
    );
    await axios
      .get("/friendSelect", {
        headers: {
          "Content-Type": `application/json`,
        },
        params: getData,
      })
      .then((e) => {
        console.log(e.data);
        for (let i = 0; i < diffDate + 1; i++) {
          const today1 = new Date();
          const newDay1 = new Date();
          const today2 = new Date(newDay1.setDate(today1.getDate() + 1));
          const newDay2 = new Date(newDay1.setDate(today1.getDate() + 1));
          let someDay = new Date(newDay2.setDate(today2.getDate() + i));
          let year = someDay.getFullYear();
          let month = someDay.getMonth() + 1;
          let day = someDay.getDate();
          resultColArr.push({
            field: "planQty" + i.toString(),
            headerName:
              year +
              "-" +
              month.toString().padStart(2, "0") +
              "-" +
              day.toString().padStart(2, "0"),
            editable: true,

            valueFormatter: (params) => {
              var formatted = params.value
                ? params.value
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                : "";
              return formatted;
            },
            cellStyle: { textAlign: "right" },
          });
        }
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
            message: "조회되었습니다.",
          });
        }
        setColumnDefs(resultColArr);
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
        columnDefs={columnDefs}
        setColumnDefs={setColumnDefs}
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
