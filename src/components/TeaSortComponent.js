import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { navigate } from 'gatsby'
import { Checkbox } from '../components'
import { MdSort } from 'react-icons/md'

const FilterContainer = styled.div`
  width: 100%;
  font-size: 16px;
  padding: 10px;
`

export default function TeaFilterComponent({ value = 'Latest' }) {
    const [curSelected, setCurSelected] = useState(value);

    const onCheckboxTick = (selected, e) => {
        setCurSelected(selected)
    }

    
    return (
        <FilterContainer>
            <span><MdSort size={20} />Sort</span>
            <Checkbox 
                onChange={() => onCheckboxTick('Latest')} 
                value={curSelected === 'Latest'}
                label={'Latest'}
            />
            <Checkbox
                onChange={() => onCheckboxTick('Oldest')}
                value={curSelected === 'Oldest'}
                label={'Oldest'}
            />
            <Checkbox
                onChange={() => onCheckboxTick('Highest Rating')}
                value={curSelected === 'Highest Rating'}
                label={'Highest Rating'}
            />
            <Checkbox
                onChange={() => onCheckboxTick('Lowest Rating')}
                value={curSelected === 'Lowest Rating'}
                label={'Lowest Rating'}
            />
        </FilterContainer>
    )
}