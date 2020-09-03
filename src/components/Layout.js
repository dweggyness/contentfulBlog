import React, { useState, useEffect } from "react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet";
import dwegsteaBannerLightText from '../../static/dwegsteaBannerLightText.png'
import dwegsteaBannerDarkText from '../../static/dwegsteaBannerDarkText.png'
import { Navbar, Footer } from '.'

const headerHeight = '75px';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    flex: 1;
    margin: 50px 0 0;
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
        transition: all 0.1s ease-in;
    }
`

const sharedTheme = {
    primaryColor: '#99b898',
    secondaryColor: '#2d5225',
    lightHighlightColor: '#FFDB83',
    darkHighlightColor: '#2F6099',
}

const lightTheme = {
    ...sharedTheme,
    curTheme: 'light',
    highlightColor: sharedTheme.darkHighlightColor,
    backgroundColor: '#FCFCFC',
    modalColor: '#F3F3F3',
    textColor: '#222222',
    formInputBorderColor: '#BABABA',
}

const darkTheme = {
    ...sharedTheme,
    curTheme: 'dark',
    highlightColor: sharedTheme.lightHighlightColor,
    primaryColor: '#749273',
    backgroundColor: '#1D1D1D',
    modalColor: '#2C2C2C',
    textColor: '#EEEEEE',
}

export default function Layout({ children }) {
    const [curTheme, setCurTheme] = useState('light');

    useEffect(() => {
        const persistedTheme = localStorage.getItem('appearance');
        if (persistedTheme) setCurTheme(persistedTheme);
    }, [])

    const setNewTheme = (theme) => {
        if (theme !== 'light' && theme !== 'dark') setCurTheme('light');
        else {
            localStorage.setItem('appearance', theme);
            setCurTheme(theme);
        }
    }

    return (
        <Container>
            <Helmet htmlAttributes={{ lang : 'en' }}>
                <meta charSet="utf-8" />
                <meta name="description" content="Dwegstea"></meta>
                <title>Dwegstea</title>
            </Helmet>
            <ThemeProvider theme={curTheme === 'light' ? lightTheme : darkTheme}>
                <GlobalStyle />
                <Header>
                    <Link style={{ zIndex: 999, marginLeft: '10%' }} to="/">
                        { curTheme === 'light' 
                            ? <img style={{ height: 75 }} alt="dwegstea logo" src={dwegsteaBannerDarkText}></img>
                            : <img style={{ height: 75 }} alt="dwegstea logo" src={dwegsteaBannerLightText}></img>
                        }
                    </Link>
                    <Navbar theme={curTheme} setNewTheme={setNewTheme}/>
                </Header>
                <Main>{children}</Main>
                <Footer />
            </ThemeProvider>
        </Container>
    )
}

export const query = graphql`
    fragment PostData on ContentfulTeaReviewPost {
        updatedAt(formatString: "DD.MM.YY")
        createdAt
        teaName
        teaSource
        rating
        teaType
        slug
        thumbnail {
            fluid(maxWidth: 500) {
                ...GatsbyContentfulFluid
            }
        }
    }
    fragment BlogPreview on ContentfulTeaBlogPost {
        updatedAt(formatString: "DD.MM.YY")
        createdAt
        title
        slug
        thumbnail {
            fluid(maxWidth: 500) {
                ...GatsbyContentfulFluid
            }
        }
    }
`