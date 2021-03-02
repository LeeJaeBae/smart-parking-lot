import axios from './axios';

export const getCheckSpace = (setState) =>
    axios.get(`/checkSpace`).then((res) => {
        res.data.emptySpace && setState(res.data.emptySpace);
    });
export const getLocationCar = (setState , numberPlate) =>
    axios.get(`/locationCar` , {params:{numberPlate}}).then((res) => {
    res.data.locationCar && res.data.locationCar.length === 0
    ? setState([{ locationCar : 'testArea' , fee: 9999}])
    : setState(res.data.locationCar)
    });

// 현재 요금 가져오기 (income)
export const getFee = (setState) =>
axios.get(`/searchFee`).then((res) => {
    res.data.feeInfo && setState(res.data.feeInfo);
});