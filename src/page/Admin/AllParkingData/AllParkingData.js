import React , { useEffect , useState , useRef } from 'react';
import './admin_AllParkingData.css';
import { getAdminTotalCarList } from '../../../api/admin';
import userEvent from '@testing-library/user-event';
// import axios from '../../../api/axios';

/**
 * AllParkingData
 *
 * @todo api :: 날짜 -> 차량 데이터
 * request :: startTime , endTime (date, yyyy-mm-dd)
 * response :: totalCarList (json)
 */
const AllParkingData = () => {
	

	let week = 7;
	let month1 = 30;
	let month3 = 90;
	let month6 = 180;


	// 전체 주차 데이터
	const [allData , setAllData] = useState([]);
	var start = new Date();
	const [endDate , setEndDate] = useState(new Date());
	const [startTime , setStartTime] = useState(new Date());

	// date에서 날짜만 뽑아오는 함수 (yyyy-mm-dd)
	const getDateOfUsed = (date) => {
		var DateOfUsed = "";
		var date = new Date(date);
		DateOfUsed += date.getFullYear() + "-";
		(date.getMonth() + 1) < 10 ?
			DateOfUsed += "0" + (date.getMonth() + 1) + "-" : DateOfUsed += date.getMonth() + 1 + "-";
		(date.getDate()) < 10 ?
			DateOfUsed += "0" + date.getDate() : DateOfUsed += date.getDate();

		return DateOfUsed;
	}


	// const period = useRef();
	const [specifiedDuration , setSpecifiedDuration] = useState(1);

	const setPeriod = (p) => {
		var period = 0;
		// e.preventDefault();
		// var specifiedDuration = 1;
		console.log("period : "+p);
		switch(p) {
			case "today" :
				period = 1;
				break;
			case "week" :
				period = 7;
				break;
			case "1month" :
				period = 30;
				break;
			case "3month" :
				period = 90;
				break;
			case "6month" :
				period = 800;
				break;
			default :
				period = 1;
		}

		// console.log(specifiedDuration);
		return period;
	}

	// useEffect(() => {
	// 	// setStartTime(start);
	// 	getAdminTotalCarList(setAllData , startTime , endDate);
	// 	console.log(allData);
	// }, [startTime])

	const refStart = useRef();
	const refEnd   = useRef();

	// 특정 기간 (1주, 1개월, 3개월, 6개월)
	const setInquiryPeriodData = (e) => {
		e.preventDefault();

		const periodText = e.target.value;
		const period = setPeriod(periodText);
		// var duration = setPeriod();
		// console.log(new Date());
		start = new Date(endDate - (1000 * 60 * 60 * 24) * period); //
		
		// console.log("시작 : " + start);
		// console.log("끝 : " + endTime);


		getAdminTotalCarList(setAllData , start , endDate);
		// setStartTime(start);
		
	}

	// 사용자 지정기간
	const getAdminPeriodData = () => {
		setStartTime(refStart.current.value);
		setEndDate(refEnd.current.value);
		getAdminTotalCarList(setAllData , startTime , endDate);
	}
	




	const LeftTHstyle = {
		borderTopLeftRadius: '10px',
		borderBottomLeftRadius: '10px',
	};

	const RightTHstyle = {
		borderTopRightRadius: '10px',
		borderBottomRightRadius: '10px',
	};

	return (
		<>
			<div className='alldata_search_option'>
				<div className='alldata_form'>
					<button className='alldata_btn' onClick={setInquiryPeriodData} value='today' name='period'>
						오늘
					</button>
					<button className='alldata_btn' onClick={setInquiryPeriodData} value='week' name='period'>
						1주일
					</button>
					<button className='alldata_btn' onClick={setInquiryPeriodData} value='1month' name='period'>
						1개월
					</button>
					<button className='alldata_btn' onClick={setInquiryPeriodData} value='3month' name='period'>
						3개월
					</button>
					<button className='alldata_btn' onClick={setInquiryPeriodData} value='6month' name='period'>
						6개월
					</button>
					<input className='alldata_date' ref={refStart} type='date' name='startTime' />
					~&nbsp;
					<input className='alldata_date' ref={refEnd} type='date' name='endTime' />
					<input
						type='text'
						className='alldata_searchbox'
						name='numberPlate'
						placeholder='차번호를 입력하세요'
					/>
					<input type='button' onClick={getAdminPeriodData} className='alldata_search_btn' value='조회' />
				</div>
			</div>
			<div>
				<table className='alldata_table'>
					<tr>
						<th style={LeftTHstyle}>날짜</th>
						<th>구역</th>
						<th>차번호</th>
						<th>입차</th>
						<th>출차</th>
						<th>요금</th>
						<th style={RightTHstyle}>결제</th>
					</tr>
					{/* 테이블 */}
					{allData &&
						allData.map((car) => (
							<tr>
								<td>{getDateOfUsed(car.car_entry_time)}</td> {/*날짜*/}
								{/* console.log(new Date(car.car_entry_time).getDay); */}
								<td>{car.car_parking_id}</td> {/*구역(자리번호)*/} 
								<td>{car.car_number_plate}</td> {/*차번호*/} 
								<td>{car.car_entry_time}</td> {/*입차*/} 
								<td>{car.car_exit_time}</td> {/*출차*/} 
								<td>{car.car_fee}</td> {/*요금*/} 
								<td>{car.car_payment_type} {/*결제유형*/}</td>
							</tr>
						))}
				</table>
			</div>
		</>
	);
};

export default AllParkingData;
