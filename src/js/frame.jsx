import React from 'react';
import { useState, useRef, useEffect } from "react";
import Text from "./text/text";
import StyleBar from "./stylebar";
import { defaultText, defaultFontSize, defaultFontFamily } from "./consts";
import { fetch_with_json } from "./util";
// import css from './style.css';
import PdfDisplay from './pdfDisplay'; 

function max(a,b) {
  return a>b?a:b;
}

export default function Frame(props) {
  const [height, setHeight] = useState(props.height);
  const [width, setWidth] = useState(props.width);
  const [zoom, setZoom] = useState(3);
  const [texts, setTexts] = useState([]);
  const [positions, setPositions] = useState([]);
  const [fontSizes, setFontSizes] = useState([]);
  const [styles, setStyles] = useState([]);
  const [alignments, setAlignments] = useState([]);
  const [currChosen, setCurrChosen] = useState(null);
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
    if (newText === "") newText = null;
    setCurrChosen(index);
    texts[index] = newText;
    console.log(texts);
    setTexts(texts);
  }

  const changeFontSize = (newSize, index) => {
    fontSizes[index] = newSize;
    setFontSizes(Array.from(fontSizes));
  }

  const changeAlignment = (newAlignment, index) => {
    alignments[index] = newAlignment;
    console.log(alignments);
    setAlignments(Array.from(alignments));
  }

  const changeStyle = (newStyle, index) => {
    styles[index] = newStyle;
    setStyles(Array.from(styles));
  }

  const newText = () => {
    setTexts(texts.concat(defaultText));
    setFontSizes(fontSizes.concat(defaultFontSize));
    setStyles(styles.concat({fontFamily: defaultFontFamily}));
    setAlignments(alignments.concat({hAlign: -1, vAlign: -1}));
  }

  const deleteText = (index) => {
    changeText(null, index);
    setCurrChosen(null);
    console.log('deleted')
  }

  const chooseText = (id) => {
    if (currDragged === id) {
      setCurrDragged(null);
      return;
    }
    if (Frame.currEditing !== null) return; // If editing, then cannot highlight
    setCurrChosen(currChosen===id?null:id);
  }

  const [currDragged, setCurrDragged] = useState(null);
  const dragText = (id, x, y) => {
    if (id !== currDragged) setCurrDragged(id);
    setCurrChosen(id);
    positions[id] = {x, y};
    setPositions(Array.from(positions));
  }

  const onKeyDown = (e) => {
    if (e.key === 'Backspace' && currChosen !== null && currChosen !== Frame.currEditing) {
      deleteText(currChosen);
    }
  }

  // const pdfId = 
  const sendFetch = (e) => {
    e.preventDefault();
    fetch_with_json(`${props.url}getPDF`, [texts, positions, fontSizes, styles])
      .then(response => response.json())
      .then(data => {
        data['id']
      })
      .catch(error=>{console.log(error);});
  }

  const [info, setInfo] = useState('BRIGHT');
  const [pdf, setPdf] = useState(null);
  const clickButton = (e) => {
    // fetch('https://google.com')
    //   .then(data => setInfo(data))
    //   // .then(data => data.json())
    //   // .then(json => {
    //   //   setInfo(json['field'])
    //   // });
    fetch('/api/pdfs/test.pdf', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
    })
    .then((response) => response.blob())
    .then((blob) => { setPdf(blob); })
    .catch((e) => { console.log(e); });
  };

  return (<div><button onClick={clickButton}>{info}</button>
    <div 
      className="frame"
      style={{height: `${height*zoom}px`, width: `${width*zoom}px`, borderWidth: `${0.03*zoom}in`}}
      tabIndex="0"
      onKeyDown={onKeyDown}
    >
      {currDragged !== null?<div className="vl-red"></div>:""}
      {texts.map((t, i) => t===null?"":<Text
        text={t} key={i}
        id={i}
        zoom={zoom}
        onChange={changeText}
        onEdit={editText}
        fontSize={fontSizes[i]}
        onFontSizeChange={changeFontSize}
        beingDragged={i===currDragged?true:false}
        onDrag={dragText}
        onDelete={()=>{changeText(null, i);}}
        selected={currChosen===i}
        onClick={chooseText}
        style={styles[i]}
        alignment={alignments[i]}
      />)}
    </div>
    <div>
      <div className="options">
        <div><button onClick={sendFetch}>Send</button></div>
        <div>Zoom: 
          <button onClick={()=>setZoom(max(1,zoom-1))}>-</button>
          <button onClick={()=>setZoom(zoom+1)} >+</button>
        </div>
        <button onClick={newText}>New</button>
        <div>
          {currChosen !== null ? <StyleBar 
            fontSize={fontSizes[currChosen]} 
            onFontSizeChange={(x)=>{
              if (isNaN(x)) return false;
              changeFontSize(parseInt(x), currChosen);
              return true;
            }}
            alignment={alignments[currChosen]}
            onAlignmentChange={(a)=>{
              changeAlignment(a, currChosen);
              return true;
            }}
            style={styles[currChosen]}
            onStyleChange={(s)=>{
              changeStyle(s, currChosen);
              return true;
            }}
            onDelete={deleteText}
          />:""}
        </div>
      </div>
    </div>
    {pdf !== null ? <PdfDisplay file={pdf} /> : ""}
  </div>);
}

Frame.currEditing = null;