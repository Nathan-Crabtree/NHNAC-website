// ProfileViewer.test.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';

// Import functions
import ProfileViewer, { connectUser, cancelConnect } from "../ProfileViewer";

// ProfileViewer render testing
it('renders without crashing', () => {
  shallow(<BrowserRouter><ProfileViewer /></BrowserRouter>);
});

// connectUser testing
describe('connectUser Test', () => {
  it('mocks reload function', () => {
    expect(jest.isMockFunction(window.location.reload)).toBe(true);
  });

  it('calls reload function', () => {
    connectUser(); // as defined above..
    expect(window.location.reload).toHaveBeenCalled();
  });
});

// cancelConnect testing
describe('connectUser Test', () => {
  it('mocks reload function', () => {
    expect(jest.isMockFunction(window.location.reload)).toBe(true);
  });

  it('calls reload function', () => {
    cancelConnect(); // as defined above..
    expect(window.location.reload).toHaveBeenCalled();
  });
});