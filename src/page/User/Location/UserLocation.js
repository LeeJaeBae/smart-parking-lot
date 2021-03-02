import React , { useState , useEffect } from 'react';
import { getFee } from '../../../api/user';
// import { getLocationCar } from '../../../api/user';

import styled from 'styled-components';
import './user_mycar.css';

import { Link, useLocation } from 'react-router-dom';
import { Route } from '../../../config/routes';
import axios from '../../../api/axios';



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


	// var fee = 100; // 현재요금 100원으로 계산
	const [fee , setFee] = useState(2000);

	const [data, setData] = useState([]);
	const [myCarLocation, setMyCarLocation] = useState('');
	const [myFee , setMyFee] = useState(9999); // 출차시간 - 입차시간 계산해서 넣을것
	const location = useLocation();

	useEffect(()=>{
		console.log(location.state.data)
		// location 안에 state가 있음
		getFee(setFee);
		location.state.data && setData(location.state.data)
	},[])

		// 현재요금 구하는 함수
	const getNowFee = (entryTime, fee) => {
		var entryTime = new Date(entryTime);
		var nowTime = new Date();
		var Interval = nowTime - entryTime;
		var elapsedHours = Math.floor(Interval / (1000 * 60 * 60));
		var nowFee = elapsedHours * fee;

		nowFee = nowFee.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	
		return nowFee;
	};

	useEffect(()=> {

		if(data.length > 0) {
			// 내 차 위치 찾기
			
			
			// 요금계산 ( 현재시간 - 출차시간 )
			console.log(data[0]['car_entry_time']);
			
			var entryTime = new Date(data[0]['car_entry_time']);
			var nowTime	  = new Date();
			var Interval  = nowTime - entryTime; // 현재와 입차 사이 간격
			var elapsedHours = Math.floor((Interval / (1000 * 60 * 60))); // 30일 기준이고 윤달을 고려하지 않아 부정확
			
			console.log("입차"+entryTime);
			console.log("현재"+nowTime);
			console.log("경과시간"+elapsedHours);
			setMyFee(getNowFee(entryTime , fee));

			console.log("내 차 위치 : " + data[1]+data[0]['car_parking_id']);
			setMyCarLocation(data[1]+data[0]['car_parking_id']);
		}

	} , [data])

	// {`${data[1]}`+`${data[0]['car_parking_id']}`}


	return (
		<>
			<Background>
				<Link to="/">
				<User_logo></User_logo>
				</Link> <br/>
				<div id='myCarLocation'>내 차 위치는 {`${myCarLocation}`}이며, 요금은 {`${myFee}`}원 입니다</div>
				<div id='Pmap'>　</div>
				<div id='button'>
					<Link to={Route.user.main}>
					<button
						select='main'
						id='searchAgain'
						className='buttons'>
						다시 검색하기
					</button>
					</Link>
					<button select='pay' id='pay' className='buttons' onclick="location.href='#'">
						결제하기
					</button>
				</div>
			</Background>
		</>
	);
};

export default MyCar;
