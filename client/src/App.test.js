import React from 'react';
import ReactDOM from 'react-dom';
import App, { resetToggleDisplay, removeNoJavaScriptDiv } from './App';
import { toggleDisplayNav } from './components/Header.js';

/**
 *  Testing library for front-end. Includes boilerplate code originally by using "create-react-app". 
 *  To run this file, use "npm test". - Zane
 */

const originalConsoleError = console.error;

// App render testing
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

// Proptype testing for all passed props in components.
console.error = message => {
  if (/(Failed prop type)/.test(message)) {
    throw new Error(message);
  }

  originalConsoleError(message);
};

// resetToggleDisplay() testing; src: client/src/App.js
it("doesn't output anything", () => {
  expect(resetToggleDisplay).toBe(undefined);
});

// removeNoJavaScriptDiv() testing; src: client/src/components/App.js
it("doesn't output anything", () => {
  expect(removeNoJavaScriptDiv).toBe(undefined);
});

// toggleDisplayNav() testing; src: client/src/components/Header.js
it("doesn't output anything", () => {
  expect(toggleDisplayNav).toBe(undefined);
});
