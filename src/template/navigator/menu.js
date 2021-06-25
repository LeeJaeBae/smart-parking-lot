import './menu.css';

// 라우트
import { Link } from 'react-router-dom';
import { Route } from '../../config/routes';
import { useRef , useState , useEffect } from 'react';

import useModal from '../modal/useModal';

import { adminLogout , getAdminInfo , resetAdminPwd } from '../../api/admin';

const Menu = ({ setTitle }) => {

	const [openModal, closeModal, Modal] = useModal();
	// 로그아웃 
	const logout = () => {
		// sessionStorage 에 user_id 로 저장되어 있는 아이템 삭제

		adminLogout();
		// 로그인 화면으로 이동
		document.location.href = "/admin"; 
	};

	//// 관리자 설정 ////

	const [adminId , setAdminId] = useState(-1);


	const handleSetAdmin = () => {
		// 빈칸이 있을 경우
		if(currentPW.current.value === "") {
			alert("현재 비밀번호를 입력해주세요");
			return;
		}
		if(newPW.current.value === "" || newPWConfirm.current.value === "") {
			alert("새로운 비밀번호를 입력해주세요");
			return;
		}

		// 새로운 비밀번호와 비밀번호 확인이 일치하는지 확인
		if(newPW.current.value !== newPWConfirm.current.value) {
			alert("비밀번호 확인이 일치하지 않습니다");
			return;
		}


		// 현재 비번이 일치하는지 확인
		getAdminInfo(setAdminId);

		console.log(currentPW.current.value)
		console.log(newPW.current.value)

		resetAdminPwd(adminId, currentPW.current.value , newPW.current.value);

		// 모달 닫기
		closeModal();
	}

	// const userID = useRef();
	const currentPW = useRef(); // 현재 PW
	const newPW = useRef(); // 새로운 PW
	const newPWConfirm = useRef(); // 새로운 PW 확인




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
				<div id='admin_set_btn' onClick={openModal}>
					Setting
				</div>
				<div id='logout' onClick={logout}>
					<a>Logout</a>
				</div>
			</div>

			<Modal>
				<div id='admin_setting'>
					<div id='admin_setting_table'>
					<table>
						<tr>
							<td className='admin_setting_label admin_setting_td'>
								아이디
							</td>
							<td className='admin_setting_td'>
								{localStorage.getItem('login_id')}
							</td>
						</tr>
						<tr className='now_pw'>
							<td className='admin_setting_label admin_setting_td'>
								현재 비밀번호
							</td>
							<td className='admin_setting_td td_pw'>
							<input className='td_pw_input' ref={currentPW} type='password' placeholder=''/>
							</td>
						</tr>
						<tr className='margin_tr'></tr>
						<tr>
							<td className='admin_setting_label admin_setting_td'>
								새 비밀번호
							</td>
							<td className='admin_setting_td td_pw'>
								<input className='td_pw_input' ref={newPW} type='password' placeholder=''/>
							</td>
						</tr>
						<tr>
							<td className='admin_setting_label admin_setting_td'>
								비밀번호 확인
							</td>
							<td className='admin_setting_td td_pw'>
								<input className='td_pw_input' ref={newPWConfirm} type='password' placeholder=''/>
							</td>
						</tr>
					</table>
					</div>
					<button id='admin_setting_btn' onClick={handleSetAdmin}>변경</button>
				</div>
			</Modal>
		</>
	);
};

export default Menu;
