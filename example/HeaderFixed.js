import React from 'react';
import ReactDOM from 'react-dom';

import { HeaderFixed } from '../src'

ReactDOM.render(<div>
  <HeaderFixed 
    title="test header"

  />
  <div style={{height: '1000px'}}>1212</div>
</div>, document.querySelector('#__next'));