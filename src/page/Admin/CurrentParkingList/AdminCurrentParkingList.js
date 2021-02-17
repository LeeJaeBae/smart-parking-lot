import React, { useEffect, useState } from 'react';
import { getAdminParkingList } from '../../../api/admin';
import './admin_currentPList.css';

const mock = {
	car_parking_id: 'sadf',
	car_number_plate: '13가1234',
	car_entry_time: '2021-02-27 10:10',
	car_fee: '1000만원',
	car_id: '0',
};
const LeftTHstyle = {
	borderTopLeftRadius: '10px',
	borderBottomLeftRadius: '10px',
};

const RightTHstyle = {
	borderTopRightRadius: '10px',
	borderBottomRightRadius: '10px',
};

const CurrentPList = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		getAdminParkingList(setData);
	}, []);

	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<>
			<div>
				<form className='current_form' action='ip/api/parkingList' method='GET'>
					<div className='current_search'>
						<input
							type='text'
							className='current_searchbox'
							name='numberPlate'
							placeholder='차번호를 입력하세요'
						/>
						<input type='submit' className='current_search_btn' value='　' />
					</div>
					<div className='sort'>
						<select className='current_select' name='sort'>
							<option value='area_descend' selected='selected'>
								구역 내림차순
							</option>
							<option value='area_ascend'>구역 오름차순</option>
						</select>
					</div>
				</form>
			</div>
			<div>
				<table className='current_table'>
					<tr>
						<th style={LeftTHstyle}>구역</th>
						<th>차번호</th>
						<th>입차시간</th>
						<th>현재요금</th>
						<th style={RightTHstyle}>　</th>
					</tr>
					{/* 주차 목록 */}
					{data &&
						data.map((car) => (
							<tr>
								<td>{car.car_parking_id}</td>
								<td>{car.car_number_plate}</td>
								<td>{car.car_entry_time}</td>
								<td>{car.car_fee}</td>
								<td>
									<input type='hidden' name='car_id' value={car.car_id} />
									<input className='modify' type='submit' value='수정' />
								</td>
							</tr>
						))}
				</table>
			</div>
		</>
	);
};

export default CurrentPList;
