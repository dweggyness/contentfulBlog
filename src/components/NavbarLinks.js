import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Switch from '../components/Switch';

const NavLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 25px;
    height: 90%;

    font-family: 'Raleway';
    font-weight: 600;
    font-size: 20px;
    text-decoration: none;
    transition: 0.15s;
    color: #222;
        
    &:hover, &:focus {
        color: ${props => props.theme.textColor};
        background-color: ${props => props.theme.backgroundColor};
    }

    @media (max-width: 768px) {
        margin: 5px 0;
        border-radius: 2px;
    }
`

const ThemeToggleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 0 0 5px 25px;
    height: 90%;

    @media (max-width: 768px) {
        flex-direction: row;
        margin: 25px 0 0;
        padding: 0 0 5px 0px;
    }
`

export default function NavbarLinks ({ onNavigate, theme, setNewTheme }) {
    const currentThemeText = theme === 'light' ? 'LIGHT' : 'DARK';

    return (
        <>
            <NavLink 
                partiallyActive={true} 
                activeStyle={{ backgroundColor: theme.backgroundColor, color: theme.textColor }} 
                to="/tea-reviews"
                onClick={onNavigate}
            >
                TEA REVIEWS
            </NavLink>
            <NavLink
                partiallyActive={true}
                activeStyle={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
                to="/blog"
                onClick={onNavigate}
            >
                BLOG
            </NavLink>
            <NavLink
                partiallyActive={true}
                activeStyle={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
                to="/contact"
                onClick={onNavigate}
            >
                CONTACT
            </NavLink>
            <ThemeToggleContainer>
                <Switch 
                    label={currentThemeText}
                    value={theme === 'dark'} 
                    onChange={(e) => e ? setNewTheme('dark') : setNewTheme('light')}
                />
            </ThemeToggleContainer>
        </>
    )
}