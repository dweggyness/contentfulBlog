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
    width: 80%;
    padding: 0 10%;
    height: ${headerHeight};
    background-color: #99b898;
    display: flex;
    justify-content: space-between;
`

const NavItemContainer = styled.nav`
    display: flex;
    align-items: flex-end;
    flex-direction: row;
    padding-right: 30;
`

const NavLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 25px;
    marginTop: 10%;
    height: 90%;

    font-family: 'Raleway';
    font-weight: 600;
    font-size: 16px;
    text-decoration: none;
    transition: 0.15s;

    &:visited {
        color: #333;
    }
        
    &:hover, &:focus {
        color: #2d5225;
        background-color: white;
    }
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
                <Link to="/">
                    <img style={{ height: 75 }} src={logo}></img>
                </Link>
                <NavItemContainer>
                    <NavLink activeStyle={{ backgroundColor: 'white' }} to="/tea-reviews">Tea Reviews</NavLink>
                    <NavLink activeStyle={{ backgroundColor: 'white' }} to="/blog">Blog</NavLink>
                    <NavLink activeStyle={{ backgroundColor: 'white' }} to="/about">About</NavLink>
                </NavItemContainer>
            </Header>
            <Main>{children}</Main>
        </Container>
    )
}