import React from 'react';
import { useState, useRef, useEffect } from "react";
import Draggable from 'react-draggable';
import TextBlock from './textBlock';
import { defaultFontSize } from "./consts";

export default function Text({ text, zoom, id, onChange, onEdit, fontSize, onFontSizeChange, onDelete, highlighted, onClick, style, onDrag }) {
  // POSITION AND ZOOM
  const [currZoom, setCurrZoom] = useState(zoom);
  const [draggablePos, setDraggablePos] = useState({x: -15*defaultFontSize, y: 0});
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
  });
  const onBeingDragged = (e, {x, y}) => {
    setCurrPos({x, y});
    setDraggablePos(undefined);
    onDrag(id, x/currZoom, y/currZoom);
  };

  // TEXT
  const [currText, setText] = useState(text);
  const thisOnChange = (t) => {
    setText(t);
    onChange(t, id);
  };

  // EDIT TEXT
  const [editing, setEditing] = useState(false);
  const thisOnEdit = (x) => {
    if (x === 0) {
      setEditing(false);
      return onEdit(null);
    }
    setEditing(true);
    return onEdit(id);
  };

  return (
    <Draggable 
      grid={[zoom, zoom]}
      disabled={editing}
      position={draggablePos}
      onDrag={onBeingDragged}
      onKeyDown={(e)=>{console.log(e.key);}}
    >
      <div><TextBlock 
        text={currText}
        onChange={thisOnChange}
        zoom={zoom}
        canEdit={thisOnEdit}
        fontSize={fontSize}
        onFontSizeChange={(f) => {onFontSizeChange(f, id);}}
        highlighted={highlighted}
        onClick={()=>{onClick(id);}}
        style={style}
      /></div>
    </Draggable>
  );
}