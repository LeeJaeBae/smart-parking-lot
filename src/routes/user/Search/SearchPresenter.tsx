import React, {Dispatch, useState} from 'react';
import styled from 'styled-components';
import find from '../../../img/find.png'
import {Link, useLocation} from 'react-router-dom';
import Template from "../../../components/templates/mobile";

const SearchPresenter: React.FC<{ handleSubmit: any, setCarId: Dispatch<React.SetStateAction<string>> }> = ({
                                                                                                                handleSubmit,
                                                                                                                setCarId
                                                                                                            }) => {

    return (
        <Template>
            <div>
                <form onSubmit={handleSubmit}>
                    <InputSearch type="text" onChange={(e) => setCarId(e.target.value)}/>
                    <InputSubmit type="submit" icon={find} value={" "}/>
                </form>
            </div>
            <Information>
                <Link to={"/information"}>주차장 혼잡도 확인하기</Link>
            </Information>
        </Template>
    );
};

export default SearchPresenter;

const Container = styled.div`
  text-align: center;
  padding-top: 150px;
`

const Logo = styled.div`
  margin-bottom: 50px;

  img {
    width: 200px;
    height: 150px;
  }
`

const InputSearch = styled.input`
  background-color: white;
  border-color: #1459f9;
  width: 260px;
  height: 35px;
`

const InputSubmit = styled.input<{ icon: string }>`
  background-image: url(${props => props.icon});
  width: 40px;
  height: 40px;
  background-size: cover;
  border: none;
`

const Information = styled.div`
  margin-top: 20px;
`