import React from 'react';
import ReactDOM from 'react-dom';
import App, { setGeoDataExists, onSubmit, resetToggleDisplay, removeNoJavaScriptDiv, 
emailIsValid, reviseName, setCookiePolicyDisplayed, deauthenticate } from './App';
import { toggleDisplayNav, onSubmit as onSubmitHeader } from './components/Header';
import { showModal, closeModal, onKeyDown, onClickOutside, toggleScrollLock } from './components/Container';
import { displayForm } from './components/Modal';
import { onSubmit as onSubmitFeedback } from './components/Feedback';
import { onSubmit as onSubmitAbout } from './components/static/About';
import { onSubmit as onSubmitSignUp } from './components/static/SignUp';
import { plusSides, currentSlide, showSlides, showSlidesAuto } from './components/static/Slideshow';
import { setStateHandler } from './components/Content';
import { displayComments, hideComments, hideResponses, displayForm as displayFormArticle, hideForm,
         onSubmit as onSubmitArticle } from './components/Article';

/**
 *  Testing library for front-end. Includes boilerplate code originally by using "create-react-app". 
 *  To run this file, use "npm test --env=jsdom". - Zane
 * 
 */

/**
 *  NOTICE: Testing currently is not efficient. It offers no resourceful information for project debugging. 
 *  App.test.js will be undergoing major maintenance soon. - Zane
 * 
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

// setGeoDataExists testing; src: client/src/App.js
it("doesn't output anything", () => {
  expect(setGeoDataExists).toBeUndefined();
});

// onSubmit testing; src: client/src/App.js
it("doesn't output anything", () => {
  expect(onSubmit).toBeUndefined();
});

// resetToggleDisplay testing; src: client/src/App.js
it("doesn't output anything", () => {
  expect(resetToggleDisplay).toBeUndefined();
});

// removeNoJavaScriptDiv testing; src: client/src/App.js
it("doesn't output anything", () => {
  expect(removeNoJavaScriptDiv).toBeUndefined();
});

// toggleScrollLock testing; src: client/src/App.js
it("doesn't output anything", () => {
  expect(toggleScrollLock).toBeUndefined();
});

// emailIsValid testing; src: client/src/App.js
it("doesn't output anything", () => {
  expect(emailIsValid).toBeUndefined();
});

// reviseName testing; src: client/src/components/static/App.js
it("doesn't output anything", () => {
  expect(reviseName).toBeUndefined();
});

// setCookiePolicyDisplayed testing; src: client/src/components/static/App.js
it("doesn't output anything", () => {
  expect(setCookiePolicyDisplayed).toBeUndefined();
});

// deauthenticate testing; src: client/src/components/static/App.js
it("doesn't output anything", () => {
  expect(deauthenticate).toBeUndefined();
});

// CONTAINER.JS FUNCTION(S)

// showModal testing; src: client/src/components/Container.js
it("doesn't output anything", () => {
  expect(showModal).toBeUndefined();
});

// closeModal testing; src: client/src/components/Container.js
it("doesn't output anything", () => {
  expect(closeModal).toBeUndefined();
});

// onKeyDown testing; src: client/src/components/Container.js
it("doesn't output anything", () => {
  expect(onKeyDown).toBeUndefined();
});

// onClickOutside testing; src: client/src/components/Container.js
it("doesn't output anything", () => {
  expect(onClickOutside).toBeUndefined();
});

// MODAL.JS FUNCTION(S)

// displayForm testing; src: client/src/components/Modal.js
it("doesn't output anything", () => {
  expect(displayForm).toBeUndefined();
});

// FEEDBACK.JS FUNCTION(S)

// onSubmit testing; src: client/src/components/Feedback.js
it("doesn't output anything", () => {
  expect(onSubmitFeedback).toBeUndefined();
});

// ABOUT.JS FUNCTION(S)

// onSubmit testing; src: client/src/components/static/About.js
it("doesn't output anything", () => {
  expect(onSubmitAbout).toBeUndefined();
});

// HEADER.JS FUNCTION(S)

// toggleDisplayNav testing; src: client/src/components/Header.js
it("doesn't output anything", () => {
  expect(toggleDisplayNav).toBeUndefined();
});

// onSubmit testing; src: client/src/Header.js
it("doesn't output anything", () => {
  expect(onSubmitHeader).toBeUndefined();
});

// SIGNUP.JS FUNCTION(S)

// onSubmit testing; src: client/src/components/static/SignUp.js
it("doesn't output anything", () => {
  expect(onSubmitSignUp).toBeUndefined();
});

// SLIDESHOW.JS FUNCTION(S)

// plusSides testing; src: client/src/components/static/Slideshow.js
it("doesn't output anything", () => {
  expect(plusSides).toBeUndefined();
});

// currentSlide testing; src: client/src/components/static/Slideshow.js
it("doesn't output anything", () => {
  expect(currentSlide).toBeUndefined();
});

// showSlides testing; src: client/src/components/static/Slideshow.js
it("doesn't output anything", () => {
  expect(showSlides).toBeUndefined();
});

// showSlidesAuto testing; src: client/src/components/static/Slideshow.js
it("doesn't output anything", () => {
  expect(showSlidesAuto).toBeUndefined();
});

// CONTENT.JS FUNCTION(S)

// setStateHandler testing; src: client/src/components/static/Content.js
it("doesn't output anything", () => {
  expect(setStateHandler).toBeUndefined();
});

// ARTICLE.JS FUNCTION(S)

// displayComments testing; src: client/src/components/Article.js
it("doesn't output anything", () => {
  expect(displayComments).toBeUndefined();
});

// hideComments testing; src: client/src/components/Article.js
it("doesn't output anything", () => {
  expect(hideComments).toBeUndefined();
});

// hideResponses testing; src: client/src/components/Article.js
it("doesn't output anything", () => {
  expect(hideResponses).toBeUndefined();
});

// displayForm testing; src: client/src/components/Article.js
it("doesn't output anything", () => {
  expect(displayFormArticle).toBeUndefined();
});

// hideForm testing; src: client/src/components/Article.js
it("doesn't output anything", () => {
  expect(hideForm).toBeUndefined();
});

// onSubmit testing; src: client/src/components/Article.js
it("doesn't output anything", () => {
  expect(onSubmitArticle).toBeUndefined();
});