import React, { useState } from "react"
import styled from "styled-components"
import { Checkbox } from '../components'
import { FaSort } from 'react-icons/fa'

const FilterContainer = styled.div`
  width: 100%;
  font-size: 16px;
  padding: 10px;
`

const IconContainer = styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: -2px;
    font-weight: 600;
`

export default function TeaFilterComponent({ setSortOption, value = 'latest' }) {
    const [curSelected, setCurSelected] = useState(value);

    const onCheckboxTick = (selected, e) => {
        setCurSelected(selected)
        setSortOption(selected);
    }

    return (
        <FilterContainer>
            <IconContainer>
                <FaSort style={{ marginRight: 5, display: 'block' }} size={20} />
                Sort by
            </IconContainer>
            <Checkbox 
                onChange={() => onCheckboxTick('latest')} 
                value={curSelected === 'latest'}
                label={'Latest'}
                style={{ marginTop: 10 }}
            />
            <Checkbox
                onChange={() => onCheckboxTick('oldest')}
                value={curSelected === 'oldest'}
                label={'Oldest'}
                style={{ marginTop: 5 }}
            />
            <Checkbox
                onChange={() => onCheckboxTick('highestRating')}
                value={curSelected === 'highestRating'}
                label={'Highest Rating'}
                style={{ marginTop: 5 }}
            />
            <Checkbox
                onChange={() => onCheckboxTick('lowestRating')}
                value={curSelected === 'lowestRating'}
                label={'Lowest Rating'}
                style={{ marginTop: 5 }}
            />
        </FilterContainer>
    )
}