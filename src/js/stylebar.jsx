import React from 'react';
import { useState, useRef, useEffect } from "react";
import { defaultFontSizeList, fontFamilysList } from './consts';
import { SelectableOptions } from './utilClasses';


function FontSizeBar({ fontSize, onChange }) {
  return <div>
    {/* <input>{fontSize}</input> */}
    <SelectableOptions options={defaultFontSizeList} currOption={fontSize} onSelect={onChange} textInputWidth={30} />
    {/* {fontSize} */}
    <button onClick={()=>{onChange(fontSize-1);}}>-</button>
    <button onClick={()=>{onChange(fontSize+1);}}>+</button>
  </div>;
}

function FontBar({ font, onChange }) {
  return <div>
    <SelectableOptions options={fontFamilysList} currOption={font} onSelect={onChange} textInputWidth={0} />
  </div>
}

export default function StyleBar({ fontSize, onFontSizeChange, alignment, onAlignmentChange, style, onStyleChange }) {
  return <div>
    <FontSizeBar fontSize={fontSize} onChange={onFontSizeChange} />
    <div><br></br></div>
    <FontBar font={style.fontFamily} onChange={(f)=>{style.fontFamily = f;onStyleChange(style);}} />
  </div>;
}

