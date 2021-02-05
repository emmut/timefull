import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './lib/fonts';

// global styling
import 'reset-css';
import '../scss/global.scss';

ReactDOM.render(<App />, document.getElementById('root'));
