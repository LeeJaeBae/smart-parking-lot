import React , { useState , useEffect , useContext , createContext , useReducer } from 'react';
import { getFee , payReady , payResult } from '../../../api/user';
// import { getLocationCar } from '../../../api/user';

import styled from 'styled-components';
import './user_mycar.css';

import { Link, useLocation , Redirect } from 'react-router-dom';
import { Route } from '../../../config/routes';
import axios from '../../../api/axios';



import userlogo_img from '../../../style/img/sumaro_circle.png';
import { UserLocation } from '..';

const Background = styled.div`
	text-align: center;
	padding-top: 130px;
`;

const User_logo = styled.div`
	margin: 0 auto;
	width: 120px;
	height: 120px;
	margin-bottom: 30px;
	background-image: url(${userlogo_img});
	background-size: contain;
	background-repeat: no-repeat;
`;


	

const MyCar = ( props ) => {



	// var fee = 100; // 현재요금 100원으로 계산
	const [fee , setFee] = useState(1000);

	const [data, setData] = useState([]);
	const [myCarLocation, setMyCarLocation] = useState('TEST위치');
	const [myFee , setMyFee] = useState(10); // 출차시간 - 입차시간 계산해서 넣을것

	// pathname에서 차번호를 가져옴
	const location = useLocation();
	console.log(location);
	const numberPlate = ((location.pathname).split('/'))[2];
	console.log('차번호 :: '+numberPlate)

	// 차번호, 요금정보 전송
	

	useEffect(()=>{
		console.log(location.state.data)
		// location 안에 state가 있음
		getFee(setFee);
		location.state.data && setData(location.state.data)
	},[])

	//현재요금 구하는 함수
	const getNowFee = (entryTime, fee) => {
		var entryTime = new Date(entryTime);
		var nowTime = new Date();
		var Interval = nowTime - entryTime;
		var elapsedHours = Math.floor(Interval / (1000 * 60 * 60) + 1);
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
			// setMyFee(getNowFee(entryTime , fee));
			setMyFee(getNowFee(entryTime , fee)); // 테스트요금

			console.log("내 차 위치 : " + data[1]+data[0]['car_parking_id']);
			setMyCarLocation(data[1]+data[0]['car_parking_id']);
		}

	} , [data])

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
	// api 없이,, 테스트 해보쟈 ,,,

	// var param = {
	// 	next_redirect_pc_url: "",
	// 	tid: "",
		
	// 	  cid: "TC0ONETIME",
	// 	  partner_order_id: "partner_order_id",
	// 	  partner_user_id: "partner_user_id",
	// 	  item_name: "스마로",
	// 	  quantity: 1,
	// 	  total_amount: 100,
	// 	  vat_amount: 10,
	// 	  tax_free_amount: 0,
	// 	  // router에 지정한 PayResult의 경로로 수정
	// 	  approval_url: "http://localhost:3000/payresult",
	// 	  fail_url: "http://localhost:3000/payresult",
	// 	  cancel_url: "http://localhost:3000/payresult",
		
	//   }

	// const [parameter , setParameter ] =  useState({
	// 	next_redirect_mobile_url: "",
	// 	tid: "",
	// 	params: {
	// 	  cid: "TC0ONETIME",
	// 	  partner_order_id: "partner_order_id",
	// 	  partner_user_id: "partner_user_id",
	// 	  item_name: "스마로",
	// 	  quantity: 1,
	// 	  total_amount: 100,
	// 	  vat_amount: 10,
	// 	  tax_free_amount: 0,
	// 	  // router에 지정한 PayResult의 경로로 수정
	// 	  approval_url: "http://localhost:3000/payresult",
	// 	  fail_url: "http://localhost:3000/payresult",
	// 	  cancel_url: "http://localhost:3000/payresult",
	// 	}
	//   });

	// useEffect (()=> {
	// 	const param = parameter;
	// 	console.log(param);
	// 	axios.post(`/v1/payment/ready`, null, {
	// 		headers: {
	// 			Authorization: "KakaoAK 61ba2289c1c4f8b0fb0f53eb2ae8cf41", // admin 키
	// 			"Content-type": "application/x-www-form-urlencoded;charset=utf-8",
	// 		},
	// 		params : {
	// 			param
	// 		}
	// 	}

	// 	  ).then((response) => {
	// 		const {
	// 		  data: { next_redirect_mobile_url, tid },
	// 		} = response;
	  
	// 		// console.log(next_redirect_pc_url);
	// 		console.log('tid : ' + tid);
	// 		// localstorage에 tid 저장
	// 		window.localStorage.setItem("tid", tid);
	// 		setData({ next_redirect_mobile_url, tid }); // 모바일 웹일 경우 next_redirect_mobile_url
	// 	  });
	// }, []);

	// console.log(data);



	
	return (
		<>
			<Background>
				<Link to="/">
				<User_logo></User_logo>
				</Link> <br/>
				<div id='myCarLocation'>내 차 위치는 {`${myCarLocation}`}이며, &nbsp;
				요금은 {`${myFee}`}원 입니다</div>
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
					<Link to ={{
						pathname: Route.user.payready,
						state : { 
							fee : myFee ,
							numberPlate : numberPlate
						}
						}}>
					<button
						select='pay'
						id='pay'
						className='buttons'
					>
						결제하기
					</button>
					</Link>
					
				</div>
			</Background>
		</>
	);
};

export default MyCar;


