import React, { useContext } from "react"
import styled, { ThemeContext } from "styled-components"
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

    & .active {
        background-color: ${props => props.theme.backgroundColor};
    }

    &:visited {
        color: #222;
    }
        
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
    padding: 0 25px 5px;
    height: 90%;
`

const ThemeSwitchText = styled.span`
    color: #222;
    margin-top: 10px;
    font-family: 'Raleway';
    font-weight: 600;
    font-size: 12px;
`

export default function NavbarLinks ({ setNewTheme }) {
    const theme = useContext(ThemeContext);

    const currentThemeText = theme.curTheme === 'light' ? 'LIGHT' : 'DARK';

    return (
        <>
            <NavLink 
                partiallyActive={true} 
                activeClassName="active" 
                to="/tea-reviews"
            >
                TEA REVIEWS
            </NavLink>
            <NavLink
                partiallyActive={true}
                activeClassName="active"
                to="/blog"
            >
                BLOG
            </NavLink>
            <NavLink 
                partiallyActive={true}
                activeClassName="active"
                to="/about"
            >
                ABOUT
            </NavLink>
            <ThemeToggleContainer>
                <Switch onChange={(e) => e ? setNewTheme('dark') : setNewTheme('light')}/>
                <ThemeSwitchText>{currentThemeText}</ThemeSwitchText>
            </ThemeToggleContainer>
        </>
    )
}