// Container.test.js
import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';

// Import functions
import Container from '../Container';

// Container render testing
it('renders without crashing', () => {
  shallow(<Container />);
});

// toggleScrollLock testing
it("adds class attribute", () => {
  const Foo = ({ classList, toggleScrollLockTest }) => (
    <html onClick={toggleScrollLockTest} className={classList}></html>
  );

  Foo.propTypes = {
    classList: PropTypes.string.isRequired,
    toggleScrollLockTest: PropTypes.func.isRequired
  };

  let testState = {   // style, attribute
    classList: "bar"
  };
  const wrapper = mount((
    <Foo
      classList={testState.classList}
      toggleScrollLockTest={() => {
        testState.classList = "scroll-lock";
      }}
    />
  ));

  // hamburgerIcon
  expect(wrapper.find('html').get(0).props.className).toEqual('bar');

  wrapper.find('html').at(0).simulate('click');

  // styling should change once event is trigged
  expect(testState.classList).toEqual("scroll-lock");
});