import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import { Link } from "gatsby" // highlight-line
import logo from '../../static/Logo.png'
import Navbar from './Navbar';

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
    background-color: #99b898;
    display: flex;
    justify-content: space-between;
`

const GlobalStyle = createGlobalStyle`
    body {
        width: 100%;
        margin: 0;
        color: #333;
    }
`

export default function Layout({ children }) {
    return ( 
        <Container>
            <GlobalStyle />
            <Header>
                <Link style={{ zIndex: 999, marginLeft: '10%' }} to="/">
                    <img style={{ height: 75 }} src={logo}></img>
                </Link>
                <Navbar />
            </Header>
            <Main>{children}</Main>
        </Container>
    )
}