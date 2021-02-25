import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2'; // chart.js import
import { getAdminFeeGraph } from '../../../api/admin';
import './admin_income.css';

import chart from './IncomeChart';

/**
 * Income
 * @todo api :: 기간 보내주고 -> 차트데이터
 */


// const options = {
// 	legend: {
// 	  display: false, // label 보이기 여부
// 	},
// 	scales: {
// 	  yAxes: [{
// 		ticks: { 
// 		  min: 0, // y축 스케일에 대한 최소값 설정
// 		  stepSize: 1, // y축 그리드 한 칸당 수치
// 		}
// 	  }]
// 	},
   
// 	// false : 사용자 정의 크기에 따라 그래프 크기가 결정됨.
// 	// true : 크기가 알아서 결정됨.
// 	maintainAspectRatio: false 
//   }
  
//   const data = {
// 	// 각 막대별 라벨
// 	labels: ['1번 막대', '2번 막대', '3번 막대'],
// 	datasets: [
// 	  {
// 		borderWidth: 1, // 테두리 두께
// 		data: [1,2,3], // 수치
// 		backgroundColor:['yellow','red','green'] // 각 막대 색
// 	  }
// 	]
//   };








 ////////////////////////

const Income = ( {data} ) => {
	
	var start = new Date();
	const [endDate , setEndDate] = useState(new Date());
	const [startDate , setStartDate] = useState(new Date());
	
	
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
		feeData.length !== 0 && feeData.map((fee) => 
		totalIncome += fee.fee_day
		);
		console.log(totalIncome);
		setTotal(totalIncome)
	}, [feeData]);

	
	// 지정 기간에 따라 변수 값 변경
	const setPeriod = (p) => {
		var period = 0;
		// e.preventDefault();
		// var specifiedDuration = 1;
		console.log("period : " + p);
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
				period = 180;
				break;
			case "1year" :
				period = 800;
				break;
			default :
				period = 1;
		}

		// console.log(specifiedDuration);
		return period;
	}


	// 수입 데이터 가져오기
	const getFeeData = (e) => {
		e.preventDefault();

		const periodText = e.target.value;
		const period = setPeriod(periodText);
		// var duration = setPeriod();
		// console.log(new Date());
		start = new Date(endDate - (1000 * 60 * 60 * 24) * period); //
		
		// console.log("시작 : " + start);
		// console.log("끝 : " + endTime);


		getAdminFeeGraph(setFeeData , start , endDate);
		// setStartTime(start);

	}



	return (
		<>
			{/* 기간 설정 */}
			<div className='period_income'>
				<div className='setPeriod'>
					<div className='income_form'>
						{/* 지정 날짜 기간 계산해서 넘기기 */}
						<button onClick={getFeeData} className='income_btn' value='today' name='period'>
							오늘
						</button>
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
					</div>
				</div>
				<div class='income'>총 수입 {total}원</div>
				<br></br>
			</div>
			{/* 차트 */}
			<div className='chart'>
				<canvas>
					<script>
						<chart data={data}/>
					</script>
				</canvas>

			</div>
		</>
	);
};

export default Income;
