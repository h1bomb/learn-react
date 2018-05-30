import React from "react";

/**
 * 按钮
 */
const Button = ({ onClick, className = "", children }) => (
  <button className={className} onClick={onClick} type="button">
    {children}
  </button>
);

const Loading = () => (
  <div className="fa-3x">
    <i className="fas fa-spinner fa-spin" />
  </div>
);

const withLoading = Component => ({ isLoading, ...rest }) =>
  isLoading ? <Loading /> : <Component {...rest} />;

export const ButtonWithLoading = withLoading(Button);

export default Button;
