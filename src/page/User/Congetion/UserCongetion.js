import React, { useReducer, useEffect, useCallback } from 'react';
import styled from 'styled-components';

// 라우트
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

// css
import './user_congetion.css';

// img
import userlogo_img from '../../../style/img/user_logo.png';
import areaA from '../../../style/img/map_areaA.png';
import areaB from '../../../style/img/map_areaB.png';
import areaC from '../../../style/img/map_areaC.png';
import areaD from '../../../style/img/map_areaD.png';

const Background = styled.div`
	text-align: center;
	padding-top: 10px;
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

// function reducer(state, action) {
//     Switch(action.type) {
//         case 'Loading' :
//             return { };
//     }
// }

const UserCongetion = () => {
	return (
		<>
			<Background>
				<Link to='/'>
					{' '}
					<User_logo></User_logo>{' '}
				</Link>
				<span id='space'>현재 ## 대 주차가능 </span>
				<span id='waiting'>┃ 평균 대기시간 ## 분</span>

				<div id='area'>
					<div className='areas'>
						<div className='text'>
							<div className='areaName A'>A 구역</div>
							<div className='numOfSpace'> ##대 주차 가능</div>
						</div>
						<span className='map'>
							<img src={areaA} alt='약도' />
						</span>
					</div>
					<div className='areas'>
						<div className='text'>
							<div className='areaName B'>B 구역</div>
							<div className='numOfSpace'> ##대 주차 가능</div>
						</div>
						<span className='map'>
							<img src={areaB} alt='약도' />
						</span>
					</div>
					<div className='areas'>
						<div className='text'>
							<div className='areaName C'>C 구역</div>
							<div className='numOfSpace'> ##대 주차 가능</div>
						</div>
						<span className='map'>
							<img src={areaC} alt='약도' />
						</span>
					</div>
					<div className='areas'>
						<div className='text'>
							<div className='areaName D'>D 구역</div>
							<div className='numOfSpace'> ##대 주차 가능</div>
						</div>
						<span className='map'>
							<img src={areaD} alt='약도' />
						</span>
					</div>
				</div>
			</Background>
		</>
	);
};

export default UserCongetion;
