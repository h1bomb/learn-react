import React, { Component } from "react";
import { Input } from 'antd';
import { Row, Col } from 'antd';

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
         <Col span={8} offset={16}>
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
