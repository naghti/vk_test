import { Button } from 'antd'
import React, { useState } from 'react'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { filtersI } from "../interfaces/Comment"
import counter from '../store/counter';

function Filter (
  {text, filter} :
  {text: string, filter: keyof filtersI}
) {
  const [active, setActive] = useState(false)

  const changeFilter = async () => {
    setActive(!active)
    counter.setFilters(filter, !counter.filters[filter])
  }

  return (
    <Button 
      color="default" 
      variant={active ? "filled" : "outlined"} 
      style={{width: "50%"}}
      icon={active ? <CaretDownOutlined /> : <CaretUpOutlined />} 
      onClick={() => changeFilter()}
    >
      {text}
    </Button>
  )
}

export default Filter