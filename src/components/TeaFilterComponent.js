import React, { useState } from "react"
import styled from "styled-components"
import { navigate } from 'gatsby'
import queryString from 'query-string';
import { Checkbox } from '../components'
import { FiFilter } from 'react-icons/fi'

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

export default function TeaFilterComponent({ queryParams, value }) {
    const [curSelected, setCurSelected] = useState(value);

    const onCheckboxTick = (selected, e) => {
        let urlParams = `${queryString.stringify(queryParams, {
            skipEmptyString: true
        })}`;
        if (urlParams) urlParams = `?${urlParams}`; // prepend ? if there are url params

        if (e.target.checked === false) { // untick a filter
            setCurSelected('');
            navigate(`/tea-reviews${urlParams}`);
        } else {
            switch(selected) {
                case 'Black Tea':
                    navigate(`/tea-reviews/black-tea${urlParams}`);
                    break;
                case 'Green Tea':
                    navigate(`/tea-reviews/green-tea${urlParams}`);
                    break;
                case 'Oolong Tea':
                    navigate(`/tea-reviews/oolong-tea${urlParams}`);
                    break;
                case 'Pu-Erh':
                    navigate(`/tea-reviews/pu-erh${urlParams}`);
                    break;
                case 'White Tea':
                    navigate(`/tea-reviews/white-tea${urlParams}`);
                    break;
                case 'Herbal Tea':
                    navigate(`/tea-reviews/herbal-tea${urlParams}`);
                    break;
                default:
            }
        }
    }

    
    return (
        <FilterContainer>
            <IconContainer>
                <FiFilter style={{ marginRight: 3, display: 'block' }} size={20} />
                Filter Teas
            </IconContainer>
            <Checkbox 
                onChange={(e) => onCheckboxTick('Black Tea', e)} 
                value={curSelected === 'Black Tea'}
                label={'Black'}
                style={{ marginTop: 10 }}
            />
            <Checkbox
                onChange={(e) => onCheckboxTick('Green Tea', e)}
                value={curSelected === 'Green Tea'}
                label={'Green'}
                style={{ marginTop: 5 }}
            />
            <Checkbox
                onChange={(e) => onCheckboxTick('Oolong Tea', e)}
                value={curSelected === 'Oolong Tea'}
                label={'Oolong'}
                style={{ marginTop: 5 }}
            />
            <Checkbox
                onChange={(e) => onCheckboxTick('Pu-Erh', e)}
                value={curSelected === 'Pu-Erh'}
                label={'Pu-Erh'}
                style={{ marginTop: 5 }}
            />
            <Checkbox
                onChange={(e) => onCheckboxTick('White Tea', e)}
                value={curSelected === 'White Tea'}
                label={'White'}
                style={{ marginTop: 5 }}
            />
            <Checkbox
                onChange={(e) => onCheckboxTick('Herbal Tea', e)}
                value={curSelected === 'Herbal Tea'}
                label={'Herbal'}
                style={{ marginTop: 5 }}
            />
        </FilterContainer>
    )
}