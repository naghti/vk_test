import { useEffect } from 'react'
import './App.css'
import { Button, Col, Row, Space } from 'antd';
import { Input } from 'antd';
import MyList from './components/MyList';
import { SearchOutlined } from '@ant-design/icons';

function App() {
  return (
    <div style={{width:"100%", maxWidth: 1200, padding: '20px', margin: "0 auto"}}>
      <Row>
        <Col span={16} style={{ margin: "0 auto" }}>
          <Space.Compact size="large" style={{ width: '100%', marginBottom: 30 }}>
            <Input addonBefore={<SearchOutlined />} placeholder="large size" />
            <Button type="primary">Search</Button>
          </Space.Compact>

          <MyList />
        </Col>
      </Row>

    </div>
  )
}

export default App
