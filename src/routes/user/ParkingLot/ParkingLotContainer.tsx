import React, {useEffect, useState} from 'react'
import ParkingLotPresenter from "./ParkingLotPresenter";

const ParkingLotContainer = () => {
    const [emptySpace, setEmptySpace] = useState<number[]>([])
    useEffect(() => {
        fetch(`http://172.26.2.69:8000/api/checkSpace`).then(r => {
            console.log(r.json().then(json => {
                console.log(json)
                setEmptySpace(json.emptySpace)
            }))
            console.log(r)
        })
    }, [])
    return <ParkingLotPresenter emptySpace={emptySpace}/>
}

export default ParkingLotContainer;