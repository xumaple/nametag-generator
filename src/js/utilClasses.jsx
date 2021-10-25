import React from 'react';
import { useState } from 'react';

export function SelectableOptions({ options, currOption, onSelect } ) {
  const [option, setOption] = useState(currOption);
  const select= (e) => {
    // console.log(e.target.value);
    setOption(e.target.value);
    onSelect(e.target.value);
  };
  return (<select onChange={select} value={option} >
    {options.map((o, i) => {

      return <option key={i} value={o}>{o}</option>;
    })}
  </select>);
}