import SearchPresenter from "./SearchPresenter";
import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from 'react-router'

const SearchContainer: React.FC<RouteComponentProps> = ({history}) => {
    const [carId, setCarId] = useState<string>("")
    useEffect(() => {
        fetch(`http://172.26.2.69:8000/api/checkSpace`).then(r => {
            console.log(r.json().then(json => {
                console.log(json)
            }))
            console.log(r)
        })
    }, [])
    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        history.push(`/parking/${carId}`, {carId});
    }

    return <SearchPresenter handleSubmit={handleSubmit} setCarId={setCarId}/>
}

export default withRouter(SearchContainer);