import React from 'react';
import { MdOutlineArrowDropDown } from 'react-icons/md';

const Dropdown = ({ title, options, func }) => {
  return (
    <div className="relative inline-flex">
      <select
        onChange={func}
        defaultValue={title}
        className="block appearance-none w-36 text-zinc-100 bg-zinc-700 border border-zinc-100 py-1 px-4 rounded leading-tight focus:outline-none focus:bg-gray-900 focus:text-zinc-100"
      >
        <option value={title} disabled>{title}</option>
        {options.map((o, i) => (
          <option key={i} value={o} className="text-zinc-500 hover:text-zinc-100">{o.toUpperCase()}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <MdOutlineArrowDropDown className="text-xl" />
      </div>
    </div>
  );
};

export default Dropdown;
