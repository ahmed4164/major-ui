import React, { useState } from 'react';
import PropTypes from 'prop-types';

function InputWrapper({ type, name, value, onChange, children }) {
  const [active, setActive] = useState(false);

  function handleActivation(e) {
    setActive(!!e.target.value);
    onChange(e); // Notify parent component about the change
  }

  return (
    <div className="relative border rounded mb-2 text-white border-white border-opacity-25 ">
      <input
         className={[
          "outline-none w-full rounded text-sm transition-all duration-200 ease-in-out p-2 bg-neutral-dark ", // Apply custom color className directly
          active ? "pt-6" : ""
        ].join(" ")}        
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleActivation}
      />
      <label
        className={[
          "absolute top-0 left-0 flex items-center text-red text-opacity-50 p-2 transition-all duration-200 ease-in-out",
          active ? "text-xs" : "text-sm"
        ].join(" ")}
        htmlFor={name}
      >
        {children}
      </label>
    </div>
  );
}

InputWrapper.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'email', 'password']).isRequired,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default InputWrapper;
