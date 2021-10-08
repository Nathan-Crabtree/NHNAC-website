// AccountSettings.test.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';

// Import functions
import AccountSettings, { unsubscribe } from "../AccountSettings";

// AccountSettings render testing
it('renders without crashing', () => {
  shallow(<BrowserRouter><AccountSettings /></BrowserRouter>);
});

// unsubscribe testing
describe('unsubscribe Test', () => {
  it('mocks reload function', () => {
    expect(jest.isMockFunction(window.location.reload)).toBe(true);
  });

  it('calls reload function', () => {
    unsubscribe(); // as defined above..
    expect(window.location.reload).toHaveBeenCalled();
  });
});