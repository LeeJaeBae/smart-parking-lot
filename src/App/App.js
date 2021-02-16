import { BrowserRouter } from 'react-router-dom';
import UserRouter from '../routes/userRouter';

const App = () => (
	<BrowserRouter>
		<UserRouter />
	</BrowserRouter>
);

export default App;
