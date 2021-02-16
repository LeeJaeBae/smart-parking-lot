import { Route } from 'react-router-dom';
import { UserCongetion, UserError, UserLocation, UserMain } from '../../page/User';

function UserRouter() {
	return (
		<>
			<Route exact path='/' component={UserMain} />
			<Route path='/error' component={UserError} />
			<Route path='/congetion' component={UserCongetion} />
			<Route path='/location' component={UserLocation} />
		</>
	);
}

export default UserRouter;
