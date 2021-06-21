import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2'; // chart.js import
import { getAdminFeeGraph, getFeeDataLabeledByWeek , getFeeDataLabeledByMonth , setAdminFee, getFee } from '../../../api/admin';
// import CurrentPList from '../CurrentParkingList/AdminCurrentParkingList';
import './admin_income.css';
import useModal from '../../../template/modal/useModal';

// import chart from './IncomeChart';
// import { data } from './IncomeChart';

/**
 * Income
 * @todo api :: 기간 보내주고 -> 차트데이터
// 기간 설정에 따라 startDate와 endDate 날짜 변경 (기간은 체크박스로)
// 좌우버튼을 누르면 startDate와 endDate 날짜 계산해주기 (ex : new Date() - 1000 * 60 * 60 * 24 * period)
// 일단위로 출력 : 일주일, 1개월
// 주단위로 출력 : 1개월
// 월단위로 출력 : 6개월, 1년
// 토막 낼 기간을 지정(일주일, 1달, 1년) -> 체크박스로
// ex) 일주일을 선택하고 2월26일을 지정할 경우 : 2/19~26 데이터
// ex) 1개월을 선택하고 1/31을 지정할 경우 : 1/1~1/31 데이터
// ex) 1년을 선택하고 1/1을 지정할 경우 : 365일 전부터의 데이터
// 단위 당 수입 평균값을 구해서 차트 데이터로 넣기
// 해당기간 데이터 가져오기 -> 쪼개서 배열로 넣기(데이터값) -> 
// 필요한 배열 : 각 날짜별 요금 총합 배열(data), 날짜 배열(label), 
 */

////////////////////////

