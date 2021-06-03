import React from 'react';
import ReactDOM from 'react-dom';
import Frame from './frame';

function Index(props) {
  return (
    <div className="main">
      Hello! Welcome to Nametags :)
      <Frame height="160" width="252"/>
    </div>
  );
}

ReactDOM.render(
  <Index url="/api/" />,
  document.getElementById('reactEntryPoint'),
);
