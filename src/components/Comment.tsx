import { Button, List, Typography } from 'antd'
import React, { useState } from 'react'
import counter from '../store/counter'
import { commentsI } from '../interfaces/Comment';
import EditInput from './EditInput';

const { Text } = Typography;

export default function Comment({ item }: {item: commentsI}) {
  const [isEdit, setIsEdit] = useState(false)
  const [value, setValue] = useState(item.body)

  const editButton = () => {
    if (isEdit) {
      counter.addEdited({...item, body: value})
    }
    setIsEdit(!isEdit)
  }

  const deleteButton = (id: number) => {
    if (isEdit) {
      setIsEdit(!isEdit)
    } else {
      counter.addDeleted(id)
    }
  }

  return (
    <List.Item
      actions={[
        <Button
          onClick={() => editButton()}
        >
          {isEdit ? "Save" : "Edit"}
        </Button>,
        <Button 
          type="primary" 
          danger
          onClick={() => deleteButton(item.id)}
        >
          {isEdit ? "Un Save" : "Delete"}
        </Button>
      ]}
    >
      {
        isEdit ? 
        <EditInput initialValue={value} setFunction={(e) => setValue(e)}/> :
        <Text>{item.id + ". " + item.body}</Text>
      }
    </List.Item>
  )
}
