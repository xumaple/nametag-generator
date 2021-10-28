import React from 'react';
import { useState, useEffect } from 'react';
import css from './style.css';


export function SelectableOptions({ options, currOption, onSelect, textInputWidth } ) {
  const [prevOption, setPrevOption] = useState(currOption);
  const [showRedInput, setShowRedInput] = useState(false);
  const [text, setText] = useState(options.includes(currOption)?"":currOption);
  const select = (e) => {
    // console.log(e.target.value);
    // setOption(e.target.value);
    console.log(e.target.value);
    
    setShowRedInput(false);
    if (e.target.value === "" || onSelect(e.target.value) === false) {
      console.log('hi')
      setShowRedInput(true);
      return;
    }
    setPrevOption(e.target.value);
    setText(""); // success; therefore cancel out the text
  };

  useEffect(()=>{
    if (currOption !== prevOption) {
      setText(options.includes(currOption)?"":currOption);
      setPrevOption(currOption);
      console.log('changing option');
    }
  }, [currOption]);

  return (<div>
    {textInputWidth>0?<input
      style={{width: `${textInputWidth}px`, backgroundColor: showRedInput?"red":undefined}}
      type="text"
      onKeyPress={(e) => {console.log(e.key); if (e.key==="Enter") {select(e);setText(e.target.value);}}}
      value={text}
      onChange={(e)=>{setText(e.target.value);}}
    ></input>:""}
    <select onChange={select} value={currOption} >
      {options.map((o, i) => {

        return <option key={i} value={o}>{o}</option>;
      })}
    </select>
  </div>);
}

export function ToggleButton({ buttonText, toggleState, currState, onClick }) { // ToggleState is the state it wants to be in to be selected
  const [selected, setSelected] = useState(toggleState === currState);
  // console.log(css);
  useEffect(()=>{
    setSelected(toggleState === currState);
  });
  return <button 
    className={selected?"toggle-button-y":"toggle-button-n"}
    onClick={(e) => { e.stopPropagation(); onClick(toggleState); }}
  >{buttonText}</button>
}