import React from 'react';
import styled from "styled-components";
import mobileLogo from "../../../img/mobile_logo.png";

const Header = () => {
    return (
        <Logo>
            <img src={mobileLogo} alt="mobile_logo"/>
        </Logo>
    );
};

export default Header;

const Logo = styled.div`
  margin-bottom: 50px;

  img {
    width: 200px;
    height: 150px;
  }
`