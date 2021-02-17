import AdminTemplate from '../../template/AdminTemplate';
import Main from './Main/AdminMain';
import AllParkingData from './AllParkingData/AllParkingData';
import CurrentParkingList from './CurrentParkingList/AdminCurrentParkingList';
import Income from './Income/AdminIncome';

const AdminMain = () => (
	<AdminTemplate>
		<Main />
	</AdminTemplate>
);

const AdminAllParkingData = () => (
	<AdminTemplate>
		<AllParkingData />
	</AdminTemplate>
);
const AdminCurrentParkingList = () => (
	<AdminTemplate>
		<CurrentParkingList />
	</AdminTemplate>
);
const AdminIncome = () => (
	<AdminTemplate>
		<Income />
	</AdminTemplate>
);

export { AdminMain, AdminAllParkingData, AdminCurrentParkingList, AdminIncome };
