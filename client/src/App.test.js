import React from 'react';
import ReactDOM from 'react-dom';
import App, { setGeoDataExists, onSubmit, resetToggleDisplay, removeNoJavaScriptDiv } from './App';
import { toggleDisplayNav } from './components/Header.js';
import { showModal, closeModal, onKeyDown, onClickOutside, toggleScrollLock } from './components/Container.js';
import { displayForm } from './components/Modal.js';


/**
 *  Testing library for front-end. Includes boilerplate code originally by using "create-react-app". 
 *  To run this file, use "npm test". - Zane
 */

 /**
  *  NOTICE: Testing currently is not efficient. It offers no resourceful information for project debugging. 
  *  App.test.js will be undergoing major maintenance soon. - Zane
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

// setGeoDataExists() testing; src: client/src/App.js
it("doesn't output anything", () => {
  expect(setGeoDataExists).toBe(undefined);
});

// onSubmit() testing; src: client/src/App.js
it("doesn't output anything", () => {
  expect(onSubmit).toBe(undefined);
});


// resetToggleDisplay() testing; src: client/src/App.js
it("doesn't output anything", () => {
  expect(resetToggleDisplay).toBe(undefined);
});

// removeNoJavaScriptDiv() testing; src: client/src/components/App.js
it("doesn't output anything", () => {
  expect(removeNoJavaScriptDiv).toBe(undefined);
});

// toggleScrollLock() testing; src: client/src/App.js
it("doesn't output anything", () => {
  expect(toggleScrollLock).toBe(undefined);
});

// toggleDisplayNav() testing; src: client/src/components/Header.js
it("doesn't output anything", () => {
  expect(toggleDisplayNav).toBe(undefined);
});

// showModal() testing; src: client/src/components/Container.js
it("doesn't output anything", () => {
  expect(showModal).toBe(undefined);
});

// closeModal() testing; src: client/src/components/Container.js
it("doesn't output anything", () => {
  expect(closeModal).toBe(undefined);
});

// onKeyDown() testing; src: client/src/components/Container.js
it("doesn't output anything", () => {
  expect(onKeyDown).toBe(undefined);
});

// onClickOutside() testing; src: client/src/components/Container.js
it("doesn't output anything", () => {
  expect(onClickOutside).toBe(undefined);
});

// displayForm() testing; src: client/src/components/Modal.js
it("doesn't output anything", () => {
  expect(displayForm).toBe(object);
});
