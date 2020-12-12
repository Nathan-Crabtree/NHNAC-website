import React from 'react';
import ReactDOM from 'react-dom';
import App, { setGeoDataExists, onSubmit, resetToggleDisplay, removeNoJavaScriptDiv, emailIsValid, reviseName } from './App';
import { toggleDisplayNav } from './components/Header';
import { showModal, closeModal, onKeyDown, onClickOutside, toggleScrollLock } from './components/Container';
import { displayForm } from './components/Modal';
import { onSubmit as onSubmitFeedback } from './components/Feedback';
import { onSubmit as onSubmitAbout } from './components/static/About';
import { onSubmit as onSubmitSignUp } from './components/static/SignUp';


/**
 *  Testing library for front-end. Includes boilerplate code originally by using "create-react-app". 
 *  To run this file, use "npm test --env=jsdom". - Zane
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

// This code snippet removes the "Error: Not implemented: window.scrollTo" output when running npm test.
const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

// APP.JS FUNCTION(S)

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

// removeNoJavaScriptDiv() testing; src: client/src/App.js
it("doesn't output anything", () => {
  expect(removeNoJavaScriptDiv).toBe(undefined);
});

// toggleScrollLock() testing; src: client/src/App.js
it("doesn't output anything", () => {
  expect(toggleScrollLock).toBe(undefined);
});

// emailIsValid() testing; src: client/src/App.js
it("doesn't output anything", () => {
  expect(emailIsValid).toBe(undefined);
});

// reviseName() testing; src: client/src/components/static/SignUp.js
it("doesn't output anything", () => {
  expect(reviseName).toBe(undefined);
});

// CONTAINER.JS FUNCTION(S)

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

// MODAL.JS FUNCTION(S)

// displayForm() testing; src: client/src/components/Modal.js
it("doesn't output anything", () => {
  expect(displayForm).toBe(undefined);
});

// FEEDBACK.JS FUNCTION(S)

// onSubmit() testing; src: client/src/components/Feedback.js
it("doesn't output anything", () => {
  expect(onSubmitFeedback).toBe(undefined);
});

// ABOUT.JS FUNCTION(S)

// onSubmit() testing; src: client/src/components/static/About.js
it("doesn't output anything", () => {
  expect(onSubmitAbout).toBe(undefined);
});

// HEADER.JS FUNCTION(S)

// toggleDisplayNav() testing; src: client/src/components/Header.js
it("doesn't output anything", () => {
  expect(toggleDisplayNav).toBe(undefined);
});

// SIGNUP.JS FUNCTION(S)

// onSubmit() testing; src: client/src/components/static/SignUp.js
it("doesn't output anything", () => {
  expect(onSubmitSignUp).toBe(undefined);
});
