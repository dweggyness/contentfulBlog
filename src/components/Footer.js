import React from "react"
import styled from "styled-components"
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";


const FooterContainer = styled.footer`
    width: 80%;
    padding: 0 10%;
    height: 60px;
    background-color: ${props => props.theme.primaryColor};
    display: flex;
    align-self: flex-end;
    align-items: center;
    justify-content: space-between;
    
    @media (max-width: 768px) {
        width: 90%;
        padding: 0 5%;
    }
`

const FooterText = styled.span`
    font-family: 'Raleway';
    color: #222;
    justify-content: center;
`

const FooterLinks = styled.nav`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const IconLink = styled.a`
    text-decoration: none;
    color: #222;
    margin: 0 7px;

    .icon {
        &:hover, &:focus {
            transition: 0.1s all;
            transform: scale(1.1);
        }
    }
`


export default function Footer() {
    return (
        <FooterContainer>
            <FooterText>Published 2020 | Made by Jun Ming</FooterText>
            <FooterLinks>
                <IconLink href={"https://github.com/dweggyness/contentfulBlog"}>
                    <FaGithub className={'icon'} size={24}/>
                </IconLink>
                <IconLink href={"https://www.linkedin.com/in/ooi-jun-ming-1695251a9/"}>
                    <FaLinkedin className={'icon'} size={24}/>
                </IconLink>
                <IconLink href={"https://www.instagram.com/ojmming/"}>
                    <GrInstagram className={'icon'} size={22}/>
                </IconLink>
            </FooterLinks>
        </FooterContainer>
    )
}