import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import './user_error.css';

import userlogo_img from '../../../style/img/user_logo.png';
import error_img from '../../../style/img/error.png';

const Background = styled.div`
	text-align: center;
	padding-top: 100px;
`;

const User_logo = styled.div`
	margin: 0 auto;
	width: 160px;
	height: 120px;
	margin-bottom: 50px;
	background-image: url(${userlogo_img});
	background-size: contain;
	background-repeat: no-repeat;
`;

const UserError = () => {
	return (
		<>
			<Background>
				<User_logo></User_logo>
				<div id='error_img'>
					<img src={error_img} alt='error_img' />
				</div>
				<div id='texting'>
					<div>위치를 조회할 수 없습니다</div>
					<div>※ 지속 조회 불가 시 관리자 문의 바랍니다</div>
				</div>
				<div>
					<Link to='/'>
						<button id='searchAgain' onclick="location.href='메인페이지 주소'">
							다시 검색하기
						</button>
					</Link>
				</div>
			</Background>
		</>
	);
};

export default UserError;
