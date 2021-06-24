import React from 'react';
import { useState, useRef, useEffect } from "react";


function FontSizeBar({ fontSize, onChange }) {
  return <div>
    {/* <input>{fontSize}</input> */}
    {fontSize}
    <button onClick={()=>{onChange(fontSize-1);}}>-</button>
    <button onClick={()=>{onChange(fontSize+1);}}>+</button>
  </div>;
}

export default function StyleBar({ fontSize, onChange }) {
  return <div><FontSizeBar fontSize={fontSize} onChange={onChange}/></div>;
}

