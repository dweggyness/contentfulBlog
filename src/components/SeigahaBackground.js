import React from "react"
import styled from "styled-components";

import bgImageLight from '../../static/seigaihaLight.png'
import bgImageDark from '../../static/seigaihaDark.png'

const Background = styled.div`
    background-image: ${props => (props.theme.curTheme === 'light' 
    ? `url(${bgImageLight})` 
    : `url(${bgImageDark})`
    )};
    background-repeat: repeat-x;

    z-index: -1;
    opacity: ${props => (props.theme.curTheme === 'light' ? 0.6 : 0.3)};
    height: 200px;
    width: 100%;
    margin: -50px 0 -100px;
`

export default function SeigahaBackground() {
    return (
        <Background />
    )
}