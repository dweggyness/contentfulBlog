import React from "react"
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
    return (
        <FilterContainer>
            <span><FiFilter size={20} />Filter</span>
            <Checkbox 
                onChange={() => navigate('/tea-reviews/black-tea')} 
                value={value === 'Black Tea'}
                label={'Black'}
            />
            <Checkbox
                onChange={() => navigate('/tea-reviews/green-tea')}
                value={value === 'Green Tea'}
                label={'Green'}
            />
            <Checkbox
                onChange={() => navigate('/tea-reviews/oolong-tea')}
                value={value === 'Oolong Tea'}
                label={'Oolong'}
            />
            <Checkbox
                onChange={() => navigate('/tea-reviews/pu-erh')}
                value={value === 'Pu-erh'}
                label={'Pu-erh'}
            />
            <Checkbox
                onChange={() => navigate('/tea-reviews/white-tea')}
                value={value === 'White Tea'}
                label={'White'}
            />
        </FilterContainer>
    )
}