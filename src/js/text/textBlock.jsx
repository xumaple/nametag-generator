import React from 'react';
import { useState, useRef, useEffect } from "react";
import { useTextWidth } from '@imagemarker/use-text-width'
import { selectedStyle, showButtonsZoomMin } from "../consts";
import css from './style.css';

const min=(a,b)=>a<b?a:b;

export default function TextBlock({ text, onChange, zoom, canEdit, fontSize, onFontSizeChange, selected, onClick, style, beingDragged, alignment }) {
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
    setChanged(e.target.value !== original);
    setCurrText(e.target.value);
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

  const drawRedLines = () => {
    if (!beingDragged) return "";
    const {hAlign, vAlign} = alignment;
    if (hAlign === 0) {
      return <div className="vl-red"></div>;
    }
    else if (hAlign < 0) {
      return <div className="vl-red lvl-red"></div>;
    }
    else {
      return <div className="vl-red rvl-red"></div>;
    }
    return "";
  }

  // FONT SIZE
  const getFontSizeString = (z) => `${z*currFontSize}px`;
  const [currFontSize, setFontSize] = useState(fontSize);
  const setThisFontSize = (f) => {
    setFontSize(f);
    onFontSizeChange(f);
  }
  useEffect(() =>{
    if (currFontSize !== fontSize) setFontSize(fontSize);
  });

  // STYLE
  const textWidth = useTextWidth({currText, font: `${getFontSizeString(1)} ${style.fontFamily}`});
  const getStyle = (mode) => {
    let s = {...style, ...(selected?selectedStyle:{})};
    s['fontSize'] = getFontSizeString(zoom);
    // if (selected) {
    //   s['backgroundColor'] = '#e4bbd8';
    // }
    if (mode === "input") {
      console.log(textWidth, currText, `${fontSize}px ${style.fontFamily}`);
      s['width'] = `${textWidth}px`;
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

  const shouldShowButtons = () => {
    if (editing) return false;
    if (zoom < showButtonsZoomMin) return false;
    // if (fontSize )
    return true;
  }

  return (<div
    className="text"
    ref={dblClickRef}
    style={getStyle()}
    onClick={(e)=>{e.preventDefault();const node=dblClickRef.current;if(node){ onClick(); }}}
  >
    {drawRedLines()}
    {printTextBox()}
    {shouldShowButtons()?
      <div className="text-font-size" style={{transform: `scale(${min(100, 2*zoom*currFontSize)}%)`}}>
        <button 
          onClick={(e)=>{e.stopPropagation();setThisFontSize(currFontSize-1);}}
        >-</button>
        <button
          onClick={(e)=>{e.stopPropagation();setThisFontSize(currFontSize+1);}}
        >+</button>
      </div>:""
    }
    </div>);
}