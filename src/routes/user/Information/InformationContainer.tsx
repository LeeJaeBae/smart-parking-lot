import React from 'react'
import {useParams, withRouter} from 'react-router-dom';
import InformationPresenter from "./InformationPresenter";
import {RouteComponentProps} from "react-router";

const InformationContainer: React.FC<RouteComponentProps> = ({history}) => {
    const params = useParams<{ id: string }>();
    const pushToHome = () => {
        history.push("/")
    }
    const handlePay = () => {
        alert('준비중입니다.')
    }

    return <InformationPresenter carId={params.id} pushToHome={pushToHome} handlePay={handlePay}/>
}

export default withRouter(InformationContainer);