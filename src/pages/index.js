import React from "react"
import styled from "styled-components"

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;

  padding: 0 10%;
`

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  font-family: Raleway;
  margin: 0;
  position: relative;

  ::before {
    height: 15px;
    content: "Tea Reviews";
    color: transparent;
    position: absolute;
    top: 30px;
    left: -15px;
    z-Index: -1;

    background-color: ${props => props.theme.primaryColor};
  }
`

const Description = styled.p`
  padding: 0;
  font-size: 18px;
  line-height: 22px;
`


export default function Home() {
  return (
    <>
      <InfoContainer>
        <Title>
          Tea Reviews
        </Title>
        <Description>
          A catalog of the various teas I have tried, along with my opinions on them.
        </Description>
      </InfoContainer>
    </>
  )
}
