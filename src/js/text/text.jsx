import React from 'react';
import { useState, useRef, useEffect } from "react";
import Draggable from 'react-draggable';
import { useTextWidth } from '@imagemarker/use-text-width'
import TextBlock from './textBlock';
import { defaultFontSize, frameHeight, frameWidth } from '../consts';
// import styles from './style.css';

export default function Text({ text, zoom, id, onChange, onEdit, fontSize, onFontSizeChange, onDelete, selected, onClick, style, beingDragged, onDrag, alignment }) {
  // POSITION AND ZOOM
  const [currZoom, setCurrZoom] = useState(zoom);
  const [draggablePos, setDraggablePos] = useState({x: -15*defaultFontSize, y: 0});
  const [currPos, setCurrPos] = useState(draggablePos);
  const textWidth = useTextWidth({text, font: `${fontSize}px ${style.fontFamily}`});
  // console.log(`${style.fontFamily} ${currZoom*fontSize}px`, textWidth);
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

    // Change x, y for python alignment-wary zoom-wary coords
    x /= currZoom;
    y /= currZoom;
    const {hAlign, vAlign} = alignment;
    if (hAlign === 0) {
      x += textWidth/2;
    }
    else if (hAlign > 0) {
      x += textWidth;
    }
    // if (vAlign === 0) {

    // }
    // else if (vAlign > 0) {
      
    // }
    console.log(x, y, textWidth);
    onDrag(id, x, y);
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

  return (<div>
    <Draggable 
      grid={[zoom, zoom]}
      disabled={editing}
      position={draggablePos}
      onDrag={onBeingDragged}
      onKeyDown={(e)=>{console.log(e.key);}}
      // defaultPosition={{x: 100, y: 100}}
    >
      <div><TextBlock 
        text={currText}
        onChange={thisOnChange}
        zoom={zoom}
        canEdit={thisOnEdit}
        fontSize={fontSize}
        onFontSizeChange={(f) => {onFontSizeChange(f, id);}}
        selected={selected}
        onClick={()=>{onClick(id);}}
        style={style}
        beingDragged={beingDragged}
        alignment={alignment}
      /></div>
    </Draggable></div>
  );
}