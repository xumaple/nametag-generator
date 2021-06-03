// @ts-nocheck
import React from 'react';
import { useState, useRef, useEffect } from "react";
import Draggable from 'react-draggable';
import TextBlock, { EditableText } from './textBlock3';

export default function Text({ text, zoom, id, onChange }) {
  function getFontSizeString(z) {
    return `${zoom*fontSize}px`;
  }

  const onDrag = (e, {x, y}) => {
    // console.log(data.x, data.y);
    // console.log(id);
    setCurrPos({x, y});
    setPos(undefined);
  }

  const textId = `text-input-${id}`

  const onMouseDown = (e, data) => {
    // console.log(id, text)
  }

  const [currZoom, setCurrZoom] = useState(zoom);
  // const [tHeight, setHeight] = useState(10);
  const [fontSize, setFontSize] = useState(12);
  const [fontSizeString, setFontSizeString] = useState(getFontSizeString(zoom));
  const [pos, setPos] = useState({x: 0, y: id*zoom*10});
  const [currPos, setCurrPos] = useState(pos);
  const [editing, setEditing] = useState(false);
  const [currText, setText] = useState(text);

  const [hoverRef, isHovered] = useHover();

  const thisOnChange = (t) => {
    setText(t);
    onChange(t, id);
  }
  useEffect(()=>{
    if (currZoom !== zoom) {
      setFontSizeString(getFontSizeString(zoom));
      // console.log($(textId));
      let {x, y} = currPos;
      x *= zoom/currZoom;
      y *= zoom/currZoom;
      // if (id === 2) {
      //   console.log(currPos, zoom, currZoom);
      //   console.log(x, y);
      // }
      
      setPos({x, y});
      setCurrPos({x, y});
      setCurrZoom(zoom);
    }
  })
  
  return (
    <div>
      <Draggable 
        onDrag={onDrag}
        onMouseDown={onMouseDown}
        grid={[zoom, zoom]}
        position={pos}
      >
        <div id={textId} className={isHovered?"text-highlight":"text"} style={{fontSize: fontSizeString}} ref={hoverRef}>
          <TextBlock text={currText} onChange={thisOnChange} onEdit={setEditing} />
          {isHovered?
            <div className="text-font-size">
              <button onClick={()=>{console.log('hi1');setFontSize(fontSize-1);}} >-</button>
              <button onClick={()=>{console.log('hi2');setFontSize(fontSize+1);}} >+</button>
            </div>:""
          }
        </div>
      </Draggable>
      
    </div>
  );
}


function useHover() {
  const [hover, setHover] = useState(false);
  const handleMouseOver = () => {setHover(true);console.log('a')}
  const handleMouseOut = () => {setHover(false);console.log('b')}

  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    node.addEventListener("mouseover", handleMouseOver)
    node.addEventListener("mouseout", handleMouseOut)
    if (node) {
      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [ref.current]); // Re-run effect only if ref changes
  return [ref, hover];
}