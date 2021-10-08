// App.test.js
import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';
jest.mock("../App");

// Import functions
import App, {
  emailIsValid,
  reviseName, checkDates, urlIsValid, filePathIsValid, sanitizeInput,
  desanitize
} from '../App';

// Components
import Deleted from '../static/Deleted';

// App render testing
it('renders without crashing', () => {
  shallow(<App />);
});

// resetToggleDisplay testing
it("changes nav styling when windows is resized", () => {
  const App = require("../App").App();
  const testState = require("../App").testState;

  // Change the viewport to 375px.
  global.innerWidth = 375;

  // Trigger the window resize event.
  global.dispatchEvent(new Event('resize'));

  expect(global.innerWidth).toBe(375);

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

  require('../App').resetToggleDisplayMock();

  // styling should change once event is trigged
  expect(testState.hamburgerIcon.display).toEqual("block");
  expect(testState.navDiv.marginTop).toEqual("-485.7px");
  expect(testState.navDiv.transition).toEqual("margin-top 0s");
  expect(testState.body.overflow).toEqual("scroll");
  expect(testState.main.filter).toEqual("brightness(100%)");
  expect(testState.footer.filter).toEqual("brightness(100%)");
});

// emailIsValid testing
it('returns boolean whether email address is valid or not', () => {
  expect(emailIsValid('joeshmoe@yahoo.com')).toBe(true);
  expect(emailIsValid('not an email')).toBe(false);
});

// reviseName testing
it('capitalizes the first letter of the string', () => {
  expect(reviseName('joe', [], null, true)[0]).toMatch(/[A-Z0-9]/);
  expect(reviseName('6ix9ine', [], null, true)[0]).not.toMatch(/[A-Z]/);
});

// checkDates testing
it("checks that birthdate isn't greater than current date", () => {
  const currentDate = new Date();

  // 4/1/1993 < current date
  expect(checkDates(true, true, true, 1993, 4, currentDate.getFullYear(), currentDate.getMonth())).toBe(true);

  // current month + 1 /1/1993 < current date
  expect(checkDates(true, false, false, 1993, currentDate.getMonth() + 1, currentDate.getFullYear(), currentDate.getMonth())).toBe(true);

  // current month + 1 / current day + 1 / current year + 1 < current date
  expect(checkDates(false, false, false, currentDate.getFullYear() + 1, currentDate.getMonth() + 1, currentDate.getFullYear(), currentDate.getMonth())).toBe(false);

  // current month - 1 / current day - 1 / current year + 1 < current date
  expect(checkDates(false, true, true, currentDate.getFullYear() + 1, currentDate.getMonth() - 1, currentDate.getFullYear(), currentDate.getMonth())).toBe(false);
});

// urlIsValid testing
it("returns boolean whether URL is valid or not", () => {
  expect(urlIsValid('https://www.google.com')).toBe(true);
  expect(urlIsValid('www.google.com')).toBe(false);
});

// filePathIsValid testing
xit("returns boolean whether filepath is valid or not", () => {
  expect(filePathIsValid("C:\dev\NHNAC-website\client\src\images\about\tribe.jpeg", ["gif", "jpe?g", "tiff?", "png", "webp", "bmp"])).toBe(true);
  expect(filePathIsValid("C:\dev\NHNAC-website\client\public\images\spinner.gif", ["gif", "jpe?g", "tiff?", "png", "webp", "bmp"])).toBe(true);
  expect(filePathIsValid("C:\dev\NHNAC-website\client\src\images\profile\apple.png", ["gif", "jpe?g", "tiff?", "png", "webp", "bmp"])).toBe(true);
  expect(filePathIsValid("C:\dev\NHNAC-website\client\public\images\nhnac.png", ["gif", "jpe?g", "tiff?", "png", "webp", "bmp"])).toBe(true);
});

// changeBorderColor testing
it("changes style of border", () => {
  const Foo = ({ style, changeBorderColorTest }) => (
    <div>
      <input type="text" id="email" name="email" style={style} placeholder="Email" /><br />
      <button onClick={changeBorderColorTest} id="button" type="button">Click to change border color</button>
    </div>
  );

  Foo.propTypes = {
    style: PropTypes.object.isRequired,
    changeBorderColorTest: PropTypes.func.isRequired
  };

  let testState = { borderColor: "#C31F01" }; // style, attribute
  const wrapper = mount((
    <Foo
      style={testState}
      changeBorderColorTest={() => {
        testState = { borderColor: "#100B00" };
      }}
    />
  ));

  expect(wrapper.find('input').get(0).props.style).toHaveProperty('borderColor', '#C31F01');
  wrapper.find('button').at(0).simulate('click');
  expect(testState.borderColor).toEqual("#100B00");
});

// sanitizeInput testing
it("replaces script characters with references", () => {
  // Test 1
  const injection = "<script>console.log('hello world!')</script>";
  const cleaned = "&lt;script&gt;console.log(&#x27;hello world!&#x27;)&lt;&#x2F;script&gt;";

  expect(sanitizeInput(injection)).toBe(cleaned);

  // Test 2
  const dirty = `I love to do evil <img src="http://unsplash.it/100/100?random" onload="alert('you got hacked');" />`
  const clean = "I love to do evil &lt;img src=&quot;http:&#x2F;&#x2F;unsplash.it&#x2F;100&#x2F;100?random&quot; onload=&quot;alert(&#x27;you got hacked&#x27;);&quot; &#x2F;&gt;";

  expect(sanitizeInput(dirty)).toBe(clean);
});

// desanitize testing
it("replaces references with original characters", () => {
  // Test 1
  const cleaned = "&lt;script&gt;console.log(&#x27;hello world!&#x27;)&lt;&#x2F;script&gt;";
  const injection = "<script>console.log('hello world!')</script>";

  expect(desanitize(cleaned)).toBe(injection);

  // Test 2 
  const clean = "I love to do evil &lt;img src=&quot;http:&#x2F;&#x2F;unsplash.it&#x2F;100&#x2F;100?random&quot; onload=&quot;alert(&#x27;you got hacked&#x27;)&quot; &#x2F;&gt;";
  const dirty = "I love to do evil <img src=\"http://unsplash.it/100/100?random\" onload=\"alert('you got hacked')\" />"

  expect(desanitize(clean)).toBe(dirty);
});

// displayUnloadMessage testing
describe('displayUnloadMessage Test', () => {
  let wrapper;
  const props = {
    displayUnloadMessage: jest.fn(),
    sanitizeInput: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallow(<Deleted {...props} />);
  });

  it('should check `componentDidMount()`', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance.props, 'displayUnloadMessage');
    instance.componentDidMount();

    // Will only be called if formActive is true
    expect(instance.props.displayUnloadMessage).toHaveBeenCalledTimes(0);
  });
});

// showPassword testing
it("changes password type to text", () => {
  const Foo = ({ type, showPasswordTest }) => (
    <div>
      <input type={type} id="password" name="password" /><br />
      <input onClick={showPasswordTest} type="checkbox" id="showPassword" name="show_password" />
    </div>
  );

  Foo.propTypes = {
    type: PropTypes.string.isRequired,
    showPasswordTest: PropTypes.func.isRequired
  };

  let testState = { password: "password" }; // name, type
  const wrapper = mount((
    <Foo
      type={testState.password}
      showPasswordTest={() => {
        testState.password = "text";
      }}
    />
  ));

  expect(wrapper.find('input').at(0).prop('type')).toEqual("password");
  wrapper.find('input').at(1).simulate('click');
  expect(testState.password).toEqual("text");
});