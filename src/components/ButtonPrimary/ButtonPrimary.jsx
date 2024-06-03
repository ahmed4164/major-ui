import React from 'react';
import PropTypes from 'prop-types';

const ButtonPrimary = ({ onClick, type, className, children }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`py-2 px-4 bg-white hover:bg-black  hover:text-white text-White  transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg border-2  ${className}`}
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
