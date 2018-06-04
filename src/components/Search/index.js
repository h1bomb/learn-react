import React, { Component } from "react";
import { Input } from 'antd';
import { Row, Col } from 'antd';
import Form from "../Form";
const Search = Input.Search
/**
 * 搜索组件
 */
class SearchPanel extends Component {
  componentDidMount() {
    if(this.input) {
      this.input.focus();
    }
  }
  render() {
    const { value, onChange, onSubmit,loading } = this.props;
    return (
      <div style={{margin:5}}>
      <Row>
         <Col span={4}>
         <Form/>
         </Col>
         <Col span={8} offset={12}>
         <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            value={value} 
            onChange={onChange} 
            onSearch={onSubmit}
            loading = {loading}
            onPressEnter={onSubmit}
         />
         </Col>
        </Row>
        </div>
    );
  }
}

export default SearchPanel;
