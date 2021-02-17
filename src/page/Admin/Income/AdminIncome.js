import React, { useState, useEffect } from 'react';
import { getAdminFeeGraph } from '../../../api/admin';
import './admin_income.css';

/**
 * Income
 * @todo api :: 기간 보내주고 -> 차트데이터
 */
const Income = () => {
	const [data, setData] = useState([]);
	const [total, setTotal] = useState(0);
	useEffect(() => {
		getAdminFeeGraph(setData);
	}, []);
	useEffect(() => {
		console.log(data);
		setTotal(0);
		data.length !== 0 && data.map((v) => setTotal(total + v.fee));
	}, [data]);
	return (
		<>
			{/* 기간 설정 */}
			<div className='period_income'>
				<div className='setPeriod'>
					<div className='income_form'>
						{/* 지정 날짜 기간 계산해서 넘기기 */}
						<button className='income_btn' type='submit' value='today' name='period'>
							오늘
						</button>
						<button className='income_btn' type='submit' value='week' name='period'>
							1주일
						</button>
						<button className='income_btn' type='submit' value='1month' name='period'>
							1개월
						</button>
						<button className='income_btn' type='submit' value='3month' name='period'>
							3개월
						</button>
						<button className='income_btn' type='submit' value='6month' name='period'>
							6개월
						</button>
						<button className='income_btn' type='submit' value='1year' name='period'>
							1개월
						</button>
					</div>
				</div>
				<div class='income'>총 수입 {total}원</div>
				<br></br>
			</div>
			{/* 차트 */}
			<div className='chart'>차트 들어갈 곳</div>
		</>
	);
};

export default Income;
