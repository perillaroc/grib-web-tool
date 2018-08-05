import React from 'react'
import ReactDOM from 'react-dom'


class GribWebToolApp extends React.Component {
  render(){
    return (
      <div>
        <p>This is a GRIB Web Tool.</p>
      </div>
    )
  }
}


ReactDOM.render(
  <GribWebToolApp />,
  document.getElementById('app')
);

