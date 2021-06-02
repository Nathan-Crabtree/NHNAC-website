import React from 'react';
import ReactDOM from 'react-dom';
import App, { setGeoDataExists, onSubmit, resetToggleDisplay, emailIsValid, 
  reviseName, setCookiePolicyDisplayed, deauthenticate, setNewsletterEmailAddress, setSearchFilters, getSearchFilters } from './App';
import { toggleDisplayNav, onSubmit as onSubmitHeader } from './components/dynamic/Header';
import { showModal, closeModal, onKeyDown, onClickOutside, toggleScrollLock } from './components/Container';
import { displayForm } from './components/Modal';
import { onSubmit as onSubmitFeedback } from './components/Feedback';
import { onSubmit as onSubmitReport } from './components/Report';
import { onSubmit as onSubmitSignUp } from './components/static/SignUp';
import { plusSides, currentSlide, showSlides, showSlidesAuto } from './components/static/Slideshow';
import { setStateHandler } from './components/dynamic/Content';
import { displayComments, hideComments, hideResponses, displayForm as displayFormArticle, hideForm,
         onSubmit as onSubmitArticle, displayTypeComponent, setTypeHeader, setTypeBackLink, displayProperContent } from './components/dynamic/Article';
import { countDaysLeft } from './components/dynamic/Suspended';
import { addAttendee, removeAttendee, displayAttendBtnOrForm } from './components/dynamic/EventType';
import { displayForm as displayFormProfile, hideForm as hideFormProfile, onSubmit as onSubmitProfile, collapseDataTable, expandDataTable, 
  displayCollapsedDataTableHeaderAndExpandBtn, resizeDataTable, customizePage, saveSettings } from './components/dynamic/ProfileUser';
import { checkUserConnection, connectUser, cancelConnect } from './components/dynamic/ProfileViewer';
import { displayViewComponent } from './components/dynamic/Profile';
import { hideForm as hideFormRequestID, displayForm as displayFormRequestID, onSubmit as onSubmitRequestID } from './components/static/RequestID';
import { approveOrReject } from './components/Connections';
import { displayConnections } from './components/dynamic/DirectMessage';
import { hideForm as hideFormAccountSettings, displayForm as displayFormAccountSettings, onSubmit as onSubmitAccountSettings, unsubscribe, displaySubscription } from './components/dynamic/AccountSettings';
import { updateFilter, displayPageLinks, displayResults, displaySections, displaySimilarTags } from './components/dynamic/Search';

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

// Proptype testing for all passed props in components
console.error = message => {
  if (/(Failed prop type)/.test(message)) {
    throw new Error(message);
  }

  originalConsoleError(message);
};

// This code snippet removes the "Error: Not implemented: window.scrollTo" output when running npm test
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

// setNewsletterEmailAddress testing; src: client/src/components/static/App.js
it("doesn't output anything", () => {
  expect(setNewsletterEmailAddress).toBeUndefined();
});

// setSearchFilters testing; src: client/src/components/static/App.js
it("doesn't output anything", () => {
  expect(setSearchFilters).toBeUndefined();
});

