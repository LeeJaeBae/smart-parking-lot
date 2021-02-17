import {Route} from 'react-router-dom';
import {UserCongestion, UserError, UserLocation, UserMain} from '../../page/User';

function UserRouter() {
    return (
        <>
            <Route exact path='/' component={UserMain}/>
            <Route path='/error' component={UserError}/>
            <Route path='/congestion' component={UserCongestion}/>
            <Route path='/location' component={UserLocation}/>
        </>
    );
}

export default UserRouter;
