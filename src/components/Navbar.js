import React, { useState } from "react"
import styled from "styled-components"
import { NavbarLinks } from '.'

const Toggle = styled.nav`
  display: none;
  height: 75%;
  cursor: pointer;
  align-self: center;
  padding: 0 15px;
  margin-right: 10px;
  z-Index: 3;
  border-radius: 2px;
  background-color: ${props => props.theme.backgroundColor};
  border-bottom: ${props => (`1px solid ${props.theme.secondaryColor}`)};

  @media (max-width: 768px) {
    display: flex;
  }
`

const Navbox = styled.nav`
    display: flex;
    align-items: flex-end;
    flex-direction: row;
    padding-right: 10vw;
    z-index: 2;

    @media (max-width: 768px) {
        flex-direction: column;
        position: absolute;
        padding: 25px 0;
        width: 100%;
        align-items: center;
        justify-content: flex-start;
        background-color: ${props => props.theme.primaryColor};
        transition: all 0.1s ease-in;
        opacity: ${props => (props.open ? "100%" : "0%")};
        top: ${props => (props.open ? "75px" : "-75px")};
    }
`

const Hamburger = styled.div`
  background-color: ${props => props.theme.textColor};
  width: 30px;
  height: 3px;
  transition: all 0.1s linear;
  align-self: center;
  position: relative;
  transform: ${props => (props.open ? "rotate(-45deg)" : "inherit")};

  ::before,
  ::after {
    width: 30px;
    height: 3.5px;
    background-color: ${props => props.theme.textColor};
    content: "";
    position: absolute;
  }

  ::before {
    transform: ${props =>
      props.open ? "rotate(-90deg) translate(-10px, 0px)" : "rotate(0deg)"};
    top: -10px;
  }

  ::after {
    opacity: ${props => (props.open ? "0" : "1")};
    top: 10px;
  }
`
export default function Navbar ({ theme, setNewTheme }) {
  const [navbarOpen, setNavbarOpen] = useState(false)

  return (
    <>
        <Toggle
            navbarOpen={navbarOpen}
            onClick={() => setNavbarOpen(!navbarOpen)}
        >
            {navbarOpen ? <Hamburger open /> : <Hamburger />}
        </Toggle>
        <Navbox open={navbarOpen}>
            <NavbarLinks 
              onNavigate={() => setNavbarOpen(false)} 
              setNewTheme={setNewTheme} 
              theme={theme}
            />
        </Navbox>
    </>
  )
};