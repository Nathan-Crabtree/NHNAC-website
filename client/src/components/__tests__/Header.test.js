// Header.test.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import Header from '../dynamic/Header';
jest.mock("../App");

// Header render testing
it('renders without crashing', () => {
  shallow(<BrowserRouter><Header /></BrowserRouter>);
});

// toggleDisplayNav testing
it("changes nav styling when hamburger icon or exit icon is clicked", () => {
  const App = require("../App").App();
  const testState = require("../App").testState;

  // hamburgerIcon
  expect(App.props.children[0].props.children.props.children[0].props.style).toHaveProperty('display', 'none');

  // navDiv
  expect(App.props.children[0].props.children.props.children[1].props.style).toHaveProperty('marginTop', '0px');
  expect(App.props.children[0].props.children.props.children[1].props.style).toHaveProperty('transition', 'margin-top 1s');

  // body
  expect(App.props.style).toHaveProperty('overflow', 'hidden');

  // main
  expect(App.props.children[1].props.children[0].props.style).toHaveProperty('filter', 'brightness(50%)');
  expect(App.props.children[1].props.children[0].props.style).toHaveProperty('position', 'relative');
  expect(App.props.children[1].props.children[0].props.style).toHaveProperty('zIndex', '-1');

  // footer
  expect(App.props.children[1].props.children[1].props.style).toHaveProperty('filter', 'brightness(50%)');
  expect(App.props.children[1].props.children[1].props.style).toHaveProperty('position', 'relative');
  expect(App.props.children[1].props.children[1].props.style).toHaveProperty('zIndex', '-1');

  require('../App').toggleDisplayNavMock();

  // styling should change once event is trigged
  expect(testState.hamburgerIcon.display).toEqual("block");
  expect(testState.navDiv.marginTop).toEqual("-485.7px");
  expect(testState.navDiv.transition).toEqual("margin-top 1s");
  expect(testState.body.overflow).toEqual("scroll");
  expect(testState.main.filter).toEqual("brightness(100%)");
  expect(testState.footer.filter).toEqual("brightness(100%)");
});
