import axios from './axios';

/**
 * getLiveSituation
 * return res.data = [현재주차수, 누적주차수, 오늘매출]
 */

// 현재 주차장 현황 (webRTC)
export const getAdminLiveSituation = (setState) =>
	axios.get(`/liveSituation`).then((res) => {
		res.data.liveSituation && setState(res.data.liveSituation);
	});

// 현재 주차중인 차 목록
export const getAdminParkingList = (setState) =>
	axios.get(`/parkingList`).then((res) => {
		res.data.parkingList && setState(res.data.parkingList);
	});

// 현재 주차중인 차 목록
export const getAdminParkingListSearch = (setState, numberPlate) =>
	axios.get(`/parkingList`, { params: { numberPlate } }).then((res) => {
		res.data.parkingList && setState(res.data.parkingList);
	});

// 수입 조회 (chart.js)
export const getAdminFeeGraph = (setState, startTime, endTime) =>
	axios.get(`/feeGraph`, { params: { startTime, endTime } }).then((res) => {
		setState(res.data.feeList);
	});

// 누적 주차 데이터 (startTime, endTime 전달)
export const getAdminTotalCarList = (setState, startTime, endTime, numberPlate) =>
	axios.get(`/totalCarList`, { params: { startTime, endTime, numberPlate } }).then((res) => {
		setState(res.data.totalCarList);
	});
