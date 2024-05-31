import React from 'react';

const RecursiveDisplay = ({ data }) => {
  if (data === null) {
    return <div>null</div>;
  }
  
  if (data === undefined) {
    return <div>undefined</div>;
  }

  if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
    return <div>{String(data)}</div>;
  }

  if (Array.isArray(data)) {
    return (
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <RecursiveDisplay data={item} />
          </li>
        ))}
      </ul>
    );
  }

  if (typeof data === 'object') {
    return (
      <ul>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> <RecursiveDisplay data={value} />
          </li>
        ))}
      </ul>
    );
  }

  return null;
};

export default RecursiveDisplay;
