import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'; // chart.js import


// 기간 설정에 따라 startDate와 endDate 날짜 변경 (기간은 체크박스로)
// 좌우버튼을 누르면 startDate와 endDate 날짜 계산해주기 (ex : new Date() - 1000 * 60 * 60 * 24 * period)
// 일단위로 출력 : 일주일, 1개월
// 주단위로 출력 : 3개월
// 월단위로 출력 : 6개월, 1년
// 단위 당 수입 평균값을 구해서 차트 데이터로 넣기

const Options = {
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

// export Options;


// 	// false : 사용자 정의 크기에 따라 그래프 크기가 결정됨.
// 	// true : 크기가 알아서 결정됨.
// 	maintainAspectRatio: false

export const data = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
		{
			label: 'Dataset of Months',
			fill: false,
			lineTension: 0.1,
			backgroundColor: 'rgba(75,192,192,0.4)',
			borderColor: 'rgba(75,192,192,1)',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: 'rgba(75,192,192,1)',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: 'rgba(75,192,192,1)',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [65, 59, 80, 81, 56, 55, 40],
		},
	],
};

const Chart = ({ data }) => {
	return (
		<div>
			<h2>Line Chart</h2>
			<Line data={data} />
		</div>
	);
};
export default Chart;
