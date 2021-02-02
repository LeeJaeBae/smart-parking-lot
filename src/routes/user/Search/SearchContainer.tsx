import SearchPresenter from "./SearchPresenter";
import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from 'react-router'

const SearchContainer: React.FC<RouteComponentProps> = ({history}) => {
    const [carId, setCarId] = useState<string>("")

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        history.push(`/parking/${carId}`, {carId});
    }

    return <SearchPresenter handleSubmit={handleSubmit} setCarId={setCarId}/>
}

export default withRouter(SearchContainer);