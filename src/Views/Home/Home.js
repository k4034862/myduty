import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // FullCalendar React 컴포넌트
import dayGridPlugin from "@fullcalendar/daygrid"; // 달 그리드 플러그인
import "./Home.css";
import Calendar from "../../Component/Calendar/Calendar";
function Home(props) {
  const [eventData, setEventData] = useState([]);
  const [editEvent, setEditEvent] = useState(null); // 편집 중인 이벤트
  React.useEffect(() => {
    Init();
  }, []);
  const Init = async () => {
    // Dialog.ProgressBar(true);

    try {
    } catch (e) {
      //   setSnacks({
      //     toggle: true,
      //     type: "error",
      //     message: e.message,
      //   });
    } finally {
      //   Dialog.ProgressBar(false);
    }
  };

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      {/* FullCalendar 컴포넌트를 감싸는 div를 전체 화면 크기로 설정합니다. */}
      {/* <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        // initialView="dayGridMonth" // 초기 뷰 설정 (월별)
        events={[
          { title: "Event 1", date: "2024-02-01" },
          { title: "Event 2", date: "2024-02-10" },
        ]} // 표시할 이벤트 데이터
        height="100%" // FullCalendar의 높이를 100%로 설정합니다.
        locales="ko" // 한국어 locale 설정
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth",
        }}
      />
       */}
      <Calendar />
    </div>
  );
}

export default Home;
