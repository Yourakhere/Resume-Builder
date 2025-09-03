import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className=''>{label}</label>
      <div className="relative p-2">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className='w-full p-2 border rounded'
          value={value}
          onChange={onChange}
        />
        {type === 'password' && (
          <span className="absolute inset-y-0 right-0 pr-3 p-2 flex items-center cursor-pointer " onClick={toggleShowPassword}>
            {showPassword ? (
              <FaRegEye size={22} />
            ) : (
              <FaRegEyeSlash size={22} />
            )}
          </span> 
        )}
      </div>
    </div>
  );
};

export default Input;