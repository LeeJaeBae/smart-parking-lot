import { useLocation } from 'react-router-dom';
import { Route } from '../config/routes';

import { useEffect , useState } from 'react';

import './AdminTemplate.css';
import Menu from './navigator/menu';

const Title = ({ pathname }) => {
	return (
		<>
			{pathname === Route.admin.main
				? '주차장 현황'
				: pathname === Route.admin.currentParkingList
				? '실시간 주차 목록'
				: pathname === Route.admin.Income
				? '수입 조회'
				: pathname === Route.admin.allParkingData
				? '전체 주차 데이터'
				: '에러'}
		</>
	);
};

const AdminTemplate = ({ children }) => {


	// 로그인 상태 관리 (로그인 안됐으면 로그인 페이지로 이동)
	// const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		if(!localStorage.getItem('tokenCode')){
		// sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
		//   console.log('isLogin ?? :: ', isLogin)

		  document.location.href = "/admin"; 
		} 
		// else {
		// // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
		// // 로그인 상태 변경
		//   setIsLogin(true)
		//   console.log('isLogin ?? :: ', isLogin)
		// }
	  })
// ///////////////////////



	const pathName = useLocation().pathname;
	console.log(pathName);

	return (
		<div className='background'>
			<Menu />
			<div className='title_contents'>
				<div className='title'>
					<Title pathname={pathName} />
				</div>
				<div className='contents'>{children}</div>
			</div>
		</div>
	);
};

export default AdminTemplate;










// const [title, setTitle] = useState('주차장 현황'); // 상단바 이름

// 	// 현재 주차중인 차 목록
// 	const [current, setCurrent] = useState([]); // 현재 주차중인 차 데이터
// 	const handleCurrent = () => {
// 		// 현재 주차중인 데이터 가져오기
// 		axios
// 			.get('http://172.26.2.69:8000/api/parkingList') // api 주소 넣기
// 			.then((response) => {
// 				// console.log(response.data);
// 				setCurrent(response.data);
// 			})
// 			.catch((e) => {
// 				console.log(e);
// 			});
// 	};

// 	// 전체 주차 누적데이터
// 	const [startTime, setStartTime] = useState('');
// 	const [endTime, setEndTime] = useState('');
// 	let today = new Date();

// 	const MyDate = {
// 		startTime: '2019-01-01',
// 		endTime: '2020-01-01',
// 	};

// 	const [total, setTotal] = useState([]); // 누적 주차 데이터
// 	const handleTotal = () => {
// 		axios
// 			.get('http://172.26.2.69:8000/api/totalCarList', { params: MyDate })
// 			.then((response) => {
// 				console.log(response);
// 				setTotal(response.data);
// 			})
// 			.catch((e) => {
// 				console.log(e);
// 			});
// 	};

// 	useEffect(() => {
// 		handleTotal();
// 		handleCurrent();
// 	}, [title]);

// 	// function componentWillMount() {
// 	//   axios.get('/current').then(res => {
// 	//     this.setData({items: res.data})
// 	//   })
// 	// }
