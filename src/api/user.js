import axios from './axios';

export const getCheckSpace = () => axios.get(`/checkSpace`);
export const getLocationCar = () => axios.get(`/locationCar`);
