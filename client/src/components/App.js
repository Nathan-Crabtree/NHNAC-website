/*
 * Copyright (c) 2020-2021 New Haven Native American Church
 *
 * This code is licensed under ISC:
 *
 * Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

// NOTE: Pass {...props} and as callback into routed component in order to properly use query strings.
// NOTE: Interestingly, props can only be traversed upward in components with classes, not hooks.
// - Zane

// Import React libraries
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import $ from 'jquery';

// Import images
import {
  logo, hbIcon, fbLogo, donate, paypal, bitcoin, indian,
  tribe, hands, homes, people, podcast, articleImgLink, profileImgSmall,
  profileImgLarge, fbMini, instaMini, twitterMini, thumbsUp, magnifyingGlass,
  apple, book, badge, messageIcon, avatar
} from '../images/Images';

// Import miscellaneous
import ConstitutionPdf from './documents/new_haven_constitution.pdf';
import CodeOfConductPdf from './documents/ethical_code_of_conduct.pdf';

// Import components
import {
  Footer, PrivacyPolicy, TermsOfService, FAQ,
  Donate, SignUp, About, Constitution,
  LegalRights, CodeOfConduct, Home, RequestID, Deleted
} from './static/Static';
import {
  Header, Error, Login, Content,
  Article, ForgotPassword, Verification, Profile,
  Suspended, AccountSettings, Confirmation, Search,
  DirectMessage
} from './dynamic/Dynamic';

var CryptoJS = require("crypto-js");
require('dotenv').config();

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

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      geoDataExists: false,
      cookiePolicyDisplayed: false,
      isAuthenticated: true,
      strikes: 0,
      userId: 1,
      newsletterEmailAddress: "example@example.com",
      searchFilters: [],
      listenerRemoved: false
    }
    this.setGeoDataExists = this.setGeoDataExists.bind(this);
    this.setCookiePolicyDisplayed = this.setCookiePolicyDisplayed.bind(this);
    this.deauthenticate = this.deauthenticate.bind(this);
    this.setNewsletterEmailAddress = this.setNewsletterEmailAddress.bind(this);
    this.setSearchFilters = this.setSearchFilters.bind(this);
    this.getSearchFilters = this.getSearchFilters.bind(this);
  }

  /**
   * Switches boolean value of this.state.geoDataExists from a component when passed as a prop.
   *
   */
  setGeoDataExists() {
    if (!this.state.geoDataExists) {
      this.setState({ geoDataExists: true });
    } else {
      this.setState({ geoDataExists: false });
    }
  }

  /**
   * Switches boolean value of this.state.cookiePolicyDisplayed.
   *
   */
  setCookiePolicyDisplayed = () => this.setState({ cookiePolicyDisplayed: true });

  /**
   * When "Log Out" link is pressed, this function executes to display non-authenticated nav header.
   * NOTE: For development purposes only, will not be in the production code. - Zane
   *
   */
  deauthenticate = () => this.setState({ isAuthenticated: false });

  /**
   * When newsletter form is submitted, this function executes to change
   * this.state.newsletterEmailAddress for the verification page.
   *
   * @param {string} email
   */
  setNewsletterEmailAddress = (email) => this.setState({ newsletterEmailAddress: email });

  /**
   * Whenever the filter form is updated on the search page, the searchFilters state array is updated.
   *
   * @param {array} lFilters
   */
  setSearchFilters = (lFilters) => this.setState({ searchFilters: lFilters });

  /**
   * Returns value of this.state.searchFilters.
   *
   * @returns {array} searchFilters
   */
  getSearchFilters = () => {
    return this.state.searchFilters;
  }

  componentDidMount() {
    let links = document.getElementsByTagName("a");

    // This code allows all <a> tags to have the resetToggleDisplay() function implemented to
    // remove any user interference from the nav menu in mobile mode
    for (let link = 0; link < links.length; link++) {
      links[link].onclick = resetToggleDisplay();
    }

    // When component is rendered, bring user to top of page
    window.scrollTo(0, 0);
  }

  render() {
    const { REACT_APP_KEY } = process.env;

    return (
      <BrowserRouter>
        <Header logo={logo} hbIcon={hbIcon} isAuthenticated={this.state.isAuthenticated}
          deauthenticate={this.deauthenticate} magnifyingGlass={magnifyingGlass} profileImgSmall={profileImgSmall}
          messageIcon={messageIcon} />
        <div onClick={resetToggleDisplay}>
          <main>
            <Switch>
              <Route exact path="/">{(this.state.strikes > 2) ? <Redirect to={`/suspended/${CryptoJS.AES.encrypt(this.state.userId.toString(), REACT_APP_KEY).toString()}`} /> : <Home setCookiePolicyDisplayed={this.setCookiePolicyDisplayed}
                cookiePolicyDisplayed={this.state.cookiePolicyDisplayed} hands={hands} homes={homes} people={people} isAuthenticated={this.state.isAuthenticated} />} </Route>
              <Route exact path="/privacy_policy" component={() => <PrivacyPolicy />} />
              <Route exact path="/content/:header" component={(props) => <Content {...props} podcast={podcast} profileImgSmall={profileImgSmall} articleImgLink={articleImgLink} />} />
              <Route exact path="/article/:type" component={(props) => <Article {...props} articleImg={articleImgLink} fbMini={fbMini} instaMini={instaMini} twitterMini={twitterMini} thumbsUp={thumbsUp}
                profileImgSmall={profileImgSmall} isAuthenticated={this.state.isAuthenticated} sanitizeInput={sanitizeInput} displayUnloadMessage={displayUnloadMessage} />} />
              <Route exact path="/profile/:userId" component={(props) => <Profile {...props} apple={apple} book={book} articleImg={articleImgLink} fbMini={fbMini} instaMini={instaMini}
                twitterMini={twitterMini} profileImgLarge={avatar} badge={badge} profileImgSmall={profileImgSmall} messageIcon={messageIcon} sanitizeInput={sanitizeInput}
                displayUnloadMessage={displayUnloadMessage} />} />
              <Route exact path="/terms_of_service" component={() => <TermsOfService />} />
              <Route exact path="/FAQ" component={() => <FAQ />} />
              <Route exact path="/donate" component={() => <Donate donate={donate} paypal={paypal} bitcoin={bitcoin} />} />
              <Route exact path="/login" component={() => <Login showPassword={showPassword} />} />
              {/* avatar might be passed as a prop in SignUp component to be uploaded as default picture for new user. */}
              {/** Resize submitted image using HTML5 canvas
                  *  Src: https://stackoverflow.com/questions/23945494/use-html5-to-resize-an-image-before-upload
                  */}
              <Route exact path="/signup" component={() => <SignUp geoDataExists={this.state.geoDataExists} emailIsValid={emailIsValid}
                setGeoDataExists={this.setGeoDataExists} reviseName={reviseName} checkDates={checkDates} changeBorderColor={changeBorderColor} sanitizeInput={sanitizeInput}
                displayUnloadMessage={displayUnloadMessage} showPassword={showPassword} />} />
              <Route exact path="/forgot_password" component={() => <ForgotPassword sanitizeInput={sanitizeInput} />} />
              <Route exact path="/verification" component={() => <Verification newsletterEmailAddress={this.state.newsletterEmailAddress} />} />
              <Route exact path="/confirmation" component={() => <Confirmation newsletterEmailAddress={this.state.newsletterEmailAddress} />} />
              <Route exact path="/about" component={() => <About indian={indian} tribe={tribe} />} />
              <Route exact path="/constitution" component={() => <Constitution ConstitutionPdf={ConstitutionPdf} />} />
              <Route exact path="/ethical_code_of_conduct" component={() => <CodeOfConduct CodeOfConductPdf={CodeOfConductPdf} />} />
              <Route exact path="/legal_rights" component={() => <LegalRights />} />
              <Route exact path="/suspended/:userId" component={() => <Suspended />} />
              <Route exact path="/deleted" component={() => <Deleted sanitizeInput={sanitizeInput} displayUnloadMessage={displayUnloadMessage} />} />
              <Route exact path="/id_request/:userId" component={(props) => <RequestID {...props} emailIsValid={emailIsValid} geoDataExists={this.state.geoDataExists} setGeoDataExists={this.setGeoDataExists}
                sanitizeInput={sanitizeInput} displayUnloadMessage={displayUnloadMessage} />} />
              <Route exact path="/account_settings/:userId" component={(props) => <AccountSettings {...props} profileImgLarge={profileImgLarge} fbMini={fbMini} instaMini={instaMini}
                twitterMini={twitterMini} emailIsValid={emailIsValid} geoDataExists={this.state.geoDataExists} reviseName={reviseName} checkDates={checkDates} urlIsValid={urlIsValid}
                filePathIsValid={filePathIsValid} changeBorderColor={changeBorderColor} sanitizeInput={sanitizeInput} displayUnloadMessage={displayUnloadMessage}
                showPassword={showPassword} setGeoDataExists={this.setGeoDataExists} />} />
              <Route exact path="/search" component={(props) => <Search {...props} searchFilters={this.state.searchFilters} setSearchFilters={this.setSearchFilters}
                getSearchFilters={this.getSearchFilters} />} />
              <Route exact path="/direct_message" component={(props) => <DirectMessage {...props} />} />
              <Route component={Error} />
            </Switch>
          </main>
          <Footer fbLogo={fbLogo} emailIsValid={emailIsValid} setNewsletterEmailAddress={this.setNewsletterEmailAddress}
            sanitizeInput={sanitizeInput} displayUnloadMessage={displayUnloadMessage} />
        </div>
      </BrowserRouter>
    );
  }
}