import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const NavLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 25px;
    height: 90%;

    font-family: 'Raleway';
    font-weight: 700;
    font-size: 20px;
    text-decoration: none;
    transition: 0.15s;

    &:visited {
        color: #333;
    }
        
    &:hover, &:focus {
        color: #2d5225;
        background-color: white;
    }

    @media (max-width: 768px) {
        margin: 5px 0;
        border-radius: 2px;
    }
`

export default function NavbarLinks () {
    return (
        <>
            <NavLink 
                partiallyActive={true} 
                activeStyle={{ backgroundColor: 'white' }} 
                to="/tea-reviews"
            >
                TEA REVIEWS
            </NavLink>
            <NavLink
                partiallyActive={true}
                activeStyle={{ backgroundColor: 'white' }}
                to="/blog"
            >
                BLOG
            </NavLink>
            <NavLink 
                partiallyActive={true}
                activeStyle={{ backgroundColor: 'white' }}
                to="/about"
            >
                ABOUT
            </NavLink>
        </>
    )
}