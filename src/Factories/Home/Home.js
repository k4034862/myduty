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
