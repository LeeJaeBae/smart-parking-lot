import React, { useEffect, useState, useRef } from 'react';
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
	const refStart = useRef();
	const refEnd = useRef();
	const refNumberPlate = useRef();

	// 전체 주차 데이터
	const [allData, setAllData] = useState([]);
	const [endDate, setEndDate] = useState(new Date());
	const [startDate, setStartDate] = useState(new Date());
	// const [specifiedDuration, setSpecifiedDuration] = useState(1);

	// Component did mount ->
	useEffect(() => {
		getAdminTotalCarList(setAllData, getToday(), getToday());
		// refStart.current.value = new Date().toISOString().substring(0, 10);
		// refEnd.current.value = new Date().toISOString().substring(0, 10);
	}, []);
	// <- Component did mount

	// getToday
	const getToday = () => {
		return new Date().toISOString().substring(0, 10);
	};


	const setPeriod = (p) => {
		var period = 0;
		// e.preventDefault();
		// var specifiedDuration = 1;
		console.log('period : ' + p);
		switch (p) {
			case 'today':
				period = 0;
				break;
			case 'week':
				period = 7;
				break;
			case '1month':
				period = 30;
				break;
			case '3month':
				period = 90;
				break;
			case '6month':
				period = 180;
				break;
			default:
				period = 1;
		}

		// console.log(specifiedDuration);
		return period;
	};

	// 특정 기간 (1주, 1개월, 3개월, 6개월)
	const setInquiryPeriodData = (e) => {
		e.preventDefault();
		const periodText = e.target.value;
		const period = setPeriod(periodText);
		const start = new Date(new Date() - 1000 * 60 * 60 * 24 * period);
		setStartDate(start);
		setEndDate(new Date());
		refStart.current.value = start.toISOString().substring(0, 10);
		refEnd.current.value = new Date().toISOString().substring(0, 10);
		getAdminTotalCarList(setAllData, start, new Date());
	};

	// 사용자 지정기간
	const getAdminPeriodData = () => {
		refNumberPlate.current.value
			? getAdminTotalCarList(setAllData, startDate, endDate, refNumberPlate.current.value)
			: getAdminTotalCarList(setAllData, startDate, endDate);
	};

	const handleSetDate = (e) => {
		if (e.target === refStart.current) {
			// 시작 날짜
			setStartDate(new Date(e.target.value));
		} else {
			// 끝 날짜
			setEndDate(new Date(e.target.value));
		}
	};


	// 요금 천단위마다 , 찍는 포맷
	const setFeeFormat = (fee) => {
		return fee.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	};

	//////////////////////////////////////////////////////////
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
					<button
						className='alldata_btn'
						onClick={setInquiryPeriodData}
						value='today'
						name='period'>
						오늘
					</button>
					<button className='alldata_btn' onClick={setInquiryPeriodData} value='week' name='period'>
						1주일
					</button>
					<button
						className='alldata_btn'
						onClick={setInquiryPeriodData}
						value='1month'
						name='period'>
						1개월
					</button>
					<button
						className='alldata_btn'
						onClick={setInquiryPeriodData}
						value='3month'
						name='period'>
						3개월
					</button>
					<button
						className='alldata_btn'
						onClick={setInquiryPeriodData}
						value='6month'
						name='period'>
						6개월
					</button>
					<input
						className='alldata_date'
						onChange={handleSetDate}
						ref={refStart}
						type='date'
						name='startTime'
						defaultValue={new Date().toISOString().substring(0, 10)}
						max={endDate.toISOString().substring(0, 10)}
					/>
					~&nbsp;
					<input
						className='alldata_date'
						onChange={handleSetDate}
						ref={refEnd}
						type='date'
						name='endTime'
						defaultValue={new Date().toISOString().substring(0, 10)}
						min={startDate.toISOString().substring(0, 10)}
						max={new Date().toISOString().substring(0, 10)}
					/>
					<input
						ref={refNumberPlate}
						type='text'
						className='alldata_searchbox'
						name='numberPlate'
						placeholder='차번호를 입력하세요'
					/>
					<input
						type='button'
						onClick={getAdminPeriodData}
						className='alldata_search_btn'
						value='조회'
					/>
				</div>
			</div>
			<div>
				<table className='alldata_table'>
					<tr>
						<th style={LeftTHstyle}>날짜</th>
						<th>차번호</th>
						<th>입차</th>
						<th>출차</th>
						<th>요금</th>
						<th style={RightTHstyle}>결제</th>
					</tr>
					{/* 테이블 */}
					{allData.length > 0 ? (
						allData.map((car) => (
							<tr>
								<td>{car.car_entry_time.substring(0, 10)}</td> {/*날짜*/}
								<td>{car.car_number_plate}</td> {/*차번호*/}
								<td>{car.car_entry_time}</td> {/*입차*/}
								<td>{car.car_exit_time}</td> {/*출차*/}
								<td>
									{ car.car_fee ?
									setFeeFormat(car.car_fee) : car.car_fee
									}
								</td> {/*요금*/}
								<td>{car.car_payment_type}{/*결제유형*/}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={7}>조회 데이터가 없습니다.</td>
						</tr>
					)}
				</table>
			</div>
		</>
	);
};

export default AllParkingData;
