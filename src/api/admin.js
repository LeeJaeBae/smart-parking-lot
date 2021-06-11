import axios from './axios';
import {isBefore} from 'validator'
// import { useDispatch } from 'react-redux'


// 로그인
export const adminLogin = async ({ id, password }) =>
	axios.post(`/login` , { params: { id, password } }).then((res) => {
		console.log(res.data);
	});

	// if (success) {
	// 	// Cookies.set('session', token.split(' ')[1]); // 세션을 쿠키에 저장

	// 	props.history.push('/user'); // 화면 전환
	// }
	// return data;

// 로그아웃
// export const signout = async session => {
// 	const headers = {
// 		Authorization: `jwt ${session}`
// 	}

// 	const { data } = await axios.get('' , { })
// }

/**
 * getLiveSituation
 * return res.data = [현재주차수, 누적주차수, 오늘매출]
 */

// 현재 주차장 현황 (webRTC)
export const getAdminLiveSituation = (setState) =>
	axios.get(`/liveSituation`).then((res) => {
		res.data.liveSituation && setState(res.data.liveSituation);
	});





// 현재 주차중인 차 목록을 최근 입차순으로 세팅
const sortDataByEntryTime = (json) => {
	json.sort(function(a,b) { // 입차시각 오래된순
		// console.log(isBefore("2019-09-09 05:44:23", "2019-09-09 05:44:26"))
		return !isBefore(a.car_entry_time, b.car_entry_time)? 1 : -1;
	});

	return json;
}

// 현재 주차중인 차 목록
export const getAdminParkingList = (setState) =>
	axios.get(`/parkingList`).then((res) => {
		res.data.parkingList && setState(res.data.parkingList);
	});

// 현재 주차중인 차 목록
export const getAdminParkingListSearch = (setState, numberPlate) =>
	axios.get(`/parkingList`, { params: { numberPlate } }).then((res) => {
		res.data.parkingList && setState(sortDataByEntryTime(res.data.parkingList));
	});
// 차번호 수정
export const modifyAdminNumberPlate = (numberPlate) =>
	axios.get(`/liveSituation`).then((res) => {
		res.data.liveSituation && console.log(res.data.liveSituation);
});


// 현재 요금 가져오기 (income)
export const getFee = (setState) =>
	axios.get(`/searchFee`).then((res) => {
		res.data.feeInfo && setState(res.data.feeInfo);
});






// 수입 조회 (chart.js)
// 일간 조회
export const getAdminFeeGraph = (setState, startTime, endTime) =>
	axios.get(`/feeGraph`, { params: { startTime, endTime } }).then((res) => {
		res.data.feeList &&	setState(res.data.feeList);
	});
// 주간 조회
export const getFeeDataLabeledByWeek = (setState, startTime, endTime) =>
	axios.get(`/feeGraphWeek`, { params: { startTime, endTime } }).then((res) => {
		res.data.feeList &&	setState(res.data.feeList);
	});
// 월별 조회
export const getFeeDataLabeledByMonth = (setState, startTime, endTime) =>
	axios.get(`/feeGraphMonth`, { params: { startTime, endTime } }).then((res) => {
		res.data.feeList &&	setState(res.data.feeList);
	});

// 시간당 요금 변경
export const setAdminFee = (setState, feeInfo) =>
	axios.get(`/feeUpdate`, { params: { feeInfo } }).then((res) => {
	res.data.feeInfo && setState(res.data.feeInfo);
});




// 누적 주차 데이터 (startTime, endTime 전달)
export const getAdminTotalCarList = (setState, startTime, endTime, numberPlate) =>
	axios.get(`/totalCarList`, { params: { startTime, endTime, numberPlate } }).then((res) => {
		setState(sortDataByEntryTime(res.data.totalCarList));
	});
