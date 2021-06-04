import React from 'react';
import { useState, useRef, useEffect } from "react";
import { defaultFontSize } from "./consts";

export default function TextBlock({ text, onChange, zoom, canEdit, onFontSizeChange, highlighted, onClick, style }) {
  // TEXT AND EDITING
  const [editing, setEditing] = useState(false); // boolean for editing mode
  const [changed, setChanged] = useState(false); // boolean for whether or not anything has been changed
  const [currText, setCurrText] = useState(text); // current state in the input
  const [original, setOriginal] = useState(text); // before current changes
  const editText = () => { if (!editing && canEdit()) { setEditing(true);setHovering(false); }}
  const setDoneEditing = () => { setEditing(false); canEdit(0); }
  const saveText = () => {
    if (text === "") return;
    setDoneEditing();
    if (changed) {
      onChange(currText);
      setOriginal(currText);
      setChanged(false);
    }
  }
  const changeText = (e) => {
    e.preventDefault();
    if (e.target.value !== original) {
      setChanged(true);
      setCurrText(e.target.value);
    }
  }
  const printTextBox = () => {
    if (editing) {
      return (<input style={getStyle("input")} type="text" onSubmit={saveText} value={currText} onChange={changeText} onKeyDown={(e)=>{
        if (e.key === 'Enter') { saveText(); }
        if (e.key === 'Escape') {
          setDoneEditing();
          setChanged(false);
          setCurrText(original);
        }
      }} />);
    }
    return text;
  }

  // FONT
  const getFontSizeString = (z) => `${zoom*fontSize}px`;
  const [fontSize, setFontSize] = useState(defaultFontSize);
  const setThisFontSize = (f) => {
    setFontSize(f);
    onFontSizeChange(f);
  }

  // STYLE
  const [isHovering, setHovering] = useState(false);
  const boxStyle = {border: "0.01in black", borderStyle: "dashed"};
  const getStyle = (mode) => {
    let s = isHovering?boxStyle:{};
    s = {...s, ...style};
    s['fontSize'] = getFontSizeString(zoom);
    if (highlighted) {
      s['backgroundColor'] = 'coral';
    }
    if (mode === "input") {
      s['width'] = `${currText.length*fontSize*zoom/2}px`;
      s['backgroundColor'] = '#d3d3d3';
    }
    return s;
  }

  // DOUBLE CLICK
  const dblCLickListener = editText;
  const dblClickRef = useRef(null);
  useEffect(() => {
    const node = dblClickRef.current;
    if (node) {
      node.addEventListener("dblclick", dblCLickListener);
      console.log('added')
      return () => {
        node.removeEventListener("dblclick", dblCLickListener);
      };
    }
  }, []);

  return (<div
    className="text"
    ref={dblClickRef}
    onMouseEnter={editing?undefined:() => {setHovering(true);}}
    onMouseLeave={editing?undefined:() => {setHovering(false);}}
    style={getStyle()}
    onClick={(e)=>{e.preventDefault();const node=dblClickRef.current;if(isHovering && node){ onClick(); }}}
  >
    {printTextBox()}
    {isHovering&&!editing?
      <div className="text-font-size">
        <button 
          onClick={(e)=>{e.stopPropagation();setThisFontSize(fontSize-1);}}
          // onMouseEnter={()=>{const node=dblClickRef.current;if(node){node.removeEventListener("dblclick", dblCLickListener);console.log('hello', node);}}}
          // onMouseOut={()=>{const node=dblClickRef.current;if(node){node.addEventListener("dblclick", dblCLickListener);console.log('goodbye');}}}
          // onMouseOut={()=>{const node=dblClickRef.current;if(node)node.addEventListener("dblclick", dblCLickListener)}}
        >-</button>
        <button
          onClick={(e)=>{e.stopPropagation();setThisFontSize(fontSize+1);}}
          // onMouseEnter={()=>{const node=dblClickRef.current;if(node){node.removeEventListener("dblclick", dblCLickListener);console.log('hello', node);}}}
          // onMouseOut={()=>{const node=dblClickRef.current;if(node){node.addEventListener("dblclick", dblCLickListener);console.log('goodbye');}}}
        >+</button>
      </div>:""
    }
    </div>);
}