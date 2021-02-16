import React from 'react';
import styled from 'styled-components';

import './user_mycar.css';

import userlogo_img from '../../../style/img/user_logo.png';

const Background = styled.div`
	text-align: center;
	padding-top: 100px;
`;

const User_logo = styled.div`
	margin: 0 auto;
	width: 120px;
	height: 90px;
	margin-bottom: 30px;
	background-image: url(${userlogo_img});
	background-size: contain;
	background-repeat: no-repeat;
`;

const MyCar = () => {
	return (
		<>
			<Background>
				<User_logo>{/* <img src={userlogo_img} alt="로고이미지"/> */}</User_logo>
				{/* <div id="user_logo">
                <img src={userlogo_img} alt="로고이미지"/>
            </div> */}
				<div id='myCarLocation'>내 차 위치는 ## 이며, 요금은 ##원 입니다</div>
				<div id='Pmap'>(주차장 약도 들어갈 자리)</div>
				<div id='button'>
					<button
						select='main'
						id='searchAgain'
						className='buttons'
						onclick="location.href='메인페이지주소'">
						다시 검색하기
					</button>
					<button select='pay' id='pay' className='buttons' onclick="location.href='#'">
						결제하기
					</button>
				</div>
			</Background>
		</>
	);
};

export default MyCar;
