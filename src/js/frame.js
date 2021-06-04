import React from 'react';
import { useState, useRef, useEffect } from "react";
import Text from "./text";
import { defaultText, defaultFontSize } from "./consts";

function max(a,b) {
  return a>b?a:b;
}

// const [currEditing, setCurrEditing] = useState(null);
// let currEditing = null;

export default function Frame(props) {
  const [height, setHeight] = useState(props.height);
  const [width, setWidth] = useState(props.width);
  const [zoom, setZoom] = useState(3);
  const [texts, setTexts] = useState([]);
  const [fontSizes, setFontSizes] = useState([]);
  const [styles, setStyles] = useState([]);
  const [currChosen, setChosen] = useState(null);
  const setCurrChosen = (x) => { setChosen(x); Frame.currChosen=x; }
  const setCurrEditing = (x) => { Frame.currEditing=x; }
  const editText = (id) => {
    if (id === null) { // Saving
      setCurrEditing(null);
      return;
    }

    if (Frame.currEditing !== null) return false;
    setCurrEditing(id);
    setCurrChosen(null); // Cancel highlight
    return true;
  }

  const changeText = (newText, index) => {
    if ((isNaN(index)&&index!==null) || index >= texts.length) {
      console.log("Error!! Bad index over array", index, texts);
    }
    texts[index] = newText;
    console.log(texts);
    setTexts(texts);
  }

  const changeFontSize = (newSize, index) => {
    fontSizes[index] = newSize;
    setFontSizes(fontSizes);
  }

  const newText = () => {
    setTexts(texts.concat(defaultText));
    setFontSizes(fontSizes.concat(defaultFontSize));
    setStyles(styles.concat({fontFamily: 'Arial, Helvetica, sans-serif'}));
  }

  const chooseText = (id) => {
    if (currDragged === id) {
      setCurrDragged(null);
      return;
    }
    // if (Frame.currEditing !== null) return; // If editing, then cannot highlight
    setCurrChosen(currChosen===id?null:id);
  }

  const [currDragged, setCurrDragged] = useState(null);
  const dragText = (id) => { setCurrDragged(id); }

  // useEffect(() => {

  // }, []);
  const onKeyDown = (e) => {
    if (e.key === 'Backspace' && Frame.currChosen !== null) {
      console.log(texts, Frame.currChosen)
      changeText(null, Frame.currChosen);
      setCurrChosen(null);
    }
  }

  // const thisRef = useRef(null);
  // useEffect(() => {
  //   const node = thisRef.current;
  //   if (node) {
  //     node.addEventListener('keydown', deleteText);
  //   }
  // }, []);

  return (<div>
    <div 
      className="frame"
      style={{height: `${height*zoom}px`, width: `${width*zoom}px`}}
      // ref={thisRef}
      tabIndex="0"
      onKeyDown={onKeyDown}
    >
        {texts.map((t, i) => t===null?"":<Text
          text={t} key={i}
          id={i}
          zoom={zoom}
          onChange={changeText}
          onEdit={editText}
          onFontSizeChange={changeFontSize}
          onDrag={dragText}
          onDelete={()=>{changeText(null, i);}}
          highlighted={currChosen===i}
          onClick={chooseText}
          style={styles[i]}
        />)}
    </div>
    <div>
      <div className="options">
        <div>Zoom: 
          <button onClick={()=>setZoom(max(1,zoom-1))}>-</button>
          <button onClick={()=>setZoom(zoom+1)} >+</button>
        </div>
        <button onClick={newText}>New</button>
        {Frame.currEditing}
      </div>
    </div>
  </div>);
}

Frame.currEditing = null;
Frame.currChosen = null;