import React, { Component } from "react";
import "./App.css";
const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
/**
 * 桩数据
 */
const list = [
  {
    title: "React",
    url: "https://facebook.github.io/react/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://github.com/reactjs/redux",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

let lastObjectId = 1;
const initAddItem = {
  title: "",
  url: "",
  author: "",
  num_comments: 0,
  points: 0
}

/**
 * 搜索逻辑
 * @param {*} searchTerm
 */
const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

/**
 * 按钮
 */
const Button = ({ onClick, className = "", children }) => {
  return (
    <button className={className} onClick={onClick} type="button">
      {children}
    </button>
  );
};

/**
 * 搜索组件
 */
const Search = ({ value, onChange, children }) => {
  return (
    <form>
      {children}
      <input type="text" value={value} onChange={onChange} />
    </form>
  );
};

/**
 * 列表组件
 */
const Table = ({ list, pattern, onDismiss }) => {
  return (
    <div className="table">
      {list.filter(isSearched(pattern)).map(item => {
        return (
          <div key={item.objectID} className="table-row">
            <span style={{ width: "40%" }}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={{ width: "30%" }}>{item.author}</span>
            <span style={{ width: "10%" }}>{item.num_comments}</span>
            <span style={{ width: "10%" }}>{item.points}</span>
            <span style={{ width: "10%" }}>
              <Button
                onClick={() => onDismiss(item.objectID)}
                className="button-inline"
              >
                Delete
              </Button>
            </span>
          </div>
        );
      })}
    </div>
  );
};
/**
 * 添加link
 */
const Form = ({ author, url, title, submit, inputChange }) => {
  return (
    <form>
      title<input type="text" name="title" value={title} onChange={inputChange} />
      url <input type="text" name="url" value={url} onChange={inputChange} />
      author<input type="text" name="author" value={author} onChange={inputChange} />
      <Button onClick={submit}>Add</Button>
    </form>
  );
};

/**
 * app组件
 */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: list,
      searchTerm: "",
      addedItem:Object.assign({},initAddItem)
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  submit() {
    const {addedItem, list} = this.state;
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
    list.push(addedItem);
    this.setState({
      list,
      addedItem:Object.assign({},initAddItem)
    });
    
  }
  inputChange(event) {
    const target = event.target;
    const name = target.name;
    const addedItem = this.state.addedItem;
    addedItem[name] = target.value;
    this.setState({
      addedItem
    });
  }
  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }
  onclick = () => {
    console.log(this);
  };
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  render() {
    const { searchTerm, list, addedItem } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
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

export default App;
