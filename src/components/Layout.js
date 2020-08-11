import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import { Link } from "gatsby" // highlight-line
import logo from '../../static/Logo.png'

const headerHeight = '75px';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const NavItemContainer = styled(Container)`
    flex-direction: row;
    padding-right: 30;
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 0px 10%;
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
    }
`

export default function Layout({ children }) {
    return ( 
        <Container>
            <GlobalStyle />
            <Header>
                <Link to="/">
                    <img style={{ height: 75 }} src={logo}></img>
                </Link>
                <NavItemContainer>
                    <nav>
                        <Link to="/tea-reviews">Tea Reviews</Link>
                    </nav>
                    <nav>
                        <Link to="/blog">Blog</Link>
                    </nav>
                    <nav>
                        <Link to="/about">About</Link>
                    </nav>
                </NavItemContainer>
            </Header>
            <Main>{children}</Main>
        </Container>
    )
}