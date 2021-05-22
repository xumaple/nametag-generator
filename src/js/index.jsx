import React from 'react';
import ReactDOM from 'react-dom';

function Index(props) {
    return (
        <div>'Hello! Welcome to Nametags :)</div>
    );
}

ReactDOM.render(
  <Index url="/api/" />,
  document.getElementById('reactEntryPoint'),
);
