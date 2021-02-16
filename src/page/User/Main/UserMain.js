import React from 'react';
import styled from 'styled-components';

import './user_main.css';
import userlogo_img from '../../../style/img/user_logo.png';

const Background = styled.div`
	text-align: center;
	padding-top: 150px;
`;

const UserLogo = styled.div`
	margin: 0 auto;
	width: 200px;
	height: 150px;
	margin-bottom: 50px;
	background-image: url(${userlogo_img});
	background-size: contain;
	background-repeat: no-repeat;
`;

const UserMain = () => {
	return (
		<Background>
			<UserLogo />
			<div>
				<form action='/location/ip/api/locationCar' method='GET'>
					<div className='searchbox'>
						<input type='text' id='searchMyCarNum' name='numberPlate' />
						<input type='submit' id='search' value='　' />
					</div>
				</form>
			</div>
			<div id='congetion'>
				<a href='/congetion/ip/api/checkSpace'>주차장 혼잡도 확인하기</a>
			</div>
		</Background>
	);
};

export default UserMain;
