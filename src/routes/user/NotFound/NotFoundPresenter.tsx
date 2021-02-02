import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Template from "../../../components/templates/mobile";
import Error from '../../../img/error.png'

const NotFoundPresenter = () => {
    return (
        <Template>
            <>
                <ErrorImg>
                    <img src={Error} alt="error_img"/>
                </ErrorImg>
                <TextWrapper>
                    <div>위치를 조회할 수 없습니다.</div>
                    <div>※지속 조회 불가 시 관리자 문의 바랍니다.</div>
                </TextWrapper>
                <div>
                    <Link to={"/"}>HOME</Link>
                </div>
            </>
        </Template>
    );
};

export default NotFoundPresenter;

const ErrorImg = styled.div`
  margin-top: 20px;

  img {
    width: 100px;
    height: 90px;
  }
`

const TextWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`
