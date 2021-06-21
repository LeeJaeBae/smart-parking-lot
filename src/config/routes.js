export class Route {
	static admin = {
		login: '/admin', // 로그인 
		main: '/admin/main', // 현재 주차장 상황
		allParkingData: '/admin/alldata',
		currentParkingList: '/admin/current',
		Income: '/admin/income',
		// logout: 'logout'
	};

	static user = {
		main: '/',
		congestion: '/congestion',
		location: '/location',
		error: '/error',
		payready: '/payready',
		payresult : '/payresult'
	};
}
