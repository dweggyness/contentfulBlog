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

export default function TeaFilterComponent({ setSortOption, value = 'latest' }) {
    const [curSelected, setCurSelected] = useState(value);

    const onCheckboxTick = (selected, e) => {
        setCurSelected(selected)
        setSortOption(selected);
    }

    
    return (
        <FilterContainer>
            <span><MdSort size={20} />Sort</span>
            <Checkbox 
                onChange={() => onCheckboxTick('latest')} 
                value={curSelected === 'latest'}
                label={'Latest'}
            />
            <Checkbox
                onChange={() => onCheckboxTick('oldest')}
                value={curSelected === 'oldest'}
                label={'Oldest'}
            />
            <Checkbox
                onChange={() => onCheckboxTick('highestRating')}
                value={curSelected === 'highestRating'}
                label={'Highest Rating'}
            />
            <Checkbox
                onChange={() => onCheckboxTick('lowestRating')}
                value={curSelected === 'lowestRating'}
                label={'Lowest Rating'}
            />
        </FilterContainer>
    )
}