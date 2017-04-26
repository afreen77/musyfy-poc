import React from 'react';
import { render } from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const container = document.createElement('container');
  render(<App />, container);
});
