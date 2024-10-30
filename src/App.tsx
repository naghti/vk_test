import { useEffect } from 'react'
import './App.css'
import { Button, Col, Row, Space } from 'antd';
import { Input } from 'antd';
import CommentsList from './components/CommentsList';
import { SearchOutlined } from '@ant-design/icons';
import counter from './store/counter';
import Filter from './components/Filter';
import { observer } from 'mobx-react-lite';
import CommentService from './API/CommentService';
import { commentsI } from './interfaces/Comment';

const App = () => {
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await CommentService.getAll();
        const data: Array<commentsI> = res.data

        counter.setComments(data)
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  const inputChange = (val: string) => {
    let timeoutId;
    clearTimeout(timeoutId); 
    timeoutId = setTimeout(() => {
      counter.setFilters('filterByText', val);
    }, 200); 
  }

  return (
    <div style={{width:"100%", maxWidth: 1200, padding: '20px', margin: "0 auto"}}>
      <Row>
        <Col span={16} style={{ margin: "0 auto" }}>
          <Space.Compact size="large" style={{ width: '100%', marginBottom: 10 }}>
            <Input 
              addonBefore={<SearchOutlined />} 
              placeholder="Lorem ispum..." 
              onChange={(e) => inputChange(e.target.value)}
            />
            <Button type="primary">Search</Button>
          </Space.Compact>

          <Space.Compact size="large" style={{ width: '50%', marginBottom: 30 }}>
            <Filter text='id' filter={"filterById"}/>
            <Filter text='name' filter={"filterByTitle"}/>
          </Space.Compact>

          <CommentsList />
        </Col>
      </Row>

    </div>
  )
}

export default App
