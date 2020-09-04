import React, { useState, useEffect } from "react"
import styled from "styled-components"
import queryString from 'query-string';
import { navigate } from 'gatsby'
import { Checkbox } from '../components'
import { FaSort } from 'react-icons/fa'

const FilterContainer = styled.div`
  width: 100%;
  font-size: 0.8em;
  padding: 10px;
`

const IconContainer = styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: -2px;
    font-weight: 600;
`

export default function TeaFilterComponent({ setSortBy, currentPath, value = 'latest' }) {
    const [curSelected, setCurSelected] = useState(value);

    useEffect(() => {
        const validSortingOptions = ['latest','oldest','highestRating','lowestRating'];
        if (validSortingOptions.includes(value) !== true) {
            setCurSelected('');
        } 
    }, [value])

    const onCheckboxTick = (selected, e) => {
        setCurSelected(selected)
        setSortBy(selected);
        let urlParams = `${queryString.stringify({ sortBy: selected }, {
            skipEmptyString: true
        })}`;
        if (urlParams) urlParams = `?${urlParams}`; // prepend ? if there are url params
        
        navigate(`${currentPath}${urlParams}`);
    }

    return (
        <FilterContainer>
            <IconContainer>
                <FaSort style={{ marginRight: 3, display: 'block' }} size={20} />
                Sort by
            </IconContainer>
            <Checkbox 
                onChange={() => onCheckboxTick('')} 
                value={curSelected === 'latest' || curSelected === ''}
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