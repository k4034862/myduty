import React, { useState } from "react";
import "./Calendar.css"; // Calendar 스타일 파일 import
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import { InputLabel, Input, Grid, Button, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { AddBox } from "@mui/icons-material";

function Calendar() {
  // 각 셀에 대한 값을 저장할 배열을 선언합니다.
  const [cellValues, setCellValues] = useState([]);

  // 달력 데이터를 사용하여 셀 값의 초기 상태를 설정합니다.

  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  // React.useEffect(() => {
  //   // 예시: 현재 달의 달력 데이터 가져오기
  //   // calendarData = generateCalendarData(currentYear, currentMonth);
  // }, []);
  // 현재 날짜를 상태로 관리

  const [cellData, setCellData] = useState([]); //달력 값 배열 담기
  const [selected, setSelected] = useState(0); //셀클릭 이벤트
  const [label, setLabel] = useState(""); //라벨
  const [isCardVisible, setCardVisibility] = useState(false); //+ 버튼 클릭 이벤트
  const toggleCardVisibility = () => {
    setCardVisibility(!isCardVisible); // + 버튼 클릭 이벤트.
    const cellIndex = `${currentDate.getMonth() + 1}/${1}`;
    if (!isCardVisible) {
      setSelected(cellIndex);
    } else {
      setSelected("");
    }
  };
  // 이전 달로 이동하는 함수
  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => {
      return new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
    });
  };

  // 다음 달로 이동하는 함수
  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      return new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
    });
  };

  // 현재 월의 첫 번째 날과 마지막 날을 구함
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  //근무 클릭 이벤트
  const workChangeEvent = (e) => {
    if (e === "0") {
      setLabel("E");
    } else if (e === "1") {
      setLabel("D");
    } else if (e === "2") {
      setLabel("N");
    } else if (e === "3") {
      setLabel("V");
    } else if (e === "4") {
      setLabel("O");
    }
  };
  const generateCalendarData = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();

    const calendarData = [];

    let currentWeek = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null); // 이전 달의 일자로 채우기
    }

    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        calendarData.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null); // 다음 달의 일자로 채우기
      }
      calendarData.push(currentWeek);
    }

    return calendarData;
  };
  const calendarData = generateCalendarData(currentYear, currentMonth);
  React.useEffect(() => {
    calendarData.forEach((week) => {
      week.forEach((day) => {
        cellValues.push({
          date: day, // 날짜
          value: "", // 각 셀의 값
        });
      });
    });
    console.log(cellValues[1]);
  }, []);
  // 각 셀의 값을 업데이트하는 함수를 정의합니다.
  const updateCellValue = (index, newValue) => {
    const newCellValues = [...cellValues];
    newCellValues[index].value = newValue;
    setCellValues(newCellValues);
  };
  // 현재 월의 날짜를 배열에 담음
  const days = [];
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }

  return (
    <Grid container spacing={0} columns={{ xs: 4, sm: 8, md: 12 }}>
      <Grid item xs={12}>
        <Card
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ p: 0, m: 0, minWidth: "40px" }}
              size="medium"
              onClick={goToPreviousMonth}
            >
              <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
            </Button>
            <Button
              sx={{ p: 0, m: 0, minWidth: "40px" }}
              size="small"
              onClick={goToNextMonth}
            >
              <ArrowForwardIosIcon></ArrowForwardIosIcon>
            </Button>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              style={{ fontSize: "15px" }}
            >{`${currentDate.getFullYear()}년 ${
              currentDate.getMonth() + 1
            }월`}</Typography>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ p: 0, m: 0, minWidth: "40px" }}
              size="small"
              onClick={toggleCardVisibility}
            >
              <AddIcon></AddIcon>
            </Button>
            <Button
              sx={{ p: 0, m: 0, minWidth: "40px" }}
              size="small"
              onClick={goToNextMonth}
            >
              <SaveIcon></SaveIcon>
            </Button>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* 달력 테이블 */}
          <Table className="calendar-table">
            <TableHead>
              <TableRow>
                {/* 요일 헤더 */}
                <TableCell>월</TableCell>
                <TableCell>화</TableCell>
                <TableCell>수</TableCell>
                <TableCell>목</TableCell>
                <TableCell>금</TableCell>
                <TableCell>토</TableCell>
                <TableCell>일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {calendarData.map((week, index) => (
                <TableRow key={`week-${index}`}>
                  {week.map((day, offset) => {
                    if (day === null) {
                      return <TableCell key={`empty-${index}-${offset}`} />;
                    }
                    const cellDate = new Date(currentYear, currentMonth, day);
                    const cellIndex = `${currentMonth + 1}/${day}`;

                    return (
                      <TableCell
                        key={`cell-${index}-${offset}`}
                        className={`
                ${cellDate.getMonth() !== currentMonth ? "other-month" : ""}
                ${selected === cellIndex ? "selected-cell" : ""}
              `}
                        onClick={() => {
                          setSelected(cellIndex);
                        }}
                        style={{ padding: "5px" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                          }}
                        >
                          <div
                            style={{
                              flex: 4,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {day}
                          </div>
                          <div style={{ flex: 6 }}>
                            {/* 추가 정보를 입력할 수 있는 텍스트 박스 */}
                            <InputLabel
                              onClick={() => {
                                setSelected(cellIndex);
                              }}
                            >
                              {/* {cellValues[cellIndex].value} */}
                            </InputLabel>
                          </div>
                        </div>
                        {/* 추가 정보를 입력할 수 있는 텍스트 박스 */}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </Grid>
      {isCardVisible && (
        <Grid item xs={12}>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "2px",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => {
                  workChangeEvent("0");
                }}
              >
                이브닝
              </Button>
              <Button
                variant="contained"
                color="info"
                onClick={(e) => {
                  workChangeEvent("1");
                }}
              >
                데이
              </Button>
              <Button
                variant="contained"
                color="inherit"
                onClick={(e) => {
                  workChangeEvent("2");
                }}
              >
                나이트
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={(e) => {
                  workChangeEvent("3");
                }}
              >
                휴가
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                color="warning"
                onClick={(e) => {
                  workChangeEvent("4");
                }}
              >
                오프
              </Button>
            </div>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}

export default Calendar;
