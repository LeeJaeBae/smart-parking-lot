import React, {useEffect, useState} from 'react';
import Router from "./Router";
import GlobalStyles, {theme} from "../theme/GlobalStyles";
import styled, {ThemeProvider} from "styled-components";

// import {isMobile as detectedMobile} from "react-device-detect";

function App() {
    // const [isLogin, setIsLogin] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    useEffect(() => {
        // isMobile && setIsMobile(true);
        setIsMobile(true)
    }, [])
    return (
        <>
            <ThemeProvider theme={isMobile ? theme.mobile : theme.default}>
                <GlobalStyles/>
                <Container>
                    <Router/>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default App;

const Container = styled.div`
  width: ${props => props.theme.width};
  height: ${props => props.theme.height};
  border: ${props => props.theme.border};
`
