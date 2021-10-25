import "core-js/es6";
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import Frame from './frame';
import { frameHeight, frameWidth } from './consts';
// import css from './style.css';


function Index(props) {
  return (
    <div className="main">
      Hello! Welcome to Nametags :)
      <Frame height={frameHeight} width={frameWidth} url={props.url}/>
    </div>
  );
}

ReactDOM.render(
  <Index url="/api/v1/" />,
  document.getElementById('reactEntryPoint'),
);
