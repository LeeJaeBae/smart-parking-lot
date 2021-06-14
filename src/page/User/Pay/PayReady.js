import React from "react";
import axios from "axios";

class PayReady extends React.Component {
  state = {
    next_redirect_pc_url: "",
    tid: "",
    params: {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: "스마로",
      quantity: 1,
      total_amount: 100,
      vat_amount: 10,
      tax_free_amount: 0,
      // router에 지정한 PayResult의 경로로 수정
      approval_url: "http://localhost:3000/payresult",
      fail_url: "http://localhost:3000/payresult",
      cancel_url: "http://localhost:3000/payresult",
    },
  };

  componentDidMount() { // 최초에 한번 렌더링 (useState랑 비슷한 기능)
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
        data: { next_redirect_mobile_url, tid },
      } = response;

      // console.log(next_redirect_pc_url);
      console.log(tid);
      // localstorage에 tid 저장
	    window.localStorage.setItem("tid", tid);
      this.setState({ next_redirect_mobile_url, tid }); // 모바일 웹일 경우 next_redirect_mobile_url
    });
  }

  render() {
    const { next_redirect_mobile_url } = this.state;
    return (
      <div>
        <h2>Pay page</h2>
        <a href={next_redirect_mobile_url}>{next_redirect_mobile_url}</a>
      </div>
    );
  }
}
export default PayReady;