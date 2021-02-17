import { BrowserRouter } from 'react-router-dom';
// import { UserRouter, AdminRouter } from '../routes';
import UserRouter from '../routes/userRouter/UserRouter';
import AdminRouter from '../routes/adminRouter/AdminRouter';
const App = () => {
	return (
		<BrowserRouter>
			<UserRouter />
			<AdminRouter />
		</BrowserRouter>
	);
};

export default App;
