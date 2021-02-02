import React from 'react';
import styled from 'styled-components';
import Template from "../../../components/templates/mobile";

interface InformationProps {
    carId: string,
    pushToHome: () => void,
    handlePay: () => void
}

const InformationPresenter: React.FC<InformationProps> = ({carId, pushToHome, handlePay}) => {
    return (
        <Template>
            <>
                <Location>
                    차량번호 : {carId}
                    <br/>
                    위치는 A19 이며,
                    요금은 4000원 입니다
                </Location>
                <div>(주차장 약도 들어갈 자리)</div>
                <BtnWrapper>
                    <Btn onClick={pushToHome}>다시 검색하기</Btn>
                    <Btn onClick={handlePay}>결제하기</Btn>
                </BtnWrapper>
            </>
        </Template>
    );
};

export default InformationPresenter;

const Location = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`

const BtnWrapper = styled.div`
  margin-top: 30px;
`;

const Btn = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: none;
  color: white;

  &:first-child {
    background-color: #12c386;
  }

  &:last-child {
    background-color: #f0b416;
  }
`