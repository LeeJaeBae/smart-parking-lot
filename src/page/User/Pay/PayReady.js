import React from "react";
import axios from "axios";
import { Route } from '../../../config/routes';
// import { UserLocation } from '..';

// const location = useLocation();
class PayReady extends React.Component {

  
  state = {
    next_redirect_pc_url: "",
    tid: "",
    params: {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: "스마로 주차요금",
      quantity: 1,
      total_amount: parseInt(this.props.location.state.fee.replace(',','')),
      vat_amount: 10, // 세금이 결제금액보다 크면 안됨
      tax_free_amount: 0,
      // router에 지정한 PayResult의 경로로 수정
      approval_url:  Route.user.payresult,
      fail_url: Route.user.payresult,
      cancel_url: Route.user.payresult, //127.0.0.1:3000
    },
  };

  componentDidMount() { // 최초에 한번 렌더링 (useState랑 비슷한 기능)
    const { fee , numberPlate } = this.props.location.state;

    console.log('fee : '+fee+'//'+'numberPlate : '+numberPlate);


    const { params } = this.state;
    axios({
      url: "/v1/payment/ready",
      method: "POST",
      headers: {
        Authorization: "KakaoAK 61ba2289c1c4f8b0fb0f53eb2ae8cf41", // admin 키
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params,
    }).then((response) => {
      const {
        data: { next_redirect_pc_url, tid },
      } = response;

      // console.log(next_redirect_pc_url);
      console.log(tid);
      // localstorage에 tid 저장
	    window.localStorage.setItem("tid", tid);
      this.setState({ next_redirect_pc_url, tid }); // 모바일 웹일 경우 next_redirect_mobile_url


      // reaplace : 주소 기록 남지않음, href : 주소 기록이 남음
      document.location.href = next_redirect_pc_url; 
    });

  }

  render() {
    const { next_redirect_pc_url } = this.state;
    return (
      
      <></>
      // <div>
      //   <h2>Pay page</h2>
      //   <a href={next_redirect_pc_url}>{next_redirect_pc_url}</a>
      // </div>
    );
  }
}
export default PayReady;