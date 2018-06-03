import React, { Component } from "react";
import { Button, Modal, Form, Input } from "antd";
import { connect } from "react-redux";
import {
  addData
} from "../../actions";
const FormItem = Form.Item;
let lastObjectId = 1;

/**
 * 添加link
 */
class FormPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  show = () => {
    this.setState({
      visible: true
    });
  }

  cancel = () => {
    this.setState({
      visible: false
    });
  }

  handleSubmit = (e) => {
    const {form,dispatch} = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        lastObjectId++;
        const data = {...values,objectID:lastObjectId};
        dispatch(addData(data));
        this.props.form.resetFields();
        this.setState({
          visible: false
        });
      }
    });
  }


  render() {
    const { visible } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Button type="primary" onClick={this.show}>
          Add News
        </Button>
        <Modal visible={visible} title="Add News" okText="Add" onOk={this.handleSubmit} onCancel={this.cancel}>
          <Form layout="vertical">
            <FormItem label="Title">
              {getFieldDecorator("title", {
                rules: [
                  { required: true, message: "Please input the title of News!" }
                ]
              })(<Input/>)}
            </FormItem>
            <FormItem label="Url">
              {getFieldDecorator("url", {
                rules: [
                  { required: true, message: "Please input the url of News!" }
                ]
              })(<Input/>)}
            </FormItem>
            <FormItem label="Author">
              {getFieldDecorator("author", {
                rules: [
                  {
                    required: true,
                    message: "Please input the author of News!"
                  }
                ]
              })(<Input/>)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default connect(state =>state)(Form.create()(FormPanel));