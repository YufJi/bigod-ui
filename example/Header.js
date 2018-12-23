import React from 'react';
import ReactDOM from 'react-dom';

import { Header } from '../src'
// import '../src/Header/index.less'

ReactDOM.render(<div>
  <Header 
    title="test header"
    style={{
      background: '#18A0F0',
      color: '#fff',
    }}
    backIconStyle={{
      color: '#fff',
    }}
  />
  <div style={{height: '1000px'}}>1212</div>
</div>, document.querySelector('#__next'));