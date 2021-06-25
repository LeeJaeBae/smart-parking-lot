import React from "react";
import axios from "axios";
import styled from 'styled-components';
import userlogo_img from '../../../style/img/sumaro_circle.png';
import { Link, useLocation , Redirect } from 'react-router-dom';
import './payresult.css';

import { Route } from '../../../config/routes';

const Background = styled.div`
	text-align: center;
	padding-top: 120px;
`;

const User_logo = styled.div`
	margin: 0 auto;
	width: 120px;
	height: 120px;
	margin-bottom: 15px;
	background-image: url(${userlogo_img});
	background-size: contain;
	background-repeat: no-repeat;
`;
class PayResult extends React.Component {
  constructor(props) {
    super(props);
    const { params } = this.state;
    const {
      location: { search },
    } = props;

    // url에 붙어서 온 pg_token을 결제 API에 줄 params에 할당
    params.pg_token = search.split("=")[1];
  }

  state = {
    params: {
      cid: "TC0ONETIME",
      // localstorage에서 tid값을 읽어온다.
      tid: window.localStorage.getItem("tid"),
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      pg_token: "",
    },
  };

  componentDidMount() {
    const { params } = this.state;

    console.log(this.state.pg_token)

    axios({
      url: "/v1/payment/approve",
      method: "POST",
      headers: {
        Authorization: "KakaoAK 61ba2289c1c4f8b0fb0f53eb2ae8cf41",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params,
    }).then((response) => {
      // 결제 승인에 대한 응답 출력
      console.log(response);
    });
  }

  render() {
    return (
      <Background>
        <Link to="/">
				<User_logo></User_logo>
				</Link> <br/>
        <h1>
          결제가 완료되었습니다
        </h1>
        <div>
        <Link to={Route.user.main}>
					<button
						select='main'
						id='go_to_main'
						className='buttons'>
						처음으로
					</button>
					</Link>
        </div>

      </Background>
    );
  }
}
export default PayResult;