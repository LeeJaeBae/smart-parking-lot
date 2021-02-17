import { Route } from 'react-router-dom';
import {
	AdminCurrentParkingList,
	AdminMain,
	AdminIncome,
	AdminAllParkingData,
} from '../../page/Admin';

function AdminRouter() {
	return (
		<>
			<Route exact path='/admin'>
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
