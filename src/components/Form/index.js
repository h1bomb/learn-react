import React from "react";
import Button from "../Button";

/**
 * 添加link
 */
const Form = ({ author, url, title, submit, inputChange }) => (
  <form>
    title<input type="text" name="title" value={title} onChange={inputChange} />
    url <input type="text" name="url" value={url} onChange={inputChange} />
    author<input
      type="text"
      name="author"
      value={author}
      onChange={inputChange}
    />
    <Button onClick={submit}>Add</Button>
  </form>
);

export default Form;
