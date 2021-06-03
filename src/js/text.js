import React from 'react';
import { useState, useRef, useEffect } from "react";
import Draggable from 'react-draggable';
import TextBlock from './textBlock';

export default function Text({ text, zoom, id, onChange, onEdit, onFontChange, highlighted, onClick }) {
  // POSITION AND ZOOM
  const [currZoom, setCurrZoom] = useState(zoom);
  const [draggablePos, setDraggablePos] = useState({x: 0, y: id*zoom*10});
  const [currPos, setCurrPos] = useState(draggablePos);
  useEffect(()=>{
    if (currZoom !== zoom) {
      let {x, y} = currPos;
      x *= zoom/currZoom;
      y *= zoom/currZoom;
      
      setDraggablePos({x, y});
      setCurrPos({x, y});
      setCurrZoom(zoom);
    }
  })
  const onDrag = (e, {x, y}) => {
    setCurrPos({x, y});
    // console.log(currPos);
    setDraggablePos(undefined);
  }

  // TEXT
  const [currText, setText] = useState(text);
  const thisOnChange = (t) => {
    setText(t);
    onChange(t, id);
  }

  // EDIT TEXT
  const [editing, setEditing] = useState(false);
  const thisOnEdit = (x) => {
    if (x === 0) {
      setEditing(false);
      return;
    }
    setEditing(true);
    return onEdit(id);
  }

  return (
    <Draggable grid={[zoom, zoom]} disabled={editing} position={draggablePos} onDrag={onDrag}>
      <div><TextBlock 
        text={currText}
        onChange={thisOnChange}
        zoom={zoom}
        canEdit={thisOnEdit}
        onFontChange={(f) => {onFontChange(f, id);}} 
        highlighted={highlighted}
        onClick={()=>{onClick(id);}}
      /></div>
    </Draggable>
  );
}