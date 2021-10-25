import React from 'react';
import { useState, useRef, useEffect } from "react";
import { defaultFontSizeList } from './consts';
import { SelectableOptions } from './utilClasses';


function FontSizeBar({ fontSize, onChange }) {
  return <div>
    {/* <input>{fontSize}</input> */}
    <SelectableOptions options={defaultFontSizeList} currOption={fontSize} onSelect={onChange} />
    {/* {fontSize} */}
    <button onClick={()=>{onChange(fontSize-1);}}>-</button>
    <button onClick={()=>{onChange(fontSize+1);}}>+</button>
  </div>;
}

export default function StyleBar({ fontSize, onChange }) {
  return <div><FontSizeBar fontSize={fontSize} onChange={onChange}/></div>;
}

