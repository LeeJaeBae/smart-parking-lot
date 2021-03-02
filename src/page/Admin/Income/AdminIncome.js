import React, { useState, useEffect, useRef} from 'react';
import { Line } from 'react-chartjs-2'; // chart.js import
import { getAdminFeeGraph , setAdminFee , getFee } from '../../../api/admin';
// import CurrentPList from '../CurrentParkingList/AdminCurrentParkingList';
import './admin_income.css';

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

	const [chartDataList , setChartDataList] = useState([]); // 차트 데이터 배열
	const [chartLabelList, setChartLabelList] = useState([]);

	const chartData = [];
	const chartLabel = [];

	const refEnd = useRef();
	const refStart = useRef();

	const refFee = useRef();
	const [fee , setFee] = useState(1000);
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
	
	const options = { // 차트의 옵션
		maintainAspectRatio : true, // 차트 크기를 상위 div에 구속?
		responsive : true, // 차트의 크기 자동조절?
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
	
	const data = { // 차트 내 데이터, 라벨, 스타일 등
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
				lineTension:0
			},
		],
	};


	var start = new Date();
	const [endDate, setEndDate] = useState(new Date());
	const [startDate, setStartDate] = useState(new Date(new Date() - 1000 * 60 * 60 * 24 * 7));
	// const [startDate, setStartDate] = useState(new Date());

	const [feeData, setFeeData] = useState([]);
	const [usePeriod , setUsePeriod] = useState('week');
	const [total, setTotal] = useState(0);
	var totalIncome = 0;


	// 최초 데이터 로드
	useEffect(() => {
		getFee(setFee);
		handleGetData();
		// console.log('요금 받아왔음');
	}, [])

	useEffect(() => {
		// getFee(setFee);
		// handleGetData();
		// console.log('요금 받아왔음');
		refFee.current.value = fee;
	}, [fee])


	useEffect(() => {
		// console.log(feeData);
		// setTotal(0);

		// map을 이용해 데이터(총 요금)&라벨(날짜) 배열에 추가
		feeData.length !== 0 && feeData.map((fee) => (
			totalIncome += fee.fee_day,
			chartData.push(fee.fee_day),
			console.log(typeof(fee.fee_day)),
			chartLabel.push(fee.fee_date)
			));

		// console.log(totalIncome);
		// console.log(chartData);
		// console.log(chartLabel);

		// 차트데이터 날짜 오름차순으로 정렬
		for(var a = 0 ; a < chartLabel.length ; a++) {
			for(var b = a+1 ; b < chartLabel.length ; b++) {
				// console.log(typeof(chartData[a]));
				if(new Date(chartLabel[a]) > new Date(chartLabel[b])) {

					var tmp = chartLabel[a];
					chartLabel[a] = chartLabel[b];
					chartLabel[b] = tmp;

					tmp = chartData[a];
					chartData[a] = chartData[b];
					chartData[b] = tmp;

					console.log(new Date(chartData[a]));
					console.log(chartLabel[a]);
				}
			}
		}

		setTotal(totalIncome);
		setChartDataList(chartData);
		setChartLabelList(chartLabel);
	}, [feeData]);



	// input date 값 변경하기
	const handleChangeDate = (e) => {
		console.log('input date : ' + e.target.value);

		if(e.target === refStart.current) {
			setStartDate(new Date(e.target.value));
		}
		else {
			setEndDate(new Date(e.target.value));
		}


		// if(e.target === refEnd.curren)
	}

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
			case '3month':
				period = 90;
				break;
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
		setStartDate(start);
		setEndDate(new Date());
		refStart.current.value = start.toISOString().substring(0, 10);
		refEnd.current.value = new Date().toISOString().substring(0, 10);
		getAdminFeeGraph(setFeeData, start, new Date());
	};


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

		
		getAdminFeeGraph(setFeeData, startDate, endDate);
		// setStartDate(start);
	}

	const getSelectedPeriod = (e) => {
		console.log('현재 선택 기간 : ' + e.target.value);
		console.log('test : '+endDate);

		setUsePeriod(e.target.value);
	}

	// 요금 변경
	const handleSetFee = () => {
		setFee(refFee.current.value);
		// console.log('변경하고 싶은 요금 : ' + refFee.current.value);
		setAdminFee(setFee , refFee.current.value);
	}
	
	// //////모달창
	const modalOpen = () => {
		document.querySelector('.modal').classList.remove('hidden');
	}
	const modalClose = () => {
		document.querySelector('.modal').classList.add('hidden');
	}

	// document.querySelector('.openModal').addEventListener('click', modalOpen);
	// document.querySelector('.close_btn').addEventListener('click', modalClose);
	// document.querySelector('.modal_background').addEventListener('click', modalClose);
	


	return (
		<>
{/* 
		<div className="modal_background">
				<div className="modal hidden">
					<div className="close">
						<button onClick={modalClose} className="close_btn">×</button>
					</div>
					<div className="modal_contents">
						<table>
							<tr>
								<th>구역</th>
								<th>차번호</th>
								<th>입차시각</th>
								<th>현재요금</th>
							</tr>
							<tr>
								<td>1</td>
								<td>
									<input className="input_numberPlate" type="text" value="83무1604"/>
								</td>
								<td>15:03</td>
								<td>6,000</td>
							</tr>
						</table>
						<br/>
						<div>
							<button>수정하기</button>
						</div>
					</div>
				</div>
			</div>
 */}






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
							max={new Date().toISOString().substring(0, 10)}
							defaultValue={new Date().toISOString().substring(0, 10)}
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
							className="income_searchbtn"
							onClick={handleGetData} 
							type='button' 
							value='조회'
						/>
						{/* <button className='openModal' onClick={modalOpen}>요금 변경</button> */}
					</div>
				</div>
				<div className='income'>총 수입 {total}원</div>
				<br />
			</div>
			{/* 차트 */}
			<div className='chart'>
				{feeData.length > 0 ?
				<Line
				id='test' 
				data={data} 
				options={options} 
				/>
				:
				<>데이터가 없습니다</>
			}
			</div>
			{/* 요금 설정 */}
			<div className='setFee'>
				현재 요금은 시간당 {fee}원 이며,&nbsp;&nbsp;
				<input type='number' ref={refFee} defaultValue={fee}/> 
				원으로 변경합니다.
				&nbsp;&nbsp;&nbsp;<button onClick={handleSetFee}>설정</button>
			</div>
		</>
	);
};

export default Income;
