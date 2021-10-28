import "core-js/es6";
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import Frame from './frame';
import { frameHeight, frameWidth, defaultFontFamily, fontFamilysList } from './consts';
// import css from './style.css';


function Index(props) {
  return (
    <div className="main">
      Hello! Welcome to Nametags :)
      <Frame height={frameHeight} width={frameWidth} url={props.url}/>
    </div>
  );
}

// Load fonts first, so that first time loading textWidth is correct.
// Only load react after first font has been loaded
var Observer = require('fontfaceobserver');
let font = new Observer(defaultFontFamily);
font.load().then(() => {
  ReactDOM.render(
    <Index url="/api/v1/" />,
    document.getElementById('reactEntryPoint'),
  );
});

fontFamilysList.forEach((f) => {
  let loader = new Observer(f);
  loader.load();
})