import React , { useState , useEffect, useRef } from 'react';
import styled from 'styled-components';

// import axios from './axios';


import './admin_login.css';
import adminlogo_img from '../../../style/img/admin_logo.png';
import admin_main from '../../../style/img/admin_main_img.jpg';
import axios from 'axios';


const Background = styled.div`
	text-align: center;
	padding-top: 150px;
`;

const AdminMainImg = styled.div`
    width: 800px;
    height: 800px;
    background-size: contain;
    background-image: url(${admin_main});
    float: left;
`;

const AdminLogo = styled.div`
	margin: 0 auto;
	width: 200px;
	height: 150px;
	margin-bottom: 50px;
	background-image: url(${adminlogo_img});
	background-size: contain;
	background-repeat: no-repeat;
`;



const AdminLogin = () => {


	return (
		<Background>
            <AdminMainImg></AdminMainImg>
        <div id="right">
            <AdminLogo></AdminLogo>
            <div id="login_form">
                <>
                    <input type="text" name="admin_id" class="account admin_id" placeholder="ID"/> <br/>
                    <input type="text" name="admin_pw" class="account admin_pw" placeholder="PW"/> <br/>
                    <input type="submit" value="LOGIN" class="login_button"/>
                </>
            </div>
        </div>
		</Background>
	);
};

export default AdminLogin;
