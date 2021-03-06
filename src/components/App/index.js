import React, { Component } from "react";
import { connect } from "react-redux";
import {
  DEFAULT_QUERY
} from '../../constants';
import {
  onDismiss,
  setSearchKey,
  queryData
} from "../../actions";
import "./App.css";
import Table from "../Table";
import Search from "../Search";

/**
 * app组件
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.onSearchChange = this.onSearchChange.bind(this); // 搜索输入
    this.onSearchSubmit = this.onSearchSubmit.bind(this); // 搜索提交
    this.onDismiss = this.onDismiss.bind(this); // 移除一项
    this.loadPage = this.loadPage.bind(this); // 加载更多
  }


  onSearchSubmit(event) {
    const { searchKey, dispatch } = this.props;
    this.props.history.push(`/${searchKey}`);
    dispatch(queryData(searchKey));
  }

  loadPage(pagination) {
    const { dispatch, searchKey} = this.props;
    dispatch(queryData(searchKey, pagination.current));
  }

  componentDidMount() {
    const { key } = this.props.match.params;
    const { dispatch } = this.props;
    dispatch(queryData(key||DEFAULT_QUERY));
  }
  onDismiss(id) {
    const { dispatch } = this.props;
    dispatch(onDismiss(id));
  }
  onSearchChange(event) {
    const { dispatch } = this.props;
    dispatch(setSearchKey(event.target.value));
  }
  render() {
    const {
      error,
      isLoading,
      searchKey,
      list,
      pagination
    } = this.props;
    return (
      <div>
        <div className="interactions">
          <Search
            value={searchKey}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        {error ? (
          <div className="interactions">
            <p>Something went wrong.</p>
          </div>
        ) : (
          <Table
            list={list}
            onDismiss={this.onDismiss}
            isLoading={isLoading}
            pagination={pagination}
            onChange={this.loadPage}
          />
        )}
        </div>
    );
  }
}

export default connect(state => state)(App);
