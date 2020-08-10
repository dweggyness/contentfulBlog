import React from "react"
import styled, { createGlobalStyle } from "styled-components"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Main = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Header = styled.header`
    width: 100%;
    height: 100px;
    background-color: #99b898;
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
            <Header />
            <Main>{children}</Main>
        </Container>
    )
}