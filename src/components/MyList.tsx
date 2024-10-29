import React, { useEffect } from 'react'
import { List, Button, Typography } from 'antd'
import CommentService from '../API/CommentService';

const { Text, Link } = Typography;

function MyList() {
  const items: Array<string> = []

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await CommentService.getAll();
        console.log(res)
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  return (
    <List
      bordered
      dataSource={items}
      renderItem={(item, index) => (
        <List.Item
          key={index}
          actions={[
            <Button>Edit</Button>,
            <Button type="primary" danger>Delete</Button>
          ]}
        >
          <Text>{item}</Text>
        </List.Item>
      )}
    />
  )
}

export default MyList