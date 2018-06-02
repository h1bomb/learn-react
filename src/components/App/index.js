import React, { Component } from "react";
import { connect } from "react-redux";
import {
  DEFAULT_QUERY
} from '../../constants';
import {
  onDismiss,
  setSearchKey,
  queryData,
  addData,
  setAddData,
  sort
} from "../../actions";
import "./App.css";
import { ButtonWithLoading } from "../Button";
import Table from "../Table";
import Form from "../Form";
import Search from "../Search";

let lastObjectId = 1;

/**
 * app组件
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.onSearchChange = this.onSearchChange.bind(this); // 搜索输入
    this.onSearchSubmit = this.onSearchSubmit.bind(this); // 搜索提交
    this.onDismiss = this.onDismiss.bind(this); // 移除一项
    this.inputChange = this.inputChange.bind(this); // 添加输入
    this.submit = this.submit.bind(this); // 添加提交
    this.onSort = this.onSort.bind(this); // 排序
    this.loadMore = this.loadMore.bind(this); // 加载更多
  }
  onSort(sortKey) {
    const { dispatch } = this.props;
    dispatch(sort(sortKey));
  }

  onSearchSubmit(event) {
    const { searchKey, dispatch } = this.props;
    this.props.history.push(`/${searchKey}`);
    dispatch(queryData(searchKey));
    event.preventDefault();
  }

  loadMore() {
    const { dispatch, searchKey, page } = this.props;
    dispatch(queryData(searchKey, page + 1));
  }

  componentDidMount() {
    const { key } = this.props.match.params;
    const { dispatch } = this.props;
    dispatch(queryData(key||DEFAULT_QUERY));
  }
  submit() {
    const { dispatch, addedItem } = this.props;
    if (
      addedItem.title === "" ||
      addedItem.author === "" ||
      addedItem.url === ""
    ) {
      alert("please fill all fields!");
      return;
    }
    lastObjectId++;
    addedItem.objectID = lastObjectId;
    dispatch(addData(addedItem));
  }
  inputChange(event) {
    const { dispatch, addedItem } = this.props;
    const target = event.target;
    const changeProp = {
      [target.name]: target.value
    };
    dispatch(setAddData({ ...addedItem, ...changeProp }));
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
      addedItem,
      isLoading,
      sortKey,
      isSortReverse,
      searchKey,
      list
    } = this.props;
    return (
      <div className="page">
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
            sortKey={sortKey}
            isSortReverse={isSortReverse}
            onSort={this.onSort}
          />
        )}
        <div className="interactions">
          <ButtonWithLoading isLoading={isLoading} onClick={this.loadMore}>
            More
          </ButtonWithLoading>
        </div>
        <Form
          author={addedItem.author}
          url={addedItem.url}
          title={addedItem.title}
          inputChange={this.inputChange}
          submit={this.submit}
        />
      </div>
    );
  }
}

export default connect(state => {
  return state;
})(App);
