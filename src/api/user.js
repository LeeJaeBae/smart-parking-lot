import axios from './axios';

export const getCheckSpace = (setState) =>
    axios.get(`/checkSpace`).then((res) => {
        res.data.emptySpace && setState(res.data.emptySpace);
    });
// 내 차 위치
export const getLocationCar = (setState , numberPlate) =>
    axios.get(`/locationCar` , {params:{numberPlate}}).then((res) => {
    res.data.locationCar && res.data.locationCar.length === 0
    ? setState([{ locationCar : 'testArea' , fee: 9999}])
    : setState(res.data.locationCar)
    }).catch((e)=>{
        alert('차번호가 존재하지 않습니다')
    });
// 차번호 검색 자동완성
export const getAutoCompleteData = (inputWord , setState) => 
    axios.get(`/searchCarList` , {params : {numberPlate:inputWord}}).then((res) => {
        console.log(res.data.carList);
        setState(res.data.carList);
    })





// 현재 요금 가져오기 (income)
export const getFee = (setState) =>
    axios.get(`/searchFee`).then((res) => {
        res.data.feeInfo && setState(res.data.feeInfo);
    });


// 카카오페이 결제/////
// 결제 준비 api -> 카톡 메시지 발송 -> 결제 수단 선택 -> 결제 승인 api
// 필수 : cid , partner_order_id , partner_user_id, item_name, quantity, total_amount, 
// tax_free_amount, approval_url, cancel_url, cancel_url
export const payReady = (params , setState) => {
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
    })
}

    // axios.post(`/v1/payment/ready`, 
    //     {
    //         params : {
    //         next_redirect_pc_url: "",
    //         tid: "",
            
    //           cid: "TC0ONETIME",
    //           partner_order_id: "partner_order_id",
    //           partner_user_id: "partner_user_id",
    //           item_name: "스마로",
    //           quantity: 1,
    //           total_amount: 100,
    //           vat_amount: 10,
    //           tax_free_amount: 0,
    //           // router에 지정한 PayResult의 경로로 수정
    //           approval_url: "http://localhost:3000/payresult",
    //           fail_url: "http://localhost:3000/payresult",
    //           cancel_url: "http://localhost:3000/payresult",
    //         },
    //         Headers: {

    //             Authorization: "KakaoAK 61ba2289c1c4f8b0fb0f53eb2ae8cf41",
    //             "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
    //         }
    //     }
    // ).then((response) => {
    //         // res.data && setState(res.data);
    //         const {
    //             data: { next_redirect_mobile_url, tid }
    //         } = response;

    //         window.localStorage.setItem("tid" , tid);
    //         setState({next_redirect_mobile_url, tid})            
    //     // res.data && console.log(res.data); //response data (next_redirect_mobile_url , next_redirect_pc_url)
    //     // next_redirect_pc_url 과 tid(결제고유번호)를 저장
            
    //         // url에 붙어서 온 pg_token을 결제 API에 줄 params에 할당
    //         // params.pg_token = search.split("=")[1];  이거 어디다 넣냐...
    // });

    // 결제 승인
export const payResult = ( pg_token , setState ) => 
    axios.post(`/v1/payment/approve`, {
        Headers: {
            Authorization: "KakaoAK 61ba2289c1c4f8b0fb0f53eb2ae8cf41",
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        params: {
            cid: "TC0ONETIME", // 가맹점코드, 테스트결제는 TC0ONETIME 사용
            tid: window.localStorage.getItem("tid"), // 결제 고유번호, 결제준비 api에 포함
            partner_order_id: "partner_order_id", // 가맹점 주문번호
            partner_user_id: "partner_user_id", // 가맹점회원 id
            pg_token: "" // 결제승인 요청을 인증하는 토큰, 사용자 결제 수단 선택 완료 시, approval_url로 redirection해줄 때 pg_token을 query string으로 전달
        }}).then((res) => {
        res.data && console.log(res.data); //response data (next_redirect_mobile_url	, next_redirect_pc_url)
    })