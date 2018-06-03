import React from "react";
import { Button } from 'antd';


/**
 * 加载中
 */
const Loading = () => (
  <div className="fa-3x">
    <i className="fas fa-spinner fa-spin" />
  </div>
);

/**
 * 加载中的高阶组件
 * @param {*} Component 
 */
const withLoading = Component => ({ isLoading, ...rest }) =>
  isLoading ? <Loading /> : <Component {...rest} />;

export const ButtonWithLoading = withLoading(Button);// 带加载的按钮

export default Button;// 基础按钮
