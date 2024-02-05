import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeView from '../../Views/Home/Home';
import { Snackbar } from '../../Component/Snackbar';
import axios from 'axios';
function Home(props) {
    const navigate = useNavigate(); //Route move api
    const [snacks, setSnacks] = React.useState({
        type: 'info',
        open: false,
        message: '',
    });
    //Login 변수
    const [inputs, setInputs] = React.useState({
        userId: '',
        userNm: '',
        email: '',
        userTel: '',
    });
    //시간표 불러오기 API
    const ScheduleSelect = async () => {
        let getData = new URLSearchParams({
            USER_NM: inputs.userNm,
            USER_EMAIL: inputs.email,
            USER_TEL: inputs.userTel,
        });
        await axios
            .get('/findId', {
                headers: {
                    'Content-Type': `application/json`,
                },
                params: getData,
            })
            .then((e) => {
                console.log(e.data);
                if (e.data.length === 0) {
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
                        message: '아이디는 ' + e.data[0].user_ID + '입니다.',
                    });
                }
            })
            .catch((e) => {
                console.log('error', e);
            });
    };
    return (
        <div className="FindId">
            <HomeView inputs={inputs} setInputs={setInputs} />
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
export default Home;
