import React , { useState , useEffect, useRef } from 'react';
import styled from 'styled-components';

// import axios from './axios';
import { getLocationCar , getAutoCompleteData } from '../../../api/user';

import { Link, Redirect  } from 'react-router-dom';
import { Route } from '../../../config/routes';

import './user_main.css';
import userlogo_img from '../../../style/img/sumaro_circle.png';
import axios from 'axios';

import SearchPreview from './AutoComplete';


const Background = styled.div`
	text-align: center;
	padding-top: 15px;
	width: 414px;
	height: 736px;
	margin: 0 auto;
	text-align: center;
`;

const UserLogo = styled.div`
	margin: 0 auto;
	width: 153px;
	height: 150px;
	margin-bottom: 30px;
	background-image: url(${userlogo_img});
	background-size: contain;
	background-repeat: no-repeat;
`;

// 검색 자동완성 렌더링



const UserMain = () => {
	// 내 차 위치
	const [data, setData] = useState([]);
	const [searchText, setSearchText] = useState("");

	

	useEffect(() => {
		searchText !== "" && getLocationCar(setData, searchText)
	}, [searchText]);

	const text = useRef();

	// 입력키워드 검색
	const handleSearch = (e) =>{
		setSearchText(text.current.value);
	}



	// 검색어 자동완성 관련/////////////////////// =>
	const [autoCompleteData , setAutoCompleteData] = useState(null);

	const handleGetAutoComplete = () => {
		// 자동완성 데이터 api

		console.log(text.current.value)
		getAutoCompleteData(text.current.value , setAutoCompleteData);

		console.log(autoCompleteData);
	}
	


	const testRef = useRef();

	// 자동완성 검색
	const handleCompleteSearchText = (e) => {
		console.log(e.target.innerText.slice(0,7));
		text.current.value = e.target.innerText.slice(0,7);

		setSearchText(text.current.value)

		
	}
	// useEffect(() => {
		 
	// }, [text.current.value]);
	// 검색어(text.curren.value) 값 바뀜 -> useEffect/onChange와 api를 이용해 자동완성 데이터 가져옴 ->
	// setAutoCompleteData에 데이터 저장 -> useEffect를 이용해 자동완성 데이터 렌더링

	return (
		<Background>
			<div id='link_to_admin'>
				<Link to={Route.admin.login}>admin▶</Link>
			</div>
			<UserLogo />
			<div>
				<div id='congetion'>
					<Link to={Route.user.congestion}>주차장 혼잡도 확인하기</Link>
				</div>
				<div className='searchbox'>
					<input
					ref={text} 
					onChange={handleGetAutoComplete} 
					type='text' 
					id='searchMyCarNum' 
					name='numberPlate'
					placeholder='전체 차번호 또는 뒤4자리를 입력하세요'
				/>
					<input 
						onClick={handleSearch} type='button' id='search' value='　'
					/>
				</div>
			</div>
			<div>
				{
					autoCompleteData === null ?
					<></> :
					autoCompleteData.map(index => 
						<div className='auto_search_box' ref={testRef}
						onClick={handleCompleteSearchText}>
						<span className='auto_numberPlate'>
							{index.car_number_plate}
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							{index.car_entry_time.substr(11, 5)}
						</span>
						{/* <span className='auto_entrytime'>
							{index.car_entry_time.substr(11, 5)}
						</span> */}
						</div>
						// 차번호 car_number_plate , 입차시각 car_entry_time
					)
				}
				{/* car_number_plate , car_entry_time */}
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

			

		</Background>
	);
};



export default UserMain;



