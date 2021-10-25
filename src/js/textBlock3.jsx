import React from 'react';
import { useState, useRef, useEffect } from "react";

function Warning({ error }) {
  return (<span style={{color:"red",textSize:"small"}}>{error}</span>);
}

export default function TextBlock({ text, onChange, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [changed, setChanged] = useState(false);
  const [warning, setWarning] = useState(false);
  
  const [currText, setCurrText] = useState(text);
  const [original, setOriginal] = useState(text);

  // const [clickRef, isEditing] = useDblClick();
  const thisElement = useRef(null);

  // const handleFocus = () => {
  //   thisElement.current.select();
  // }

  const handleFocus = (e) => {
    e.target.select();
  }

  const setEditingFlag = (b) => {
    setEditing(b);
    onEdit(b);
  }

  const editText = () => { if (!editing) setEditingFlag(true); }
  const saveText = () => {
    if (text === "") {
      setWarning(true);
      return;
    }
    setEditingFlag(false);
    if (changed) {
      onChange(currText);
      setOriginal(text);
      setChanged(false);
    }
  }

  const changeText = (e) => {
    e.preventDefault();
    setWarning(false);
    setChanged(e.target.value !== original);
    setCurrText(e.target.value);
  }

  const textBox = () => {
    if (editing) {
      return (<input className="input-group mb-3 col-sm-10" type="text" onSubmit={saveText} value={currText} onFocus={handleFocus} onChange={changeText} onKeyDown={(e)=>{
        if (e.key === 'Enter') { saveText(); }
        if (e.key === 'Escape') {
          setEditingFlag(false);
          setChanged(false);
        }
      }}></input>);
    }
    return text;
  }


  return (<div onDoubleClick={editText}>
    {textBox()}{warning?<Warning error=" Text cannot be empty!"/>:""}
    </div>);
}

export function EditableText(props) {
    let [showAppearing, setShowAppearing] = useState(false);
    let [editing, setEditing] = useState(false);
    let [changed, setChanged] = useState(false);
    let [original, setOriginal] = useState(props.text);
    let [warning, setWarning] = useState(false);
    let [text, setText] = useState(props.text);
    function mouseIn() { setShowAppearing(true); }
    function mouseOut() { if (!editing) setShowAppearing(false); }
    function editText() { if (!editing) setEditing(true); }
    function saveText() {
      if (text === "") {
        setWarning(true);
        return;
      }
      setEditing(false);
      setShowAppearing(false);
      if (changed)
        props.onChange(text, props.index);
        setOriginal(text);
        setChanged(false);
    }
    function changeText(e) {
      e.preventDefault();
      setWarning(false);
      setChanged(e.target.value !== original);
      setText(e.target.value);
    }
    function textBox() {
      if (editing) {
        return (<input className="input-group mb-3 col-sm-10" type="text" onSubmit={saveText} value={text} onChange={changeText} onKeyDown={(e)=>{
          if (e.key === 'Enter') { saveText(); }
          if (e.key === 'Escape') {
            setEditing(false);
            setChanged(false);
          }
        }}></input>);
      }
      return text;
    }
    function appearingText() {
      if (showAppearing) {
        if (!editing) {
          return (<span className="edit-text" onClick={editText}> Edit</span>);
        }
        return (<span className="edit-text" onClick={saveText}> Save</span>)
      }
      return "";
    }
  
    useEffect(() => {
      if (!editing && props.text !== text) {
        setText(props.text);
        setOriginal(props.text);
      }
    })
  
    return (<div onMouseEnter={mouseIn} onMouseLeave={mouseOut} onDoubleClick={editText}>
      {textBox()}{appearingText()}{warning?<Warning error=" Text cannot be empty!"/>:""}
      </div>);
  }

  // function useDblClick() {
  //   const [editing, setEditing] = useState(false);
  //   const ref = useRef(null);
  //   const handleDbl = () => {
  //     setEditing(true);
  //     ref.current.removeEventListener("dblclick", handleDbl);
  //     console.log('removed')
  //   }
  //   useEffect(() => {
  //     const node = ref.current;
  //     node.addEventListener("dblclick", handleDbl);
  //     if (node) {
  //       return () => {
  //         node.addEventListener("dblclick", handleDbl);
  //       };
  //     }
  //   }, [ref.current]); // Re-run effect only if ref changes
  //   return [ref, editing];
  // }
  