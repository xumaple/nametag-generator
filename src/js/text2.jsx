
import React from 'react';
import { useState, useRef, useEffect } from "react";
import Draggable from 'react-draggable';

export default function Text({text, zoom}) {
  const [text, setText] = useState(props.text);
  const [tHeight, setHeight] = useState(0);
  const [tWidth, setWidth] = useState(0);
  const [hoverRef, isHovered] = useDrag();
  const [fontSize, setFontSize] = useState(`${zoom*8}`);
  const onDrag = (e, data) => {
    // console.log(data.x, data.y);
    
  }
  return (<Draggable onDrag={onDrag} style={{fontSize}} bounds={{left: 0, top: 0, right: 504-tWidth, bottom: 320-tHeight}}>
    <div className="text" ref={hoverRef}>{text}</div>
  </Draggable>);
  // console.log(props.text)
  // return (<div>asdf</div>);
  // return (<div className="text" ref={hoverRef}>{props.text}</div>);
}

// Hook
function useDrag() {
  const [inside, setInside] = useState(false);
  const [clicked, setClicked] = useState(false);
  const ref = useRef(null);
  const handleMouseOver = () => setInside(true);
  const handleMouseOut = () => setInside(false);
  const handleMouseDown = () => {
    if (inside) {
      setClicked(inside);
      ref.current.addEventListener("mousemove", handleMouseMove);
    }
  }
  const handleMouseUp = () => {
    setClicked(false);
    ref.current.removeEventListener("mousemove", handleMouseMove);
  }
  const handleMouseMove = (e) => {
    const el=e.target;
    console.log(el.offsetWidth)
    // let l = parseInt(el.style.left);
    // if (isNaN(l)) l = 0;
    // let t = parseInt(el.style.top);
    // if (isNaN(t)) t = 0;
    // console.log(e.offsetX, e.offsetY, el.style, l+e.offsetX);
    // el.style.left = `${l+e.offsetX/2}px`
    // el.style.top = `${t+e.offsetY/2}px`
  }
  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);
      node.addEventListener("mousedown", handleMouseDown);
      node.addEventListener("mouseup", handleMouseUp);
      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
        node.removeEventListener("mousedown", handleMouseDown);
        node.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [ref.current]); // Re-run effect only if ref changes
  return [ref, clicked];
}