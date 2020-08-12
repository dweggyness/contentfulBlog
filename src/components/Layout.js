import React, { useState } from "react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import { Link } from "gatsby" // highlight-line
import logo from '../../static/Logo.png'
import Navbar from './Navbar'
import colors from '../constants/colors'

const headerHeight = '75px';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 50px 10% 0;
    font-family: 'Cooper Hewitt';
`

const Header = styled.header`
    width: 100%;
    height: ${headerHeight};
    background-color: ${colors.green};
    display: flex;
    justify-content: space-between;
`

const GlobalStyle = createGlobalStyle`
    body {
        width: 100%;
        margin: 0;
        color: ${props => (props.theme.textColor)};
        background-color: ${props => (props.theme.backgroundColor)};
    }
`

const sharedTheme = {
    primaryColor: '#99b898'
}

const lightTheme = {
    backgroundColor: 'white',
    textColor: '#333',
}

const darkTheme = {
    backgroundColor: '#1e1938',
    textColor: '#AAA'
}

export default function Layout({ children }) {
    const [curTheme, setCurTheme] = useState('light');

    const setNewTheme = (theme) => {
        if (theme !== 'light' && theme !== 'dark') setCurTheme('light');
        else setCurTheme(theme);
    }

    return (
        <Container>
            <ThemeProvider theme={curTheme === 'light' ? lightTheme : darkTheme}>
                <GlobalStyle />
                <Header>
                    <Link style={{ zIndex: 999, marginLeft: '10%' }} to="/">
                        <img style={{ height: 75 }} src={logo}></img>
                    </Link>
                    <Navbar setNewTheme={setNewTheme}/>
                </Header>
                <Main>{children}</Main>
            </ThemeProvider>
        </Container>
    )
}