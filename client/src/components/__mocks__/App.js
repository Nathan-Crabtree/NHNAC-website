import React from 'react';
import PropTypes from 'prop-types';

/**
 * Checks for valid email input. Returns a boolean.
 * Src: https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
 *
 * @param {string} email
 * @returns {boolean} true or false.
 */
export const emailIsValid = (email) => {
  return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email);
}

/**
 * Adds pop-up warning message of unsaved data if user attempts to leave page on a event listener.
 *
 * @param {object} event
 * @returns {string} message
 */
export const displayUnloadMessage = (event) => {
  var message = "You have changes that have not been saved...";
  (event || window.event).returnValue = message;
  return message;
}

/**
 * An event handler for whenever a link is clicked on phone, the menu automatically disappears to avoid usage interference.
 *
 */
export const resetToggleDisplay = () => {
  if (window.outerWidth <= 375) {
    const hamburgerIcon = document.getElementsByClassName("hamburger_icon")[0];
    const navDiv = document.getElementsByTagName("div")[1];
    const body = document.getElementsByTagName("body")[0];
    const main = document.getElementsByTagName("main")[0];
    const footer = document.getElementsByTagName("footer")[0];

    // Change hamburgerIcon's display to block.
    hamburgerIcon.style.display = "block";

    // Change navDiv margin and transition settings.
    navDiv.style.marginTop = "-485.7px";
    navDiv.style.transition = "margin-top 0s";

    // Set body overflow style property to scroll.
    body.style.overflow = "scroll";

    // Set page-content brightness style property back to 100% and remove the style attribute.
    main.style.filter = "brightness(100%)";
    main.removeAttribute("style");

    // Set footer brightness style property back to 100% and remove the style attribute.
    footer.style.filter = "brightness(100%)";
    footer.removeAttribute("style");
  }
}

/**
 * Takes a string and capitalizes the first letter of the string and puts into a new array.
 * Useful for correcting name-related values inserted in forms by user. 
 * Also checks to see if it has a value related to a form or not to return proper output. 
 * Can also reassign a variable.
 *
 * @param {string} name
 * @param {array} revisedName
 * @param {string} id
 * @param {boolean} isAVAlue
 * @returns {string} revisedName
 */
export const reviseName = (name, revisedName, id, isAValue) => {

  // Capitalize the first letter of the name and insert into revised array.
  for (let letter = 0; letter < name.length; letter++) {
    if (letter === 0) {
      revisedName.push(name[letter].toUpperCase());
    } else {
      revisedName.push(name[letter]);
    }
  }

  if (isAValue && id !== null) {
    document.getElementById(id).value = revisedName.join("");
    return revisedName.join("");
  } else if (isAValue && id === null) {
    return revisedName.join("");
  } else {
    document.getElementById(id).innerText = revisedName.join("");
  }
}

/**
 * Anonymous function that checks and compares birthdate values to current date values.
 *
 * @params {integer} args
 * @returns {boolean} true or false.
 */
export const checkDates = (...args) => {
  const [checkYears, checkMonths, checkDays, birthYear, birthMonth, currentYear, currentMonth] = args;
  return (checkYears) ? (birthYear === currentYear ? (checkMonths ? (birthMonth === currentMonth ? (checkDays ? true : false) : true) : false) : true) : false;
}

/**
 * Checks for valid URL input. Returns a boolean.
 * Src: https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
 *
 * @param {string} url
 * @returns {boolean} true or false.
 */
export const urlIsValid = (url) => {
  return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(url);
}

/**
 * Checks for valid directory input and supported file extension. Returns a boolean.
 * Src: https://stackoverflow.com/questions/169008/regex-for-parsing-directory-and-filename
 *
 * NOTE: Only known to work on Chrome. - Zane
 *
 * @param {string} filePath
 * @param {array} extensions
 * @returns {boolean} true or false.
 */
