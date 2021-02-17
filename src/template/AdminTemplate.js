import { useLocation } from 'react-router-dom';
import { Route } from '../config/routes';

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
