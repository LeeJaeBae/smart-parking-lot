import React from 'react';
import styled from 'styled-components';
import mobileLogo from '../../../img/mobile_logo.png'
import find from '../../../img/find.png'

const SearchPresenter = () => {
    return (
        <Container>
            <Logo>
                <img src={mobileLogo} alt="mobile_logo"/>
            </Logo>
            <div>
                <form action="" method="POST">
                    <div>
                        <InputSearch type="text" id="searchMyCarNum" name="myCarNum"/>
                        <InputSubmit type="submit" id="search" icon={find} value={" "}/>
                    </div>
                </form>
            </div>
            <Information>
                <a href="">주차장 혼잡도 확인하기.</a>
            </Information>
        </Container>
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

// const SearchBar = styled.div`
// `

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