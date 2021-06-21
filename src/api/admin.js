import axios from './axios';
import {isBefore} from 'validator'
import { Dispatch, getState } from 'react';


// import { useDispatch } from 'react-redux'


// 로그인
// export const adminLogin = (id, password) => {
// 	return function (dispatch, getState, { history }) {
// 	  axios({
// 		method: "post",
// 		url: "http://13.125.249.241/user/login",
// 		data: {
// 		  email: id,
// 		  password: password,
// 		},
// 	  })
// 		.then((res) => {
// 		  console.log(res);
// 		  dispatch(
// 			setUser({
// 			  email: res.data.email,
// 			  nickname: res.data.nickname,
// 			})
// 		  );
// 		  const accessToken = res.data.token;
// 		  //쿠키에 토큰 저장
// 		  setCookie("is_login", `${accessToken}`);
// 		  document.location.href = "/";
// 		})
// 		.catch((error) => {
// 		  console.log(error);
// 		});
// 	};
//   };

export const adminLogin = ( input_id, input_pw ) => {
		axios.post(`/auth/login`, {
			// params: {
				email : input_id,
				password : input_pw
			// }
		})
		.then((res) => {
			console.log(res);

			localStorage.setItem("tokenCode", res.data.access_token); // 토큰코드
			localStorage.setItem("token_type", res.data.token_type); // 토큰타입
			localStorage.setItem("expires_at", res.data.expires_at); // 발행시간
			localStorage.setItem("login_id", input_id);

			// if(res.data.userId === input_id) {
			// 	console.log('로그인 성공!')
			// 	sessionStorage.setItem('user_id', input_id)
			// }
			//
			document.location.href = "/admin/main"; // 로그인되면 관리자 페이지로 이동
		  })
		  .catch((error) => {
			console.log(error);

			// if(error.data.userId === undefined || error.data.userId === null) {
			// 	console.log(error.data.msg)  // 이건 예외처리에서
			// 	alert('없는 아이디이거나, 잘못된 비밀번호 입니다.')
			// }
		  });
}
	

// 로그아웃
export const adminLogout = () =>
	axios.get(`/auth/logout` , 
	{
		headers: { Authorization : `Bearer ${localStorage.getItem('tokenCode')}` }
	}).then((res) => {

		// 토큰과 관련된 정보 삭제
		localStorage.removeItem('tokenCode'); 
		localStorage.removeItem("token_type");
		localStorage.removeItem("expires_at");
		localStorage.removeItem("input_id");

		console.log(res.data.message); // 로그아웃 메시지
	})

// 관리자 비번 변경을 위한 정보 확인(GET)
export const getAdminInfo = (setId) =>
	axios.get(`/auth/user` , 
	{
		headers: { Authorization : `Bearer ${localStorage.getItem('tokenCode')}` }
	}).then((res) => {
		setId(res.data.id);



	})

export const resetAdminPwd = (id, currentPwd, newPwd) =>
	axios.post(`/auth/resetPwd` , null, 
	{
		headers : {
			Authorization : `Bearer ${localStorage.getItem('tokenCode')}`
		},
		params: {

			id:id,
			currentPwd : currentPwd,
			newPwd : newPwd
		}
		
	}).then((res) => {
		if(res.data.boolean) {
			alert('비밀번호가 변경되었습니다')
		} else {
			alert('비밀번호가 틀렸습니다')
		}

	})




// 현재 주차장 현황 (webRTC)
export const getAdminLiveSituation = (setState) =>
	axios.get(`/auth/liveSituation` , 
	{
		headers : {'Authorization' : `Bearer ${localStorage.getItem('tokenCode')}` }
	}).then((res) => {
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
	axios.get(`/auth/parkingList` , 
	{
		headers : {'Authorization' : `Bearer ${localStorage.getItem('tokenCode')}` }
	}).then((res) => {
		res.data.parkingList && setState(res.data.parkingList);
	});

// 현재 주차중인 차 목록
export const getAdminParkingListSearch = (setState, numberPlate) =>
	axios.get(`/auth/parkingList`, 
	{ 
		headers: {'Authorization' : `Bearer ${localStorage.getItem('tokenCode')}` } ,
		params: { numberPlate } 
	}).then((res) => {
		res.data.parkingList && setState(sortDataByEntryTime(res.data.parkingList));
	});
// 차번호 수정
export const modifyAdminNumberPlate = (numberPlate) =>
	axios.get(`/auth/liveSituation` , 
	{
		headers: {'Authorization' : `Bearer ${localStorage.getItem('tokenCode')}` }
	}).then((res) => {
		res.data.liveSituation && console.log(res.data.liveSituation);
});


// 현재 요금 가져오기 (income)
export const getFee = (setState) =>
	axios.get(`/auth/searchFee` , 
	{
		headers: {'Authorization' : `Bearer ${localStorage.getItem('tokenCode')}` }
	}).then((res) => {
		res.data.feeInfo && setState(res.data.feeInfo);
});






// 수입 조회 (chart.js)
// 일간 조회
export const getAdminFeeGraph = (setState, startTime, endTime) =>
	axios.get(`/auth/feeGraph`, 
	{ 
		headers: {'Authorization' : `Bearer ${localStorage.getItem('tokenCode')}` },
		params: { startTime, endTime } 
	}).then((res) => {
		res.data.feeList &&	setState(res.data.feeList);
	});
// 주간 조회
export const getFeeDataLabeledByWeek = (setState, startTime, endTime) =>
	axios.get(`/auth/feeGraphWeek`, 
	{ 
		headers: {'Authorization' : `Bearer ${localStorage.getItem('tokenCode')}` },
		params: { startTime, endTime } 
	}).then((res) => {
		res.data.feeList &&	setState(res.data.feeList);
	});
// 월별 조회
export const getFeeDataLabeledByMonth = (setState, startTime, endTime) =>
	axios.get(`/auth/feeGraphMonth`, 
	{ 
		headers: {'Authorization' : `Bearer ${localStorage.getItem('tokenCode')}` },
		params: { startTime, endTime } 
	}).then((res) => {
		res.data.feeList &&	setState(res.data.feeList);
	});

// 시간당 요금 변경
export const setAdminFee = (setState, feeInfo) =>
	axios.get(`/auth/feeUpdate`, 
	{
		headers: {'Authorization' : `Bearer ${localStorage.getItem('tokenCode')}` },
		params: { feeInfo } 
	}).then((res) => {
	res.data.feeInfo && setState(res.data.feeInfo);
});




// 누적 주차 데이터 (startTime, endTime 전달)
export const getAdminTotalCarList = (setState, startTime, endTime, numberPlate) =>
	axios.get(`/auth/totalCarList`, 
	{
		headers: {'Authorization' : `Bearer ${localStorage.getItem('tokenCode')}` },
		 params: { startTime, endTime, numberPlate } 
	}).then((res) => {
		setState(sortDataByEntryTime(res.data.totalCarList));
	});
