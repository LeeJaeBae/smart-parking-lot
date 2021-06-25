import {Route} from 'react-router-dom';
import {UserCongestion, UserError, UserLocation, UserMain, PayReady, PayResult} from '../../page/User';

// 각 주소에 따라 이 컴포넌트를 렌더링하라

function UserRouter() {
    return (
        <>
            <Route exact path='/' component={UserMain}/>
            <Route path='/error' component={UserError}/>
            <Route path='/congestion' component={UserCongestion}/>
            <Route path='/location/:id' component={UserLocation}/>
            <Route path='/payready' component={PayReady}/>
            <Route path='/payresult' component={PayResult}/>
        </>
    );
}

export default UserRouter;
