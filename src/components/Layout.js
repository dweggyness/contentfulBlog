import React, { useState } from "react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import { Link } from "gatsby"
import logo from '../../static/Logo.png'
import Navbar from './Navbar'

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
    background-color: ${props => props.theme.primaryColor};
    display: flex;
    justify-content: space-between;
`

const GlobalStyle = createGlobalStyle`
    body {
        width: 100%;
        margin: 0;
        color: ${props => props.theme.textColor};
        background-color: ${props => props.theme.backgroundColor};
    }
`
/*
    orange: '#feceab',
    red: '#ff493d',
    white: '#fafffa',
    black: '#333',
*/
const sharedTheme = {
    primaryColor: '#99b898',
    secondaryColor: '#2d5225',
}

const lightTheme = {
    ...sharedTheme,
    curTheme: 'light',
    backgroundColor: '#EEEEEE',
    textColor: '#222',
}

const darkTheme = {
    ...sharedTheme,
    curTheme: 'dark',
    primaryColor: '#7aa178',
    backgroundColor: '#2b244f',
    textColor: '#EEE'
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