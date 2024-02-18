import React, { useState } from 'react';
import './Calendar.css'; // Calendar 스타일 파일 import
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import { InputLabel, Input, Grid, Button, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { AddBox } from '@mui/icons-material';
import axios from 'axios';
import { Snackbar } from '../../Component/Snackbar';
function Calendar() {
    const [snacks, setSnacks] = React.useState({
        type: 'info',
        open: false,
        message: '',
    });
    // 달력 데이터를 사용하여 셀 값의 초기 상태를 설정합니다.
    const [currentDate, setCurrentDate] = useState(new Date()); //현재날짜
    const currentYear = currentDate.getFullYear(); //현재 년도
    const currentMonth = currentDate.getMonth(); //현재 달
    // React.useEffect(() => {
    //     ScheduleSelect();
    // }, []);

    React.useEffect(() => {
        ScheduleSelect();
    }, [currentYear, currentMonth]); // 현재달 현재년도 변경될 때마다 실행

    const [calendarData, setCalendarData] = useState([]); //달력 값 배열 담기
    const [workData, setWorkData] = useState([]); //조회
    const [selected, setSelected] = useState(0); //셀클릭 이벤트
    const [label, setLabel] = useState(''); //라벨
    const [isCardVisible, setCardVisibility] = useState(false); //+ 버튼 클릭 이벤트
    const updatedCalendarData = calendarData.map((week) => {
        return week.map((dayObj) => {
            return { ...dayObj, label: '' }; // label 속성을 빈 문자열로 설정
        });
    });
    const toggleCardVisibility = () => {
        setCardVisibility(!isCardVisible); // + 버튼 클릭 이벤트.
        const cellIndex = `${currentDate.getMonth() + 1}/${1}`;
        if (!isCardVisible) {
            setSelected(cellIndex);
        } else {
            setCalendarData(updatedCalendarData);
            setSelected('');
        }
    };
    function formatDate(year, month, day) {
        //날짜포맷
        const formattedMonth = (month < 10 ? '0' : '') + month;
        const formattedDay = (day < 10 ? '0' : '') + day;
        return `${year}/${formattedMonth}/${formattedDay}`;
    }
    const generateCalendarData = (year, month, workData) => {
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        const firstDayOfWeek = firstDayOfMonth.getDay();

        const calendarData1 = [];
        const workSaveData = []; //현재 달에 저장되있는 근무 정보
        // 첫 번째 날짜를 생성합니다.
        const compareCurrentDate = new Date(currentYear, currentMonth, 1); // 저장된 데이터랑 비교하기위한 현재 년도 달
        for (let i = 0; i < workData.length; i++) {
            // 두 번째 날짜를 생성합니다.
            const compareWorkDate = new Date(workData[i].WORKING_DATE); //저장된 데이터랑 비교하기위한 조회된 년도 달
            // 년과 월이 같은지 확인합니다.
            const isSameMonthAndDay =
                compareCurrentDate.getMonth() === compareWorkDate.getMonth() &&
                compareCurrentDate.getFullYear() === compareWorkDate.getFullYear();
            if (isSameMonthAndDay) {
                //월과 일이 같으면
                workSaveData.push({
                    day: compareWorkDate.getDate(),
                    label: workData[i].WORKING_NAME,
                });
            }
        }
        let currentWeek = [];
        for (let i = 0; i < firstDayOfWeek; i++) {
            currentWeek.push({ day: null, label: null }); // 이전 달의 일자로 채우기
        }

        for (let day = 1; day <= daysInMonth; day++) {
            currentWeek.push({ day, label: null });
            if (currentWeek.length === 7) {
                calendarData1.push(currentWeek);
                currentWeek = [];
            }
        }

        if (currentWeek.length > 0) {
            while (currentWeek.length < 7) {
                currentWeek.push({ day: null, label: null }); // 다음 달의 일자로 채우기
            }
            calendarData1.push(currentWeek);
        }
        calendarData1.forEach((week) => {
            week.forEach((day) => {
                for (let i = 0; i < workSaveData.length; i++) {
                    if (workSaveData[i].day == day.day) {
                        day.label = workSaveData[i].label;
                    }
                }
            });
        });
        return calendarData1;
    };
    // 저장 버튼 이벤트
    const saveConfirm = async () => {
        var userId = sessionStorage.getItem('userId'); //로그인된 아이디
        let saveData = [];
        calendarData.forEach((week, index) => {
            week.forEach((dayObj, offset) => {
                if (
                    dayObj.day === undefined ||
                    dayObj.day == null ||
                    dayObj.label == undefined ||
                    dayObj.label == null ||
                    dayObj.label == ''
                ) {
                    //날짜와 근무없으면 x
                } else {
                    saveData.push({
                        USER_ID: userId,
                        WORKING_DATE: formatDate(currentYear, currentMonth + 1, dayObj.day),
                        WORKING_NAME: dayObj.label,
                        CREATE_ID: userId,
                    });
                }
            });
        });

        await axios
            .post('/calendarInsert', saveData)
            .then((e) => {
                setSnacks({
                    ...snacks,
                    open: true,
                    type: 'info',
                    message: '저장되었습니다.',
                });
                setCardVisibility(false);
                ScheduleSelect();
            })
            .catch((e) => {
                setSnacks({
                    ...snacks,
                    open: true,
                    type: 'error',
                    message: '저장실패되었습니다.',
                });
            });
    };
    //시간표 불러오기 API
    const ScheduleSelect = async () => {
        let getData = {
            USER_ID: sessionStorage.getItem('userId'),
            WORKING_DATE: '',
            WORKING_NAME: '',
            CREATE_ID: sessionStorage.getItem('userId'),
        };
        await axios
            .get('/scheduleSelect', {
                // headers: {
                //     'Content-Type': `application/json`,
                // },
                params: getData,
            })
            .then((e) => {
                let data = e.data;

                if (data.length === 0) {
                    setSnacks({
                        ...snacks,
                        open: true,
                        type: 'info',
                        message: '정보를 다시 확인 해주세요.',
                    });
                } else {
                    setSnacks({
                        ...snacks,
                        open: true,
                        type: 'success',
                        message: '조회되었습니다.',
                    });
                    const calendarData = generateCalendarData(currentYear, currentMonth, data);
                    setCalendarData(calendarData);

                    // setCalendarData(generateCalendarData(currentYear, currentMonth));
                }
            })
            .catch((e) => {
                console.log('error', e);
            });
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
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const workChangeCalendar = (_work) => {
        calendarData.forEach((week, index) => {
            week.forEach((dayObj, offset) => {
                if (dayObj.day === parseInt(selected.split('/')[1], 10)) {
                    // day가 "2/1"인 경우 해당 요소의 value를 "E"로 변경합니다.
                    dayObj.label = _work;
                }
            });
        });
    };
    //근무 클릭 이벤트
    const workChangeEvent = (e) => {
        // calendarData 배열을 순회하면서 day가 "2/1"인 요소를 찾습니다.

        if (e === '0') {
            //이브닝
            setLabel('E');
            workChangeCalendar('E');
            setSelected(
                `${currentMonth + 1}/${parseInt(selected.split('/')[1]) + 1}` //다음칸이동
            );
        } else if (e === '1') {
            //데이
            setLabel('D');
            workChangeCalendar('D');
            setSelected(
                `${currentMonth + 1}/${parseInt(selected.split('/')[1]) + 1}` //다음칸이동
            );
        } else if (e === '2') {
            //나이트
            setLabel('N');
            workChangeCalendar('N');
            setSelected(
                `${currentMonth + 1}/${parseInt(selected.split('/')[1]) + 1}` //다음칸이동
            );
        } else if (e === '3') {
            //휴가
            setLabel('V');
            workChangeCalendar('V');
            setSelected(
                `${currentMonth + 1}/${parseInt(selected.split('/')[1]) + 1}` //다음칸이동
            );
        } else if (e === '4') {
            //오프
            setLabel('O');
            workChangeCalendar('O');
            setSelected(`${currentMonth + 1}/${parseInt(selected.split('/')[1]) + 1}`);
        }
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
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Grid
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Button sx={{ p: 0, m: 0, minWidth: '40px' }} size="medium" onClick={goToPreviousMonth}>
                            <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
                        </Button>
                        <Button sx={{ p: 0, m: 0, minWidth: '40px' }} size="small" onClick={goToNextMonth}>
                            <ArrowForwardIosIcon></ArrowForwardIosIcon>
                        </Button>
                    </Grid>
                    <Grid
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h6" style={{ fontSize: '15px' }}>{`${currentDate.getFullYear()}년 ${
                            currentDate.getMonth() + 1
                        }월`}</Typography>
                    </Grid>
                    <Grid
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Button sx={{ p: 0, m: 0, minWidth: '40px' }} size="small" onClick={toggleCardVisibility}>
                            <AddIcon></AddIcon>
                        </Button>
                        <Button sx={{ p: 0, m: 0, minWidth: '40px' }} size="small" onClick={saveConfirm}>
                            <SaveIcon></SaveIcon>
                        </Button>
                    </Grid>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
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
                                    {week.map((dayObj, offset) => (
                                        <TableCell
                                            key={`cell-${index}-${offset}`}
                                            className={`
            ${dayObj.day === null ? 'other-month' : ''}
            ${selected === `${currentMonth + 1}/${dayObj.day}` ? 'selected-cell' : ''}
          `}
                                            onClick={() => {
                                                setSelected(`${currentMonth + 1}/${dayObj.day}`);
                                            }}
                                            style={{ padding: '5px' }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    height: '100%',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        flex: 4,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {dayObj.day}
                                                </div>
                                                <div style={{ flex: 6 }}>
                                                    {/* 라벨이 존재하는 경우에만 렌더링합니다. */}
                                                    {dayObj.label && (
                                                        <InputLabel
                                                            onClick={() => {
                                                                setSelected(`${currentMonth + 1}/${dayObj.day}`);
                                                            }}
                                                        >
                                                            {dayObj.label}
                                                        </InputLabel>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                    ))}
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
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '2px',
                                marginTop: '10px',
                            }}
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={(e) => {
                                    workChangeEvent('0');
                                }}
                            >
                                이브닝
                            </Button>
                            <Button
                                variant="contained"
                                color="info"
                                onClick={(e) => {
                                    workChangeEvent('1');
                                }}
                            >
                                데이
                            </Button>
                            <Button
                                variant="contained"
                                color="inherit"
                                onClick={(e) => {
                                    workChangeEvent('2');
                                }}
                            >
                                나이트
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={(e) => {
                                    workChangeEvent('3');
                                }}
                            >
                                휴가
                            </Button>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={(e) => {
                                    workChangeEvent('4');
                                }}
                            >
                                오프
                            </Button>
                        </div>
                    </Card>
                </Grid>
            )}
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
        </Grid>
    );
}

export default Calendar;
