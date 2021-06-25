import { Route } from 'react-router-dom';
import {
	AdminCurrentParkingList,
	AdminMain,
	AdminIncome,
	AdminAllParkingData,
	AdminLogin
} from '../../page/Admin';

import { useState , useEffect } from 'react';

function AdminRouter() {





	return (
		<>
			<Route exact path='/admin'>
				<AdminLogin/>
			</Route>
			<Route exact path='/admin/main'>
				<AdminMain />
			</Route>
			<Route exact path='/admin/current'>
				<AdminCurrentParkingList />
			</Route>
			<Route exact path='/admin/income'>
				<AdminIncome />
			</Route>
			<Route exact path='/admin/alldata'>
				<AdminAllParkingData />
			</Route>
		</>
	);
}

export default AdminRouter;