export const filePathIsValid = (filePath, extensions) => {
  const filePathRegex = /^[A-Z]:[\/\\]{0,2}(?:[.\/\\ ](?![.\/\\\n])|[^<>:"|?*.\/\\ \n])+$/;
  let emptyString = "";

  for (let extension = 0; extension < extensions.length; extension++) {
    if (extension < extensions.length - 1) {
      emptyString += extensions[extension] + "|";
    } else {
      emptyString += extensions[extension];
    }
  }

  const extensionsRegex = new RegExp("\\.(" + emptyString + ")$", "i");
  const passesFilePathRegex = (filePathRegex).test(filePath);
  const passesExtensionsRegex = (extensionsRegex).test(filePath);

  console.log("filePath: " + filePath);

  if (passesFilePathRegex && passesExtensionsRegex) {
    return true;
  } else {
    return false;
  }
}

/**
 * Changes border color of selected tag containing id attribute provided in argument.
 *
 * @param {string} id
 */
export const changeBorderColor = (id) => {
  const element = document.getElementById(id);
  element.style.borderColor = "#100B00";
}

/**
 * Escapes <,>,&,`,',",/ characters in input argument and returns new string.
 *
 * @param {string} userInput
 * @returns {string} sanitizedInput
 */
export const sanitizeInput = (userInput) => {
  let sanitizedInput = [];

  for (let inputIndex = 0; inputIndex < userInput.length; inputIndex++) {
    if (userInput[inputIndex] === "<") {
      sanitizedInput.push("&lt;");
    } else if (userInput[inputIndex] === ">") {
      sanitizedInput.push("&gt;");
    } else if (userInput[inputIndex] === "&") {
      sanitizedInput.push("&amp;");
    } else if (userInput[inputIndex] === "`") {
      sanitizedInput.push("&#x60;");
    } else if (userInput[inputIndex] === "'") {
      sanitizedInput.push("&#x27;");
    } else if (userInput[inputIndex] === '"') {
      sanitizedInput.push("&quot;");
    } else if (userInput[inputIndex] === "/") {
      sanitizedInput.push("&#x2F;");
    } else {
      sanitizedInput.push(userInput[inputIndex]);
    }
  }

  return sanitizedInput.join("");
}

/**
 * Places escaped characters <,>,&,`,',",/ back and returns new string.
 *
 * @param {string} data
 * @returns {string} desanitizedData
 */
export const desanitize = (data) => {
  let desanitizedData = [];
  let dataIndex = 0;

  while (dataIndex < data.length) {
    let skip = 1;
    let char4Array, char5Array, char6Array;

    if (dataIndex + 3 < data.length) {
      char4Array = [data[dataIndex], data[dataIndex + 1], data[dataIndex + 2], data[dataIndex + 3]].join("");
    }
    if (dataIndex + 4 < data.length) {
      char5Array = [data[dataIndex], data[dataIndex + 1], data[dataIndex + 2], data[dataIndex + 3], data[dataIndex + 4]].join("");
    }
    if (dataIndex + 5 < data.length) {
      char6Array = [data[dataIndex], data[dataIndex + 1], data[dataIndex + 2], data[dataIndex + 3], data[dataIndex + 4], data[dataIndex + 5]].join("");
    }

    if (char4Array === "&lt;") {
      desanitizedData.push("<");
      skip = 4;
    } else if (char4Array === "&gt;") {
      desanitizedData.push(">");
      skip = 4;
    } else if (char5Array === "&amp;") {
      desanitizedData.push("&");
      skip = 5;
    } else if (char6Array === "&#x60;") {
      desanitizedData.push("`");
      skip = 6;
    } else if (char6Array === "&#x27;") {
      desanitizedData.push("'");
      skip = 6;
    } else if (char6Array === '&quot;') {
      desanitizedData.push('"');
      skip = 6;
    } else if (char6Array === "&#x2F;") {
      desanitizedData.push("/");
      skip = 6;
    } else {
      desanitizedData.push(data[dataIndex]);
    }

    dataIndex += skip;
  }

  return desanitizedData.join("");
}

/**
 * Once the "Show password" checkmark is checked, this function will allow password fields' text to be visible.
 * 
 */
export const showPassword = () => {
  const checked = document.getElementById("showPassword").checked;
  let passwordArray = [document.getElementById("oldPassword"), document.getElementById("newPassword"),
  document.getElementById("confirmPassword"), document.getElementById("password")];

  for (let element = 0; element < passwordArray.length; element++) {
    if (passwordArray[element] !== null) {
      if (passwordArray[element].type === "password" && checked) {
        passwordArray[element].type = "text";
      } else {
        passwordArray[element].type = "password";
      }
    }
  }
}

/**
 * An event handler for whenever a link is clicked on phone, the menu automatically disappears to avoid usage interference.
 *
 */
export const resetToggleDisplayMock = () => {
  if (global.innerWidth === 375) {
    testState.hamburgerIcon = { display: "block" };
    testState.navDiv = { marginTop: "-485.7px", transition: "margin-top 0s" };
    testState.body = { overflow: "scroll" };
    testState.main = { filter: "brightness(100%)" };
    testState.footer = { filter: "brightness(100%)" };
  }
}

/**
 * An event handler for hamburger-icon to toggle display the mobile nav.
 * Changes being made to CSS during toggleDisplayNav:
 *
 * nav > div > ul {
 *  display: block;
 *  > li {
 *      display: block;
 *      padding-bottom: 25px;
 * }
 *
 * body {
 *  overflow: hidden;
 * }
 *
 * footer {
 *  filter: brightness(50%);
 *  position: relative;
 *  z-index: -1;
 * }
 *
 * .page
 *  filter: brightness(50%);
 *  position: relative;
 *  z-index: -1;
 *
 */
export const toggleDisplayNavMock = () => {
  testState.hamburgerIcon = { display: "block" };
  testState.navDiv = { marginTop: "-485.7px", transition: "margin-top 1s" };
  testState.body = { overflow: "scroll" };
  testState.main = { filter: "brightness(100%)" };
  testState.footer = { filter: "brightness(100%)" };
}

export let testState = {   // style, attribute
  hamburgerIcon: { display: "none" },
  headerLinks: { display: "block" },
  navDiv: { marginTop: "0px", transition: "margin-top 1s" },
  body: { overflow: "hidden" },
  main: { filter: "brightness(50%)", position: "relative", zIndex: "-1" },
  footer: { filter: "brightness(50%)", position: "relative", zIndex: "-1" }
};

export const App = () => {
  return (
    <body style={testState.body}>
      <header>
        <nav>
          <img onClick={toggleDisplayNavMock} style={testState.hamburgerIcon} />
          <div style={testState.navDiv}>
            <svg onClick={toggleDisplayNavMock}></svg>
            <ul style={testState.headerLinks}></ul>
          </div>
        </nav>
      </header>
      <div onClick={resetToggleDisplayMock}>
        <main style={testState.main}></main>
        <footer style={testState.footer}></footer>
      </div>
    </body>
  );
}

App.propTypes = {
  body: PropTypes.object.isRequired,
  hamburgerIcon: PropTypes.object.isRequired,
  navDiv: PropTypes.object.isRequired,
  headerLinks: PropTypes.object.isRequired,
  main: PropTypes.object.isRequired,
  footer: PropTypes.object.isRequired,
  toggleDisplayNavTest: PropTypes.func.isRequired
};

export default App;