import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // FullCalendar React 컴포넌트
import dayGridPlugin from '@fullcalendar/daygrid'; // 달 그리드 플러그인
import './Home.css';
import Calendar from '../../Component/Calendar/Calendar';
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
        <div style={{ width: '100%', height: '90vh' }}>
            <Calendar />
        </div>
    );
}

export default Home;
