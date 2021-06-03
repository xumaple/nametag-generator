import React from 'react';
import { useState, useRef, useEffect } from "react";
import { defaultFontSize } from "./consts";

export default function TextBlock({ text, onChange, zoom, canEdit, onFontChange, highlighted, onClick }) {
  // TEXT AND EDITING
  const [editing, setEditing] = useState(false);
  const [changed, setChanged] = useState(false);
  const [currText, setCurrText] = useState(text);
  const [original, setOriginal] = useState(text);
  const editText = () => { if (!editing && canEdit()) { setEditing(true);setHovering(false); }}
  const setDoneEditing = () => { setEditing(false); canEdit(0); }
  const saveText = () => {
    if (text === "") {
      // setWarning(true);
      return;
    }
    setDoneEditing();
    if (changed) {
      onChange(currText);
      setOriginal(text);
      setChanged(false);
    }
  }
  const changeText = (e) => {
    e.preventDefault();
    // setWarning(false);
    setChanged(e.target.value !== original);
    setCurrText(e.target.value);
  }
  const printTextBox = () => {
    if (editing) {
      return (<input style={getStyle()} type="text" onSubmit={saveText} value={currText} onChange={changeText} onKeyDown={(e)=>{
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
    onFontChange(f);
  }

  // STYLE
  const [isHovering, setHovering] = useState(false);
  // const [highlighted, setHightlight] = useState(false);
  const boxStyle = {border: "0.01in black", borderStyle: "dashed"};
  const getStyle = () => {
    let s = isHovering?boxStyle:{};
    s['fontSize'] = getFontSizeString(zoom);
    if (highlighted) {
      s['backgroundColor'] = 'coral'
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
    {printTextBox()}{/*warning?<Warning error=" Text cannot be empty!"/>:""*/}
    {isHovering&&!editing?
      <div className="text-font-size">
        <button 
          onClick={()=>{setThisFontSize(fontSize-1);}}
          // onMouseEnter={()=>{const node=dblClickRef.current;if(node){node.removeEventListener("dblclick", dblCLickListener);console.log('hello', node);}}}
          // onMouseOut={()=>{const node=dblClickRef.current;if(node){node.addEventListener("dblclick", dblCLickListener);console.log('goodbye');}}}
          // onMouseOut={()=>{const node=dblClickRef.current;if(node)node.addEventListener("dblclick", dblCLickListener)}}
        >-</button>
        <button
          onClick={()=>{setThisFontSize(fontSize+1);}}
          // onMouseEnter={()=>{const node=dblClickRef.current;if(node){node.removeEventListener("dblclick", dblCLickListener);console.log('hello', node);}}}
          // onMouseOut={()=>{const node=dblClickRef.current;if(node){node.addEventListener("dblclick", dblCLickListener);console.log('goodbye');}}}
        >+</button>
      </div>:""
    }
    </div>);
}