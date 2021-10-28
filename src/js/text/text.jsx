import React from 'react';
import { useState, useRef, useEffect } from "react";
import Draggable from 'react-draggable';
import { useTextWidth } from './useTextWidth'
import TextBlock from './textBlock';
import { defaultStartingPos } from '../consts';
// import styles from './style.css';

export default function Text({ text, zoom, id, onChange, onEdit, fontSize, onFontSizeChange, onDelete, selected, onClick, style, beingDragged, onDrag, alignment }) {
  // POSITION AND ZOOM
  const [currZoom, setCurrZoom] = useState(zoom);
  const [draggablePos, setDraggablePos] = useState(defaultStartingPos);
  const [currPos, setCurrPos] = useState(draggablePos);
  const textWidth = useTextWidth({text, font: `${fontSize}px ${style.fontFamily}`});
  useEffect(()=>{ // Change zoom
      let {x, y} = currPos;
      x *= zoom/currZoom;
      y *= zoom/currZoom;
      
      setDraggablePos({x, y});
      setCurrPos({x, y});
      setCurrZoom(zoom);
  }, [zoom]);
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
    console.log(currPos.x, currPos.y, x, y, textWidth);
    onDrag(id, x, y);
  };
  const {hAlign, vAlign} = alignment;
  // if (hAlign === 0) {
  //   const rem = (currPos.x + zoom*textWidth/2) % zoom;
  //   if (rem !== 0) {
  //     currPos.x = currPos.x + (rem>=(zoom*.5)?1:0)-rem;
  //     setCurrPos(currPos);
  //     setDraggablePos(currPos);
  //     console.log('new:', currPos);
  //   }
  // }
  // else if (hAlign > 0) {
  //   const rem = (currPos.x + zoom*textWidth) % zoom;
  //   if (rem !== 0) {
  //     currPos.x = currPos.x + (rem>=(zoom*.5)?1:0)-rem;
  //     setCurrPos(currPos);
  //     setDraggablePos(currPos);
  //     console.log('new:', currPos);
  //   }
  // }
  let hrem = 0, vrem = 0;
  if (hAlign < 0) hrem = currPos.x % zoom;
  if (hAlign === 0) hrem = (currPos.x + zoom*textWidth/2) % zoom;
  else if (hAlign > 0) hrem = (currPos.x + zoom*textWidth) % zoom;
  // if (vAlign === 0) vrem = (currPos.y + zoom*textHeight/2) % zoom;
  // else if (valign > 0) vrem = (currPos.y + zoom*textHeight) % zoom;
  let needsUpdate = false;
  if (hrem !== 0) {
    currPos.x += (hrem>=(zoom*.5)?1:0)-hrem;
    needsUpdate = true;
  }
  if (vrem !== 0) {
    currPos.y += (vrem>=(zoom*.5)?1:0)-vrem;
    needsUpdate = true;
  }
  if (needsUpdate) {
    setCurrPos(currPos);
    setDraggablePos(currPos);
    console.log(currPos);
  }

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
        textWidth={textWidth}
      /></div>
    </Draggable></div>
  );
}