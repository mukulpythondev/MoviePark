import React from 'react';

const Dropdown = ({ title, options, func }) => {
  return (
    <div>
      <select
        onChange={func}
        defaultValue="0"
        name="Category"
        id="Category"
        className="block appearance-none w-24 text-zinc-100 bg-zinc-700  border border-zinc-100 py-1 px-4  rounded leading-tight focus:outline-none focus:bg-gray-900 focus:text-zinc-100"
      >
        <option className='text-zinc-100' value={title} disabled > {title} </option>
        {options.map((o, i) => (
          <option key={i} value={o} className="text-zinc-500 hover:text-zinc-100">
            {' '}
            {o.toUpperCase()}{' '}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
