import React, { useState, useEffect } from "react"
import styled from "styled-components"

/* The switch - the box around the slider */
const SwitchContainer = styled.label`
    position: relative;
    display: inline-block;
    width: 36px;
    height: 15px;
    filter: drop-shadow(0 2px 2px #666);
`

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: background-color 0.15s ease-in;
    background-color: ${props => props.theme.lightHighlightColor};
    border-radius: 30px;

    ::before {
        position: absolute;
        content: "";
        height: 25px;
        width: 25px;
        left: -7px;
        bottom: -4px;
        background-color: white;
        transition: all 0.1s ease-in;
        border-radius: 20px;
    }
`

const SwitchInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked ~ ${Slider} {
        ::before {
            transform: translateX(25px);
        }
        transition: background-color 0.15s ease-in;
        background-color: ${props => props.theme.darkHighlightColor};
    }

    &:focused ~ ${Slider} {
        box-shadow: 0 0 3px #EEE;
    }
`

export default function Switch({ value, onChange }) {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setIsChecked(value);
    }, [value])

    const handleChange = (e) => {
        const newValue = isChecked ? false : true;
        setIsChecked(newValue);
        if (onChange) onChange(newValue);
    }

    return (
        <SwitchContainer>
            <SwitchInput 
                checked={isChecked}
                onChange={handleChange}
                type="checkbox"
            />
            <Slider />
        </SwitchContainer>
    )
}