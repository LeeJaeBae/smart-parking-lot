import './menu.css';

// 라우트
import { Link } from 'react-router-dom';
import { Route } from '../../config/routes';

const Menu = ({ setTitle }) => {


	// 로그아웃 
	const logout = () => {
		// sessionStorage 에 user_id 로 저장되어 있는 아이템 삭제
		sessionStorage.removeItem('user_id');

		// 로그인 화면으로 이동
		document.location.href = "/admin"; 
	};


	return (
		<>
			<div id='menu_bar'>
				<div id='admin_logo' />
				<div id='menus'>
					<Link to={Route.admin.main}>
						<div className='menu' title='주차장 현황'>
							주차장 현황
						</div>
					</Link>
					<Link to={Route.admin.currentParkingList}>
						<div className='menu' title='실시간 주차 목록'>
							실시간 주차 목록
						</div>
					</Link>
					<Link to={Route.admin.Income}>
						<div className='menu' title='수입 조회'>
							수입 조회
						</div>
					</Link>
					<Link to={Route.admin.allParkingData}>
						<div className='menu' title='전체 주차 데이터'>
							전체 주차 데이터
						</div>
					</Link>
				</div>
				<div>
					<a onClick={logout}>Logout</a>
				</div>
			</div>
		</>
	);
};

export default Menu;
