import React from 'react';
import { useState } from "react";
import Text from "./text";
import { defaultText, defaultFontSize } from "./consts";

function max(a,b) {
  return a>b?a:b;
}

export default function Frame(props) {
  const [height, setHeight] = useState(props.height);
  const [width, setWidth] = useState(props.width);
  const [zoom, setZoom] = useState(3);
  const [texts, setTexts] = useState([]);
  const [fonts, setFonts] = useState([]);
  const [currEditing, setCurrEditing] = useState(null);
  const [currChosen, setCurrChosen] = useState(null);
  const editText = (id) => {
    return true;
  }

  const changeText = (newText, index) => {
    texts[index] = newText;
    setTexts(texts);
  }

  const changeFont = (newFont, index) => {
    
  }

  const newText = () => {
    setTexts(texts.concat(defaultText));
    setFonts(fonts.concat(defaultFontSize))
  }

  const chooseText = (id) => {

  }

  return (<div>
    <div className="frame" style={{height: `${height*zoom}px`, width: `${width*zoom}px`}}>
        {texts.map((t, i) => <Text
          text={t} key={i}
          id={i}
          zoom={zoom}
          onChange={changeText}
          onEdit={editText}
          onFontChange={changeFont}
          highlighted={currChosen===i}
          onClick={chooseText}
        />)}
    </div>
    <div>
      <div className="options">
        <div>Zoom: 
          <button onClick={()=>setZoom(max(1,zoom-1))}>-</button>
          <button onClick={()=>setZoom(zoom+1)} >+</button>
        </div>
        <button onClick={newText}>New</button>
      </div>
    </div>
  </div>);
}
