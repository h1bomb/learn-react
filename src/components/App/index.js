import React, { Component } from "react";
import { connect } from "react-redux";
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
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.onSort = this.onSort.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }
  onSort(sortKey) {
    const {dispatch} = this.props;
    dispatch(sort(sortKey))
  }

  onSearchSubmit(event) {
    const { dispatch, searchKey } = this.props;

    dispatch(queryData(searchKey));
    event.preventDefault();
  }

  loadMore() {
    const { dispatch, searchKey, page } = this.props;
    dispatch(queryData(searchKey, page + 1));
  }

  componentDidMount() {
    const { dispatch, searchKey } = this.props;
    dispatch(queryData(searchKey));
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
  console.log(state);
  return state;
})(App);
