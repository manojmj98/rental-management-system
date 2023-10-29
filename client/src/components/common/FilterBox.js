import React from 'react';

export default function FilterBox({ label, value, tagArr, setTagArr, filter }) {
  const handleChange = () => {
      if (tagArr.includes(value)) {
        setTagArr(tagArr.filter((a) => a !== value));
      } else {
        setTagArr([value, ...tagArr]);
      }
  };

  return (
    <label>
      <input type='checkbox' checked={tagArr.includes(value)} onChange={handleChange} />
      {label}
    </label>
  );
}
