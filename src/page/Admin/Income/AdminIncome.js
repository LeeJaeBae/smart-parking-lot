import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'; // chart.js import
import { getAdminFeeGraph } from '../../../api/admin';
import './admin_income.css';

import chart from './IncomeChart';
// import { data } from './IncomeChart';

/**
 * Income
 * @todo api :: 기간 보내주고 -> 차트데이터
 */

const options = {
	scales: {
		yAxes: [
			{
				ticks: {
					beginAtZero: true,
				},
			},
		],
	},
};

// 	// false : 사용자 정의 크기에 따라 그래프 크기가 결정됨.
// 	// true : 크기가 알아서 결정됨.
// 	maintainAspectRatio: false

const data = {
	labels: ['1', '2', '3', '4', '5', '6'],
	datasets: [
		{
			label: '주차요금',
			data: [12, 19, 3, 5, 2, 3],
			fill: false,
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: 'rgba(255, 99, 132, 0.2)',
		},
	],
};

////////////////////////

const Income = () => {
	var start = new Date();
	const [endDate, setEndDate] = useState(new Date());
	const [startDate, setStartDate] = useState(new Date());

	const [feeData, setFeeData] = useState([]);
	const [total, setTotal] = useState(0);
	var totalIncome = 0;

	// useEffect(() => {
	// 	getAdminFeeGraph(setFeeData);
	// 	// console.log(feeData);
	// }, []);

	useEffect(() => {
		console.log(feeData);
		// setTotal(0);
		feeData.length !== 0 && feeData.map((fee) => (totalIncome += fee.fee_day));
		console.log(totalIncome);
		setTotal(totalIncome);
	}, [feeData]);

	// 지정 기간에 따라 변수 값 변경
	const setPeriod = (p) => {
		var period = 0;
		// e.preventDefault();
		// var specifiedDuration = 1;
		console.log('period : ' + p);
		switch (p) {
			case 'today':
				period = 1;
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
			case '1year':
				period = 800;
				break;
			default:
				period = 1;
		}

		// console.log(specifiedDuration);
		return period;
	};

	// 수입 데이터 가져오기
	const getFeeData = (e) => {
		e.preventDefault();

		const periodText = e.target.value;
		const period = setPeriod(periodText);
		// var duration = setPeriod();
		// console.log(new Date());
		start = new Date(endDate - 1000 * 60 * 60 * 24 * period); //

		// console.log("시작 : " + start);
		// console.log("끝 : " + endTime);

		getAdminFeeGraph(setFeeData, start, endDate);
		// setStartTime(start);
	};

	return (
		<>
			{/* 기간 설정 */}
			<div className='period_income'>
				<div className='setPeriod'>
					<div className='income_form'>
						{/* 지정 날짜 기간 계산해서 넘기기 */}
						{/* <button onClick={getFeeData} className='income_btn' value='today' name='period'>
							오늘
						</button> */}
						<button onClick={getFeeData} className='income_btn' value='week' name='period'>
							1주일
						</button>
						<button onClick={getFeeData} className='income_btn' value='1month' name='period'>
							1개월
						</button>
						<button onClick={getFeeData} className='income_btn' value='3month' name='period'>
							3개월
						</button>
						<button onClick={getFeeData} className='income_btn' value='6month' name='period'>
							6개월
						</button>
						<button onClick={getFeeData} className='income_btn' value='1year' name='period'>
							1년
						</button>
						<input
							className='income_btn'
							type='date'
							style={{ width: '160px' }}
							defaultValue={new Date().toISOString().substring(0, 10)}
							onChange={(e) => {
								setEndDate(new Date(e.target.value));
							}}
						/>
					</div>
				</div>
				<div className='income'>총 수입 {total}원</div>
				<br />
			</div>
			{/* 차트 */}
			<div className='chart'>
				<Line id='test' data={data} options={options} />
			</div>
		</>
	);
};

export default Income;
