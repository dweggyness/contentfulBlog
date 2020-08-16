import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { navigate } from 'gatsby'
import { Checkbox } from '../components'
import { FiFilter } from 'react-icons/fi'

const FilterContainer = styled.div`
  width: 100%;
  font-size: 16px;
  padding: 10px;
`

export default function TeaFilterComponent({ value }) {
    const [curSelected, setCurSelected] = useState(value);

    const onCheckboxTick = (selected, e) => {
        if (e === false) { // untick a filter
            navigate('/tea-reviews');
        } else {
            switch(selected) {
                case 'Black Tea':
                    navigate('/tea-reviews/black-tea');
                    break;
                case 'Green Tea':
                    navigate('/tea-reviews/green-tea');
                    break;
                case 'Oolong Tea':
                    navigate('/tea-reviews/oolong-tea');
                    break;
                case 'Pu-erh':
                    navigate('/tea-reviews/pu-erh');
                    break;
                case 'White Tea':
                    navigate('/tea-reviews/white-tea');
                    break;
                default:
            }
        }
    }

    
    return (
        <FilterContainer>
            <span><FiFilter size={20} />Filter</span>
            <Checkbox 
                onChange={(e) => onCheckboxTick('Black Tea', e)} 
                value={curSelected === 'Black Tea'}
                label={'Black'}
            />
            <Checkbox
                onChange={(e) => onCheckboxTick('Green Tea', e)}
                value={curSelected === 'Green Tea'}
                label={'Green'}
            />
            <Checkbox
                onChange={(e) => onCheckboxTick('Oolong Tea', e)}
                value={curSelected === 'Oolong Tea'}
                label={'Oolong'}
            />
            <Checkbox
                onChange={(e) => onCheckboxTick('Pu-erh', e)}
                value={curSelected === 'Pu-erh'}
                label={'Pu-erh'}
            />
            <Checkbox
                onChange={(e) => onCheckboxTick('White Tea', e)}
                value={curSelected === 'White Tea'}
                label={'White'}
            />
        </FilterContainer>
    )
}