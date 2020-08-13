import React, { useState } from "react"
import styled from "styled-components"
import { Checkbox } from '../components'
import { FiFilter } from 'react-icons/fi'

const FilterContainer = styled.div`
  width: 100%;
  font-size: 16px;
  padding: 10px;
`

export default function TeaFilterComponent({ onFilterChange = () => {} }) {
    const [filterArr, setFilterArr] = useState([]);

    const handleFilterChange = (changedItem) => {
        let newArr = []

        if (filterArr.indexOf(changedItem) !== -1) {
            newArr = filterArr.filter(e => e !== changedItem)
        }
        else newArr = [...filterArr, changedItem];

        setFilterArr(newArr);
        onFilterChange(newArr);
    }

    return (
        <FilterContainer>
            <span><FiFilter size={20} />Filter</span>
            <Checkbox 
                onChange={() => handleFilterChange('Black Tea')} 
                value={filterArr.indexOf('Black Tea') !== -1}
                label={'Black'}
            />
            <Checkbox
                onChange={() => handleFilterChange('Green Tea')}
                value={filterArr.indexOf('Green Tea') !== -1}
                label={'Green'}
            />
            <Checkbox
                onChange={() => handleFilterChange('Oolong Tea')}
                value={filterArr.indexOf('Oolong Tea') !== -1}
                label={'Oolong'}
            />
            <Checkbox
                onChange={() => handleFilterChange('Pu-erh')}
                value={filterArr.indexOf('Pu-erh') !== -1}
                label={'Pu-erh'}
            />
            <Checkbox
                onChange={() => handleFilterChange('White Tea')}
                value={filterArr.indexOf('White Tea') !== -1}
                label={'White'}
            />
        </FilterContainer>
    )
}