import React from 'react';
import { useState, useRef, useEffect } from "react";
// import { defaultFontSize } from "./consts";
import css from './style.css';

export default function TextBlock({ text, onChange, zoom, canEdit, fontSize, onFontSizeChange, highlighted, onClick, style }) {
  // TEXT AND EDITING
  const [editing, setEditing] = useState(false); // boolean for editing mode
  const [changed, setChanged] = useState(false); // boolean for whether or not anything has been changed
  const [currText, setCurrText] = useState(text); // current state in the input
  const [original, setOriginal] = useState(text); // before current changes
  const editText = () => { if (!editing && canEdit()) { setEditing(true); }}
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

  // FONT SIZE
  const getFontSizeString = (z) => `${zoom*currFontSize}px`;
  const [currFontSize, setFontSize] = useState(fontSize);
  const setThisFontSize = (f) => {
    setFontSize(f);
    onFontSizeChange(f);
  }
  useEffect(() =>{
    if (currFontSize !== fontSize) setFontSize(fontSize);
  });

  // STYLE
  const getStyle = (mode) => {
    let s = {...style};
    s['fontSize'] = getFontSizeString(zoom);
    if (highlighted) {
      s['backgroundColor'] = '#e4bbd8';
    }
    if (mode === "input") {
      s['width'] = `${currText.length*currFontSize*zoom/2}px`;
      s['backgroundColor'] = '#d3d3d3';
    }
    return s;
  }

  // DOUBLE CLICK
  const dblCLickListener = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      editText();
    }
  };
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
    style={getStyle()}
    onClick={(e)=>{e.preventDefault();const node=dblClickRef.current;if(node){ onClick(); }}}
  >
    {printTextBox()}
    {!editing?
      <div className="text-font-size">
        <button 
          onClick={(e)=>{e.stopPropagation();setThisFontSize(currFontSize-1);}}
          // onMouseEnter={()=>{const node=dblClickRef.current;if(node){node.removeEventListener("dblclick", dblCLickListener);console.log('hello', node);}}}
          // onMouseOut={()=>{const node=dblClickRef.current;if(node){node.addEventListener("dblclick", dblCLickListener);console.log('goodbye');}}}
          // onMouseOut={()=>{const node=dblClickRef.current;if(node)node.addEventListener("dblclick", dblCLickListener)}}
        >-</button>
        <button
          onClick={(e)=>{e.stopPropagation();setThisFontSize(currFontSize+1);}}
          // onMouseEnter={()=>{const node=dblClickRef.current;if(node){node.removeEventListener("dblclick", dblCLickListener);console.log('hello', node);}}}
          // onMouseOut={()=>{const node=dblClickRef.current;if(node){node.addEventListener("dblclick", dblCLickListener);console.log('goodbye');}}}
        >+</button>
      </div>:""
    }
    </div>);
}