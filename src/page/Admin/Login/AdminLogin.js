import React , { useState , useEffect, useRef } from 'react';
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

    // useEffect(() => {
    //     setAdminid(id);
    // }, [id]);

    // const onIdHandler = (e) => {
    //     setAdminid(e.current.value);
    // }

    // const onPwHandler = (e) => {
    //     setAdminpw(e.current.value);
    // }

    // const onSubmitHandler = (e) => {
    //     e.preventDefault();

    // }
 
    const [userInfo, setUserInfo] = useState(""); // 유저 정보 저장

	const handleSubmit = (e) =>{


        if(adminid !== "" && adminpw !== "") {
            alert('제대로해..');
            AdminLogin(adminid, adminpw);
        }
        else {
            alert("아이디 또는 비밀번호를 입력하세요");
        }
	}

    const handleIDChange = (e) => {
        setAdminid(e.target.value);
    }
    const handlePWChange = (e) => {
        setAdminpw(e.target.value);
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
                placeholder='ID'
            /><br/>
            <input
                className="admin_loginbox" 
                type="password" 
                ref={pw} 
                onChange={handlePWChange}
                placeholder='PW'
            /><br/>
            <button onClick={handleSubmit} id="admin_login">LOGIN</button>
        </div>
        </div>
		</Background>
	);
};

export default AdminLogin;
