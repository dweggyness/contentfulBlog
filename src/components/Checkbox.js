import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { hexToRGBA } from '../utils/hexToRGBA';

const CheckboxLabel = styled.label`
    position: relative;
    display: flex;
    height: 16px;
`

const LabelText = styled.p`
    margin: 0 0 0 14px;
    font-family: 'Raleway';
    font-size: 14px;
    font-weight: 500;
`

const CheckboxInput = styled.input`
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
`

const Checkmark = styled.span`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    height: 14px;
    width: 14px;
    border-radius: 1px;
    background-color: ${props => props.theme.backgroundColor};
    border: ${props => (`1px solid ${props.theme.textColor}`)};

    &:hover {
        background-color: ${props => props.theme.primaryColor};
    }
`

const Checktick = styled.span`
    width: 8px;
    height: 8px;
    background-color: ${props => props.theme.textColor};
`

export default function Checkbox({ label = '', value = false, onChange }) {
    const handleChange = (e) => {
        if (onChange) onChange(e);
    }

    return (
        <>
            <CheckboxLabel>
                <CheckboxInput
                    value={value}
                    onChange={handleChange}
                    checked={value}
                    type="checkbox"
                />
                <Checkmark isChecked={value}>
                    {value && <Checktick />}
                </Checkmark>
                <LabelText>{label}</LabelText>
            </CheckboxLabel>
        </>
    )
}