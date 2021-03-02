import React , { useState , useEffect, useRef } from 'react';
import styled from 'styled-components';

// import axios from './axios';
import { getLocationCar , getFee } from '../../../api/user';

import { Link, Redirect  } from 'react-router-dom';
import { Route } from '../../../config/routes';

import './user_main.css';
import userlogo_img from '../../../style/img/user_logo.png';
import axios from 'axios';


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
	// 내 차 위치
	const [data, setData] = useState([]);
	const [searchText, setSearchText] = useState("");



	useEffect(() => {
		searchText !== "" && getLocationCar(setData, searchText)
	}, [searchText]);

	const text = useRef();
	const handleSearch = (e) =>{
		setSearchText(text.current.value);
	}

	// const isThereText = (searchText , data) => {
	// 	if( data != null && searchText !== "" ) {
	// 		alert("※ 차번호를 찾을 수 없습니다 ");
	// 		return ( <></> )
	// 	}
	// 	else {
	// 		return ( <></> )
	// 	}
	// }



	return (
		<Background>
			<UserLogo />
			<div>
				<div className='searchbox'>
					<input ref={text} type='text' id='searchMyCarNum' name='numberPlate' />
					<input onClick={handleSearch} type='button' id='search' value='　'/>
				</div>
			</div>
			{
				// 만약 data 값이 있을 경우 location으로 데이터를 전달하고
				// 검색값이 있으나 data가 없으면 존재하지 않는 차 번호라고 알람을 띄운다
				data.length > 0 ?
				<Redirect to={{pathname:`/location/${searchText}`, state:{data}}}  />
				:
				// isThereText(searchText , data)
				<></>
			} 
			<div id='congetion'>
				<Link to={Route.user.congestion}>주차장 혼잡도 확인하기</Link>
			</div>
			<div>
				<Link to={Route.admin.main}>admin</Link>
			</div>

		</Background>
	);
};

export default UserMain;
