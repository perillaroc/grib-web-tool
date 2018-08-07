import React from 'react';
import ReactDOM from 'react-dom';

import GribWebToolApp from './app/grib_web_tool_app';

require('./indes.scss');

ReactDOM.render(
  <GribWebToolApp />,
  document.getElementById('app')
);

