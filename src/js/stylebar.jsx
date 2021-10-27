import React from 'react';
import { useState, useRef, useEffect } from "react";
import { defaultFontSizeList, fontFamilysList } from './consts';
import { SelectableOptions, ToggleButton } from './utilClasses';


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

function AlignmentBar({ alignment, onChange }) {
  const {hAlign, vAlign} = alignment;

  const onToggleHAlignButtonClick = (x) => {
    alignment.hAlign = x;
    onChange(alignment);
  }
  
  return <div>
    {/* <button
      onClick={(e)=>{
        e.stopPropagation();
        alignment.hAlign = -1;
        onChange(alignment);
      }}
    >&lt;</button>
    <button
      onClick={(e)=>{
        e.stopPropagation();
        alignment.hAlign = 0;
        onChange(alignment);
      }}
    >=</button>
    <button
      onClick={(e)=>{
        e.stopPropagation();
        alignment.hAlign = 1;
        onChange(alignment);
      }}
    >&gt;</button> */}
    <ToggleButton 
      buttonText="&lt;"
      toggleState={-1}
      currState={hAlign}
      onClick={onToggleHAlignButtonClick} />
    <ToggleButton 
      buttonText="="
      toggleState={0}
      currState={hAlign}
      onClick={onToggleHAlignButtonClick} />
    <ToggleButton 
      buttonText="&gt;"
      toggleState={1}
      currState={hAlign}
      onClick={onToggleHAlignButtonClick} />
  </div>;
}

export default function StyleBar({ fontSize, onFontSizeChange, alignment, onAlignmentChange, style, onStyleChange }) {
  return <div>
    <FontSizeBar fontSize={fontSize} onChange={onFontSizeChange} />
    <div><br></br></div>
    <AlignmentBar alignment={alignment} onChange={onAlignmentChange} />
    <FontBar font={style.fontFamily} onChange={(f)=>{style.fontFamily = f;onStyleChange(style);}} />
  </div>;
}

