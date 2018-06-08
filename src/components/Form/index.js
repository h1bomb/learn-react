import React from "react";
import { connect } from "react-redux";
import PopForm from "./PopForm";
import { addData } from "../../actions";

let lastObjectId = 1;

/**
 * 添加link
 */
const FormPanel = ({dispatch}) => {
  const formSet = [
    {
      key: "title",
      label: "Title",
      required: true,
      message: "Please input the title of News!"
    },
    {
      key: "url",
      label: "Url",
      required: true,
      message: "Please input the Url of News!"
    },
    {
      key: "author",
      label: "Author",
      required: true,
      message: "Please input the Author of News!"
    }
  ];
  const dataProc = values => {
    lastObjectId++;
    const data = { ...values, objectID: lastObjectId };
    dispatch(addData(data));
  };
  return (
    <PopForm
      formSet={formSet}
      buttonText="Add News"
      modalTitle="Add News"
      okText="Add"
      dataProc={dataProc}
    />
  );
};

export default connect()(FormPanel);
