import React from "react"
import styled from "styled-components"
import { Helmet } from "react-helmet"

const ContactContainer = styled.div`
  max-width: 730px;
  margin: 0 5px;
  flex: 1;
  padding: 0 24px;
`

const Title = styled.h1`
  font-size: 1.8em;
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

const Description = styled.h2`
  font-size: 1em;
  font-weight: 500;
`

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  width: 100%;
`

const InputLabel = styled.label`
  width: 47%;
  margin-bottom: 15px;
  height: 30px;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const TextBoxLabel = styled.label`
  width: 100%;
`

const Input = styled.input`
  width: 100%;
  height: 100%;
  font-family: 'Cooper Hewitt';
  background-color: ${props => props.theme.modalColor};
  border-radius: 4px;
  padding: 0 10px;
  color: ${props => props.theme.textColor};

  box-sizing: border-box;
  border: ${props => (props.theme.formInputBorderColor ? `1px solid ${props.theme.formInputBorderColor}` : 'none')};

  &::placeholder {
    color: ${props => (props.theme.textColor)};
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    box-sizing: border-box;
    border: ${props => (`2px solid ${props.theme.primaryColor}`)};
  }
`

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  font-family: 'Cooper Hewitt';
  background-color: ${props => props.theme.modalColor};
  border-radius: 4px;
  padding: 5px 10px;
  color: ${props => props.theme.textColor};
  
  box-sizing: border-box;
  border: ${props => (props.theme.formInputBorderColor ? `1px solid ${props.theme.formInputBorderColor}` : 'none')};

  &::placeholder {
    color: ${props => (props.theme.textColor)};
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    box-sizing: border-box;
    border: ${props => (`2px solid ${props.theme.primaryColor}`)};
  }
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
      <Helmet>
          <meta charSet="utf-8" />
          <title>Contact</title>
      </Helmet>
      <ContactContainer>
          <Title>contact</Title>
          <Description>Feel free to drop me a message! Recommend me a tea, ask for opinions, or anything at all!</Description>

          <Form name="contact" method="POST" data-netlify="true" action="/contact/success">
              <input type="hidden" name="form-name" value="contact" />
              <InputLabel>
                  <Input placeholder="Name" type="text" name="name" required/>
              </InputLabel>
              <InputLabel>
                  <Input placeholder="Email" type="email" name="email" required/>
              </InputLabel>
              <TextBoxLabel>
                  <TextArea placeholder="Message" name="message" rows="5" />
              </TextBoxLabel>
              <Button type="submit">Send</Button>
          </Form>
      </ContactContainer>
    </>
  )
}