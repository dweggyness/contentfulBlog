import React from "react"
import styled from "styled-components"
import { Link } from "gatsby";

const Container = styled.div`
  max-width: 730px;
  margin: 0 5px;
  flex: 1;
  padding: 0 24px;
`

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  font-family: Raleway;
  margin: 0;
  position: relative;
`

const Description = styled.h2`
  font-size: 24px;
  font-weight: 500;
`

const Button = styled.button`
  height: 35px;
  width: 100px;
  padding: 0;
  margin-top: 15px;
  border: ${props => (`1.5px solid ${props.theme.primaryColor}`)};
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};

  border-radius: 5px;
  font-family: 'Raleway';
  text-decoration: none;
  outline: none;
  transition: ease-in 0.1s;

  &:hover {
      transform: translate(0, -1px);
      box-shadow: 0 1px 2px #BBB;
  }
  &:active {
      transform: translate(0, 1px);
      box-shadow: 0 1px 2px 1px #999;
  }
`

export default function Home() {
  return (
    <>
      <Container>
          <Title>404 Error</Title>
          <Description>
              You stumbled upon a non-existent page. O_O. Press the button to go back 
              to the home page.
          </Description>
          <Link to={'/'}><Button>Go Home</Button></Link>
      </Container>
    </>
  )
}