import React from 'react';

const CustomCodeBlock = ({ children, className }) => {
  return (
    <pre className={className}>
      <code>{children}</code>
      <p>THE CUSTOM CODE</p>
    </pre>
  );
};

export default CustomCodeBlock;