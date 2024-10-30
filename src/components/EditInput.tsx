import { Input } from 'antd'
import React, { useState } from 'react'

function EditInput(
  {initialValue, setFunction} : 
  {initialValue: string, setFunction: (value: string) => void}
) {
  return (
    <Input 
      placeholder="Filled" 
      variant="filled" 
      value={initialValue}
      onChange={(e) => setFunction(e.target.value)}
    />
  )
}

export default EditInput