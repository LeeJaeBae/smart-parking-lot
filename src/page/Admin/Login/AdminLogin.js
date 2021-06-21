import React , { useState , useEffect, useRef , Dispatch } from 'react';
import { adminLogin } from '../../../api/admin';


// import { setAdminLogin } from '../../../api/admin';
import styled from 'styled-components';

// import axios from './axios';


import './admin_login.css';
import axios from 'axios';


const Background = styled.div`
	text-align: center;
	padding-top: 150px;
`;




const AdminLogin = ( props ) => { // 파라미터로 props 넣어줘야 로그인 후 처음화면으로 돌아갈 수 있음

    // const dispatch = useDispatch();

    const id = useRef();
    const pw = useRef();

    const [adminid, setAdminid] = useState("");
    const [adminpw, setAdminpw] = useState("");


    const [userInfo, setUserInfo] = useState(""); // 유저 정보 저장

	const handleLogin = (e) =>{
        // 값 유효성 체크
        if(adminid === "" || adminpw === "") {
            window.alert("아이디와 비밀번호를 입력해주세요");
            return;
        }

        adminLogin(adminid, adminpw);
	}

    const handleIDChange = (e) => {
        setAdminid(e.target.value);
        // console.log(adminid);
    }
    const handlePWChange = (e) => {
        setAdminpw(e.target.value);
        // console.log(adminpw)
    }

    // useEffect(() => { // 로그인정보 스토리지에 저장 / localStorage.setItem(keyName , keyValue )

	// 	window.localStorage.setItem('userInfo', userInfo);
	// }, [userInfo]);

    // 로그인 api 통해서 유저 정보 보내기

    // const { setUser } = useUserContext();
    
    // const handleLogin = async ({ id , password}) => {
    //     const { success, token } = await AdminLogin({ id, password });
    //     if (success) {
    //         Cookies.set('session' , token.spllit(' ')[1]);
            
    //         // 로그인 되었으면 페이지 이동
    //         props.history.push(`/어디로 보내지 ?`);
    //     }
    // }

	return (
		<Background>
        <div id='login_background'>
        <div id="login_logo"></div>
        <div id='login_explain'>
            Sumaro Administrator
        </div>
        <div id="login_box">
            <input 
                className="admin_loginbox" 
                type="text"
                ref={id} 
                onChange={handleIDChange}
                placeholder='이메일을 입력하세요'
            /><br/>
            <input
                className="admin_loginbox" 
                type="password" 
                ref={pw} 
                onChange={handlePWChange}
                placeholder='비밀번호를 입력하세요'
            /><br/>
            <button type='button' onClick={handleLogin} id="admin_loginbtn">LOGIN</button>
        </div>
        </div>
		</Background>
	);
};

export default AdminLogin;
