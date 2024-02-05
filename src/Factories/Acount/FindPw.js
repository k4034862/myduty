import React from 'react';
import { useNavigate } from 'react-router-dom';
import FindPwView from '../../Views/Acount/FindPw';
import { Snackbar } from '../../Component/Snackbar';
import axios from 'axios';
function FindPw(props) {
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
    //비밀번호 찾기 버튼 API
    const FindPwBtn = async () => {
        let getData = new URLSearchParams({
            USER_NM: inputs.userNm,
            USER_ID: inputs.userId,
            USER_EMAIL: inputs.email,
            USER_TEL: inputs.userTel,
        });
        await axios
            .get('/findPw', {
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
                        message: '비밀번호는 ' + e.data[0].password + '입니다.',
                    });
                }
            })
            .catch((e) => {
                console.log('error', e);
            });
    };
    return (
        <div className="FindPw">
            <FindPwView inputs={inputs} setInputs={setInputs} FindPwBtn={FindPwBtn} />
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
export default FindPw;
