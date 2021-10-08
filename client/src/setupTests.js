// src/setupTests.js
// Testing library for front-end. Includes boilerplate code originally by using "create-react-app".
// NOTE: To run testing, use "npm test". - Zane
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

const originalConsoleError = console.error;

// Proptype testing for all passed props in components
console.error = message => {
  if (/(Failed prop type)/.test(message)) {
    throw new Error(message);
  }

  originalConsoleError(message);
};

// This code snippet removes the "Error: Not implemented: window.scrollTo" output when running npm test
const noop = () => { };
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

// This code snippet removes the "Error: Not implemented: navigation (except hash changes)" output when running npm test
delete window.location;
window.location = { assign: jest.fn(), reload: jest.fn() };

afterAll(() => {
  window.location.assign.mockClear();
  window.location.reload.mockClear();
});
