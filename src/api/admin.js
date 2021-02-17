import axios from './axios';

/**
 * getLiveSituation
 * return res.data = [현재주차수, 누적주차수, 오늘매출]
 */
export const getAdminLiveSituation = (setState) =>
	axios.get(`/liveSituation`).then((res) => {
		res.data.liveSituation && setState(res.data.liveSituation);
	});
export const getAdminParkingList = (setState) =>
	axios.get(`/parkingList`).then((res) => {
		res.data.parkingList && setState(res.data.parkingList);
	});
export const getAdminFeeGraph = (setState) =>
	axios.get(`/feeGraph`).then((res) => {
		res.data.feeList && res.data.feeList.length === 0
			? setState([{ date: '2020-11-11', fee: 100 }])
			: setState(res.data.feeList);
	});
export const getAdminTotalCarList = (setState) =>
	axios.get(`/totalCarList`).then((res) => {
		setState(res.data);
	});