// getSearchFilters testing; src: client/src/components/static/App.js
it("doesn't output anything", () => {
  expect(getSearchFilters).toBeUndefined();
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

// REPORT.JS FUNCTION(S)

// onSubmit testing; src: client/src/components/Report.js
it("doesn't output anything", () => {
  expect(onSubmitReport).toBeUndefined();
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

// displayTypeComponent testing; src: client/src/components/Article.js
it("doesn't output anything", () => {
  expect(displayTypeComponent).toBeUndefined();
});

// setTypeHeader testing; src: client/src/components/Article.js
it("doesn't output anything", () => {
  expect(setTypeHeader).toBeUndefined();
});

// setTypeBackLink testing; src: client/src/components/Article.js
it("doesn't output anything", () => {
  expect(setTypeBackLink).toBeUndefined();
});

// displayProperContent testing; src: client/src/components/Article.js
it("doesn't output anything", () => {
  expect(displayProperContent).toBeUndefined();
});

// SUSPENDED.JS FUNCTION(S)

// countDaysLeft testing; src: client/src/components/Article.js
it("doesn't output anything", () => {
  expect(countDaysLeft).toBeUndefined();
});

// EVENTTYPE.JS FUNCTION(S)

// removeAttendee testing; src: client/src/components/EventType.js
it("doesn't output anything", () => {
  expect(removeAttendee).toBeUndefined();
});

// addAttendee testing; src: client/src/components/EventType.js
it("doesn't output anything", () => {
  expect(addAttendee).toBeUndefined();
});

// displayAttendBtnOrForm testing; src: client/src/components/EventType.js
it("doesn't output anything", () => {
  expect(displayAttendBtnOrForm).toBeUndefined();
});

// PROFILEUSER.JS FUNCTION(S)

// displayForm testing; src: client/src/components/ProfileUser.js
it("doesn't output anything", () => {
  expect(displayFormProfile).toBeUndefined();
});

// hideForm testing; src: client/src/components/ProfileUser.js
it("doesn't output anything", () => {
  expect(hideFormProfile).toBeUndefined();
});

// onSubmit testing; src: client/src/components/ProfileUser.js
it("doesn't output anything", () => {
  expect(onSubmitProfile).toBeUndefined();
});

// collapseDataTable testing; src: client/src/components/ProfileUser.js
it("doesn't output anything", () => {
  expect(collapseDataTable).toBeUndefined();
});

// expandDataTable testing; src: client/src/components/ProfileUser.js
it("doesn't output anything", () => {
  expect(expandDataTable).toBeUndefined();
});

// displayCollapsedDataTableHeaderAndExpandBtn testing; src: client/src/components/ProfileUser.js
it("doesn't output anything", () => {
  expect(displayCollapsedDataTableHeaderAndExpandBtn).toBeUndefined();
});

// resizeDataTable testing; src: client/src/components/ProfileUser.js
it("doesn't output anything", () => {
  expect(resizeDataTable).toBeUndefined();
});

// customizePage testing; src: client/src/components/ProfileUser.js
it("doesn't output anything", () => {
  expect(customizePage).toBeUndefined();
});

// saveSettings testing; src: client/src/components/ProfileUser.js
it("doesn't output anything", () => {
  expect(saveSettings).toBeUndefined();
});

// PROFILEVIEWER.JS FUNCTION(S)

// checkUserConnection testing; src: client/src/components/ProfileViewer.js
it("doesn't output anything", () => {
  expect(checkUserConnection).toBeUndefined();
});

// connectUser testing; src: client/src/components/ProfileViewer.js
it("doesn't output anything", () => {
  expect(connectUser).toBeUndefined();
});

// cancelConnect testing; src: client/src/components/ProfileViewer.js
it("doesn't output anything", () => {
  expect(cancelConnect).toBeUndefined();
});

// PROFILE.JS FUNCTION(S)

// displayViewComponent testing; src: client/src/components/Profile.js
it("doesn't output anything", () => {
  expect(displayViewComponent).toBeUndefined();
});

// REQUESTID.JS FUNCTION(S)

// displayForm testing; src: client/src/components/RequestID.js
it("doesn't output anything", () => {
  expect(displayFormRequestID).toBeUndefined();
});

// hideForm testing; src: client/src/components/RequestID.js
it("doesn't output anything", () => {
  expect(hideFormRequestID).toBeUndefined();
});

// onSubmit testing; src: client/src/components/RequestID.js
it("doesn't output anything", () => {
  expect(onSubmitRequestID).toBeUndefined();
});

// CONNECTIONS.JS FUNCTION(S)

// approveOrReject testing; src: client/src/components/Connections.js
it("doesn't output anything", () => {
  expect(approveOrReject).toBeUndefined();
});

// DIRECTMESSAGE.JS FUNCTION(S)

// displayConnections testing; src: client/src/components/dynamic/DirectMessage.js
it("doesn't output anything", () => {
  expect(displayConnections).toBeUndefined();
});

// ACCOUNTSETTINGS.JS FUNCTION(S)

// hideForm testing; src: client/src/components/dynamic/AccountSettings.js
it("doesn't output anything", () => {
  expect(hideFormAccountSettings).toBeUndefined();
});

// displayForm testing; src: client/src/components/dynamic/AccountSettings.js
it("doesn't output anything", () => {
  expect(displayFormAccountSettings).toBeUndefined();
});

// onSubmit testing; src: client/src/components/dynamic/AccountSettings.js
it("doesn't output anything", () => {
  expect(onSubmitAccountSettings).toBeUndefined();
});

// unsubscribe testing; src: client/src/components/dynamic/AccountSettings.js
it("doesn't output anything", () => {
  expect(unsubscribe).toBeUndefined();
});

// displaySubscription testing; src: client/src/components/dynamic/AccountSettings.js
it("doesn't output anything", () => {
  expect(displaySubscription).toBeUndefined();
});

// SEARCH.JS FUNCTION(S)

// updateFilter testing; src: client/src/components/dynamic/Search.js
it("doesn't output anything", () => {
  expect(updateFilter).toBeUndefined();
});

// displayPageLinks testing; src: client/src/components/dynamic/Search.js
it("doesn't output anything", () => {
  expect(displayPageLinks).toBeUndefined();
});

// displaySections testing; src: client/src/components/dynamic/Search.js
it("doesn't output anything", () => {
  expect(displaySections).toBeUndefined();
});

// displayResults testing; src: client/src/components/dynamic/Search.js
it("doesn't output anything", () => {
  expect(displayResults).toBeUndefined();
});

// displaySimilarTags testing; src: client/src/components/dynamic/Search.js
it("doesn't output anything", () => {
  expect(displaySimilarTags).toBeUndefined();
});