const Income = () => {
	const [chartDataList, setChartDataList] = useState([]); // 차트 데이터 배열
	const [chartLabelList, setChartLabelList] = useState([]);
	const [openModal, closeModal, Modal] = useModal();

	const chartData = [];
	const chartLabel = [];

	const refEnd = useRef();
	const refStart = useRef();

	const refFee = useRef();
	const [fee, setFee] = useState(1000);
	// 차트
	// const drawChart = (period) => {
	// 	// feeData.length > 0 ?

	// 	switch (period) {
	// 		case 7 : // 일주일
	// 			period = 1;
	// 			break;
	// 		case 30 : // 1개월
	// 			period = 7;
	// 			break;
	// 		case 365 : // 1년
	// 			period = 30;
	// 			break;
	// 		default:
	// 			period = 1;
	// 	}

	// }

	const options = {
		// 차트의 옵션
		maintainAspectRatio: true, // 차트 크기를 상위 div에 구속?
		responsive: true, // 차트의 크기 자동조절?
		// tooltips: {
		// 	mode: 'index',
		// 	intersect: false,
		// },
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true, // 차트의 Y축이 0부터 시작하는가?
					},
				},
			],
		},
	};

	// 	// false : 사용자 정의 크기에 따라 그래프 크기가 결정됨.
	// 	// true : 크기가 알아서 결정됨.
	// 	maintainAspectRatio: false

	const data = {
		// 차트 내 데이터, 라벨, 스타일 등
		labels: chartLabelList,
		datasets: [
			{
				label: '주차요금',
				data: chartDataList,
				fill: false,
				backgroundColor: 'rgb(255, 138, 0)',
				borderColor: 'rgba(255, 138, 0, 0.3)',
				borderWidth: 2,
				pointRadius: 2,
				lineTension: 0,
			},
		],
	};

	var start = new Date();
	const [endDate, setEndDate] = useState(new Date());
	const [startDate, setStartDate] = useState(new Date(new Date() - 1000 * 60 * 60 * 24 * 7));
	// const [startDate, setStartDate] = useState(new Date());

	const [feeData, setFeeData] = useState([]);
	const [usePeriod, setUsePeriod] = useState('day');
	const [total, setTotal] = useState(0);
	var totalIncome = 0;

	// 최초 데이터 로드
	useEffect(() => {
		getFee(setFee);
		handleGetData();
		// console.log('요금 받아왔음');
	}, []);

	// useEffect(() => {
		// getFee(setFee);
		// handleGetData();
		// console.log('요금 받아왔음');
		// refFee.current.value = fee;
	// }, [fee]);

	useEffect(() => {
		// console.log(feeData);
		// setTotal(0);
		console.log('usePeriod : ' + usePeriod);
		// map을 이용해 데이터(총 요금)&라벨(날짜) 배열에 추가
		
		if(usePeriod === 'day') { // 일별로 출력
			feeData.length !== 0 &&
			feeData.map(
				(fee) => (
					(totalIncome += fee.fee_day),
					chartData.push(fee.fee_day),
					// console.log(typeof fee.fee_day),
					chartLabel.push(fee.fee_date)
				)
			);
		}
		else if(usePeriod === 'week') { // 주별로 출력
			if(feeData.length !== 0) {
				for(var i = 0 ; i < feeData.length ; i++) {
					var label = '';
					totalIncome += feeData[i].fee_day;
					chartData.push(feeData[i].fee_day);
					label += feeData[i].fee_start_date+'~';
					label += feeData[i].fee_end_date;
					chartLabel.push(label);
				}
			}
			// feeData.length !== 0 &&
			// feeData.map(
			// 	(fee) => (
			// 		(totalIncome += fee.fee_day),
			// 		chartData.push(fee.fee_day),
			// 		// console.log(typeof fee.fee_day),
			// 		label += fee.fee_start_date,
			// 		chartLabel.push(label)
			// 	)
			// );
		}
		else if(usePeriod === 'month') { // 월별로 출력
			if(feeData.length !== 0) {
				for(var i = 0 ; i < feeData.length ; i++) {
					totalIncome += feeData[i].fee_day;
					chartData.push(feeData[i].fee_day);
					// chartLabel.push(feeData[i].fee_start_date);
					
					feeData[i].fee_date.substring(8, 10) === '01' ?
					chartLabel.push(feeData[i].fee_date.substring(0, 7))
					:
					chartLabel.push(feeData[i].fee_date.substring(0, 10))
				}
			}

			// feeData.length !== 0 &&
			// feeData.map(
			// 	(fee) => (
			// 		(totalIncome += fee.fee_day),
			// 		chartData.push(fee.fee_day),
			// 		// console.log(fee.fee_date),
			// 		chartLabel.push(fee.fee_date + '')
			// 		fee.fee_date.toISOString().substring(8, 0) === '01' ?
			// 		chartLabel.push(fee.fee_date.toISOString().substring(0, 7))
			// 		:
			// 		chartLabel.push(fee.fee_date)
			// 	)
			// );
		}


		// feeData.length !== 0 &&
		// 	feeData.map(
		// 		(fee) => (
		// 			(totalIncome += fee.fee_day),
		// 			chartData.push(fee.fee_day),
		// 			// console.log(typeof fee.fee_day),
		// 			chartLabel.push(fee.fee_date)
		// 		)
		// 	);

		// console.log(totalIncome);
		// console.log(chartData);
		// console.log(chartLabel);

		// 차트데이터 날짜 오름차순으로 정렬
		// for (var a = 0; a < chartLabel.length; a++) {
		// 	for (var b = a + 1; b < chartLabel.length; b++) {
		// 		// console.log(typeof(chartData[a]));
		// 		if (new Date(chartLabel[a]) > new Date(chartLabel[b])) {
		// 			var tmp = chartLabel[a];
		// 			chartLabel[a] = chartLabel[b];
		// 			chartLabel[b] = tmp;

		// 			tmp = chartData[a];
		// 			chartData[a] = chartData[b];
		// 			chartData[b] = tmp;

		// 			console.log(new Date(chartData[a]));
		// 			console.log(chartLabel[a]);
		// 		}
		// 	}
		// }

		setTotal(totalIncome);
		setChartDataList(chartData);
		setChartLabelList(chartLabel);
	}, [feeData]);

	// input date 값 변경하기
	const handleChangeDate = (e) => {
		console.log('input date : ' + e.target.value);

		if (e.target === refStart.current) {
			setStartDate(new Date(e.target.value));
		} else {
			setEndDate(new Date(e.target.value));
		}

		// if(e.target === refEnd.curren)
	};

	// if(feeData.length > 0) { // 차트 데이터와 라벨 지정
	// 	chartData.push(feeData.map((fee) => (fee.fee_day)));
	// 	chartLabel.push(feeData.map((fee) => (fee.fee_date)));
	// 	console.log(chartData);
	// 	console.log(chartLabel);
	// 	setChartDataList(chartData);
	// 	setChartLabelList(chartLabel);
	// }

	// 기간선택 & 데이터 가져오기 - 버튼
	const setPeriod = (p) => {
		var period = 0;
		// e.preventDefault();
		// var specifiedDuration = 1;
		console.log('period : ' + p);
		switch (p) {
			case 'week':
				period = 7;
				break;
			case '1month':
				period = 30;
				break;
			// case '3month':
			// 	period = 90;
			// 	break;
			case '6month':
				period = 180;
				break;
			case 'year':
				period = 365;
				break;
			default:
				period = 7;
		}

		return period;
	};
	const handleGetDataBtn = (e) => {
		e.preventDefault();
		const periodText = e.target.value;
		const period = setPeriod(periodText);
		const start = new Date(new Date() - 1000 * 60 * 60 * 24 * period);
		console.log(period+'일 전부터');
		setStartDate(start);
		setEndDate(new Date());
		refStart.current.value = start.toISOString().substring(0, 10);
		refEnd.current.value = new Date(new Date() - 1000 * 60 * 60 * 24).toISOString().substring(0, 10);

		// var dateDifference = (new Date() - start) / 1000 * 60 * 60 * 24;
		// console.log(dateDifference);

		if(period === 7 || period === 30) {
			setUsePeriod('day');
			getAdminFeeGraph(setFeeData, start, endDate);
		}
		else if(period == 180) {
			setUsePeriod('week');
			console.log('dfdfdfae')
			getFeeDataLabeledByWeek(setFeeData, start, endDate);
		}
		else {
			setUsePeriod('month');
			getFeeDataLabeledByMonth(setFeeData, start, endDate);
		}

		// if문 넣고 날짜 차수에 따라 다른 api 쓰기
		
		// getAdminFeeGraph(setFeeData, start, new Date());
	};

	// startTime과 endTime 사이 시간 계산
	const getIntervalStartEnd = (startDate, endDate) => {
		var Interval = new Date(endDate) - new Date(startDate);
		var elapsedDays = Interval / (1000 * 60 * 60 * 24); // 며칠 차이나는지 구하기

		return elapsedDays;
	}

	// 기간선택 & 데이터 가져오기 - 라디오
	const handleGetData = (e) => {
		// console.log('테스트값 : ' + usePeriod);
		// var Period = 0;
		// switch(usePeriod) {
		// 	case 'week' :
		// 		console.log(usePeriod);
		// 		Period = 7;
		// 		break;
		// 	case '1month':
		// 		console.log(usePeriod);
		// 		Period = 30;
		// 		break;
		// 	case '6month' :
		// 		console.log(usePeriod);
		// 		Period = 180;
		// 		break;
		// 	case 'year' :
		// 		console.log(usePeriod);
		// 		Period = 365;
		// 		break;
		// }

		// console.log(endDate);
		// console.log(Period);

		// start = new Date(endDate - 1000 * 60 * 60 * 24 * Period); //

		// console.log("시작 : " + start);
		// console.log("끝 : " + endDate);

		//////
		if(getIntervalStartEnd(refStart.current.value , refEnd.current.value) <= 32){
			setUsePeriod('day');
			console.log('getIntervalStartEnd');
			getAdminFeeGraph(setFeeData, startDate, endDate);
		}
		else if(32 <= getIntervalStartEnd(refStart.current.value , refEnd.current.value)
			&& getIntervalStartEnd(refStart.current.value , refEnd.current.value) <= 180) {
			setUsePeriod('week');
			console.log('getIntervalStartEnd');
			getFeeDataLabeledByWeek(setFeeData, startDate, endDate);
		}
		else {
			setUsePeriod('month');
			console.log('getIntervalStartEnd');
			getFeeDataLabeledByMonth(setFeeData, startDate, endDate);
		}

		// getAdminFeeGraph(setFeeData, startDate, endDate);
		setStartDate(start);
	};

	// const getSelectedPeriod = (e) => {
	// 	console.log('현재 선택 기간 : ' + e.target.value);
	// 	console.log('test : ' + endDate);

	// 	setUsePeriod(e.target.value);
	// };

	// 요금 변경
	const handleSetFee = () => {
		setFee(refFee.current.value);
		// console.log('변경하고 싶은 요금 : ' + refFee.current.value);
		setAdminFee(setFee, refFee.current.value);

		closeModal();
	};

	const setFeeFormat = (total) => {
		return total.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	}


	return (
		<>
			{/* 기간 설정 */}
			<div className='period_income'>
				<div className='setPeriod'>
					<div className='income_form'>
						{/* 지정 날짜 기간 계산해서 넘기기 */}
						<button
							className='income_searchbtn'
							onClick={handleGetDataBtn}
							value='week'
							name='period'>
							일주일
						</button>
						<button
							className='income_searchbtn'
							onClick={handleGetDataBtn}
							value='1month'
							name='period'>
							1개월
						</button>
						<button
							className='income_searchbtn'
							onClick={handleGetDataBtn}
							value='6month'
							name='period'>
							6개월
						</button>
						<button
							className='income_searchbtn'
							onClick={handleGetDataBtn}
							value='year'
							name='period'>
							1년
						</button>
						<span className='date_standard'>기간</span>
						<input
							className='income_datebox'
							ref={refStart}
							onChange={handleChangeDate}
							type='date'
							max={endDate.toISOString().substring(0, 10)}
							defaultValue={startDate.toISOString().substring(0, 10)}
						/>
						~&nbsp;&nbsp;
						<input
							className='income_datebox'
							ref={refEnd}
							onChange={handleChangeDate}
							type='date'
							min={startDate.toISOString().substring(0, 10)}
							max={new Date(new Date() - 1000 * 60 * 60 * 24).toISOString().substring(0, 10)}
							defaultValue={new Date(new Date() - 1000 * 60 * 60 * 24).toISOString().substring(0, 10)}
						/>
						&nbsp;
						{/* <input 
						className='period_radio'
						onClick={getSelectedPeriod} 
						type="radio" 
						name="period" 
						value="week" 
						defaultChecked='checked'/>1주일
						&nbsp;
						<input 
						className='period_radio'
						onClick={getSelectedPeriod} 
						type="radio" 
						name="period" 
						value="1month"/>1개월
						&nbsp;
						<input 
						className='period_radio'
						onClick={getSelectedPeriod} 
						type="radio" 
						name="period" 
						value="6month"/>6개월
						&nbsp;
						<input 
						className='period_radio'
						onClick={getSelectedPeriod} 
						type="radio" 
						name="period" 
						value="year"/>1년
						&nbsp;&nbsp; */}
						<input
							className='income_searchbtn'
							onClick={handleGetData}
							type='button'
							value='조회'
						/>
						{/* <button className='openModal' onClick={modalOpen}>요금 변경</button> */}
					</div>
				</div>
				<div className='income'>
					총 수입 {setFeeFormat(total)}원 &nbsp;
					<button className='setFee_Btn' onClick={openModal}></button>
				</div>
{/* 				
				<br /> */}
			</div>
			{/* 차트 */}
			<div className='chart'>
				{feeData.length > 0 ? (
					<Line id='test' data={data} options={options} />
				) : (
					<div className='no_data'>데이터가 없습니다</div>
				)}
			</div>
			{/* 요금 설정 */}
			<Modal>
				<div className='setFee'>
					현재 요금은 시간당 {fee}원 이며,&nbsp;&nbsp;
					<input type='number' ref={refFee} defaultValue={fee} />
					원으로 변경합니다. &nbsp;&nbsp;&nbsp;
					<br/>
					<button id='set_fee_btn' onClick={handleSetFee}>설정</button>
				</div>
			</Modal>
		</>
	);
};

export default Income;
