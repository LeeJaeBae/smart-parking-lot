import React, {FC} from 'react';
import Body from './Body';
import Header from "./Header";
import styled from "styled-components";

const Template: FC = ({children}) => {
    return (
        <Container>
            <Header/>
            <Body>
                {children}
            </Body>
        </Container>
    );
};

export default Template;

const Container = styled.div`
  text-align: center;
  padding-top: 150px;
`
