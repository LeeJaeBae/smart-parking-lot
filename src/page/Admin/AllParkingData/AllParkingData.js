import React from 'react';
import './admin_AllParkingData.css';

/**
 * AllParkingData
 *
 * @todo api :: 날짜 -> 차량 데이터
 */
const AllParkingData = () => {
	// 임시 데이터
	// const pdata = [
	//     { id: 0, area: "A1", carPlate: "24나1122", in: "15:16" , out: "18:16", fee : 2000 , paytype: "카드" },
	//     { id: 1, area: "A2", carPlate: "24나1122", in: "15:16" , out: "18:16", fee : 2000 , paytype: "카드" },
	//     { id: 2, area: "A3", carPlate: "24나1122", in: "15:16" , out: "18:16", fee : 2000 , paytype: "카드" }
	// ]

	const LeftTHstyle = {
		borderTopLeftRadius: '10px',
		borderBottomLeftRadius: '10px',
	};
	console.log(process.env.REACT_APP_API_BASE_URL);
	const RightTHstyle = {
		borderTopRightRadius: '10px',
		borderBottomRightRadius: '10px',
	};

	return (
		<>
			<div className='alldata_search_option'>
				<form className='alldata_form' action='ip/api/totalCarList' method='GET'>
					<button className='alldata_btn' type='submit' value='today' name='period'>
						오늘
					</button>
					<button className='alldata_btn' type='submit' value='week' name='period'>
						1주일
					</button>
					<button className='alldata_btn' type='submit' value='1month' name='period'>
						1개월
					</button>
					<button className='alldata_btn' type='submit' value='3month' name='period'>
						3개월
					</button>
					<button className='alldata_btn' type='submit' value='6month' name='period'>
						6개월
					</button>
					<input className='alldata_date' type='date' name='startTime' />
					~&nbsp;
					<input className='alldata_date' type='date' name='endTime' />
					<input
						type='text'
						className='alldata_searchbox'
						name='numberPlate'
						value='##'
						placeholder='차번호를 입력하세요'
					/>
					<input type='submit' className='alldata_search_btn' value='조회' />
				</form>
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
					{/* {total.totalCarList && total.totalCarList.map( car => (
                    <tr>
                        <td>2021.02.02</td>
                        <td>A3</td>
                        <td>24나1122</td>
                        <td>16:15</td>
                        <td>18:15</td>
                        <td>2000</td>
                        <td>카드</td>
                    </tr>
                ))} */}
				</table>
			</div>
		</>
	);
};

export default AllParkingData;
