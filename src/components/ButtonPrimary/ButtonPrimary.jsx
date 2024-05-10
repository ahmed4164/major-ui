import React from 'react';
import PropTypes from 'prop-types';

const ButtonPrimary = ({ onClick, type, className, children }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`py-2 px-4  bg-custom-primary1 hover:bg-custom-primary2 focus:custom-primary2 focus:ring-offset-indigo-200 text-accent1  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg  ${className}`}
    >
      {children}
    </button>
  );
};

ButtonPrimary.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  children: PropTypes.node,
};

// ButtonPrimary.defaultProps = {
//   type: 'button',
//   className: '',
// };

export default ButtonPrimary;
