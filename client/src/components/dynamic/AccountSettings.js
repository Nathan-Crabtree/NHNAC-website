import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Container from '../Container';
import queryString from 'query-string';

var CryptoJS = require("crypto-js");
require('dotenv').config();

/**
 * Unsubscribes the user from selected subscription topic by changing the boolean value
 * of user's subscription value column in the database table to false.
 *
 * @param {string} subscription
 */
export const unsubscribe = (subscription) => {
  if (subscription === "newsletter") {
    // Turn boolean value of user's subscription value column in database table to false

  } else if (subscription === "podcast") {
    // Turn boolean value of user's subscription value column in database table to false

  }
  // Refresh the page
  window.location.reload();
}

export const AccountSettings = (props, { hideForm, displayForm, onSubmit, displaySubscription }) => {
  const [userId, setUserId] = useState(null);
  const [editProfilePic, setEditProfilePic] = useState(null);
  const [formsActive, setFormsActive] = useState(false);
  const [numOfActiveForms, setNumOfActiveForms] = useState(0);
  const [scriptRendered, setScriptRendered] = useState(false);
  const [errorsThatExist, setErrorsThatExist] = useState([]);
  const {
    profileImgLarge,
    fbMini,
    twitterMini,
    instaMini
  } = props;
  const { REACT_APP_KEY } = process.env;

  /**
  * Takes any content submitted from user and sends to API and then gets added to database;
  * the page is then refreshed to include the new content.
  *
  * @param {object} e
  * @param {string} tagID
  * @returns {boolean} false
  */
  onSubmit = (e, tagID) => {
    const target = e.target || e.srcElement;

    // Use IE5-8 fallback if event object isn't present
    if (!e) {
      e = window.event;
    }

    e.preventDefault();
    console.log(target.className);

    // Array of form input IDs
    const formInputIds = ["profilePicLink", "firstName", "lastName", "fb_input", "twitter_input", "insta_input", "email_input", "birthday_input", "streetId",
      "countryId", "stateId", "cityId", "zipId", "oldPassword", "newPassword", "confirmPassword"];

    // Create error array
    let error = [];
    for (let input = 0; input < 9; input++) {
      error[input] = document.createElement('p');
    }

    // Use temporary variable to help clear error text if it currently exists on the DOM
    let tempErrorsThatExist = errorsThatExist;

    switch (tagID) {
      case "profile_pic": {
        let profilePicLink = target.profilePicLink.value;
        profilePicLink = props.sanitizeInput(profilePicLink);

        // Change border color of input and select tag back to normal
        props.changeBorderColor(formInputIds[0]);

        // Clear error text if it currently exists on the DOM
        if (errorsThatExist[0]) {
          const element = document.getElementsByClassName(`error_0`)[0];
          element.parentElement.removeChild(element);
          tempErrorsThatExist[0] = false;
        }

        // Check for valid directory input with a supported image file
        if (!(props.filePathIsValid(profilePicLink, ["gif", "jpe?g", "tiff?", "png", "webp", "bmp"]))) {
          if (!errorsThatExist[0]) {
            // Render error text and change boolean
            const formField = document.getElementsByClassName("profile_pic_form_field")[0];
            const input = document.getElementById("profilePicLink");
            error[0].innerText = '*Please enter a valid file path link with a supported image format (.gif, .jpg, .jpeg, .tiff, .png, .webp, .bmp).';
            error[0].className = "error_0";
            error[0].style.fontSize = '.9rem';
            error[0].style.color = '#C31F01';
            formField.appendChild(error[0]);
            input.style.borderColor = '#C31F01';
            tempErrorsThatExist[0] = true;
          }
        } else {
          // Submit input to the API and database

          // Decrement numOfActiveForms
          setNumOfActiveForms(numOfActiveForms - 1);

          if (numOfActiveForms === 0) {
            if (window.removeEventListener) { // If event listener supported
              // Remove pop-up warning of unsaved data if user attempts to leave page
              window.removeEventListener("beforeunload", props.displayUnloadMessage, false);
            } else {
              window.detachEvent("beforeunload", props.displayUnloadMessage);
            }

            if (formsActive) {
              setFormsActive(false);
            }
          }

          // Page refresh

          console.log("Passed! :D");
        }
        break;
      } case "name": {
        let firstName = target.first_name.value;
        let revisedFirstName = [];
        let nickName = target.nick_name.value;
        let revisedNickName = [];
        let lastName = target.last_name.value;
        let revisedLastName = [];
        firstName = props.sanitizeInput(firstName);
        nickName = props.sanitizeInput(nickName);
        lastName = props.sanitizeInput(lastName);

        // Change border color of all input and select tags back to normal
        for (let id = 1; id < 3; id++) {
          props.changeBorderColor(formInputIds[id]);
        }

        // Clear error text if it currently exists on the DOM
        if (errorsThatExist[1]) {
          const element = document.getElementsByClassName(`error_1`)[0];
          element.parentElement.removeChild(element);
          tempErrorsThatExist[1] = false;
        }

        // Capitalize the first letter of any names if haven't been done so by user
        if (firstName.length > 0) {
          firstName = props.reviseName(firstName, revisedFirstName, "firstName", true);
        }
        if (nickName.length > 0) {
          nickName = props.reviseName(nickName, revisedNickName, "nickName", true);
        }
        if (lastName.length > 0) {
          lastName = props.reviseName(lastName, revisedLastName, "lastName", true);
        }

        // Check if first name, nick name and last name exist
        if (firstName.length === 0 || lastName.length === 0) {
          if (!errorsThatExist[1]) {
            // Render error text and change boolean
            const formField = document.getElementsByClassName("name_form_field")[0];
            const inputFirstName = document.getElementById("firstName");
            const inputLastName = document.getElementById("lastName");
            error[1].innerText = '*Please enter both your first and last name.';
            error[1].className = "error_1";
            error[1].style.fontSize = '.9rem';
            error[1].style.color = '#C31F01';
            formField.appendChild(error[1]);
            if (firstName.length === 0) {
              inputFirstName.style.borderColor = '#C31F01';
            }
            if (lastName.length === 0) {
              inputLastName.style.borderColor = '#C31F01';
            }
            tempErrorsThatExist[1] = true;
          }
        } else {
          // Submit input to the API and database

          // Decrement numOfActiveForms
          setNumOfActiveForms(numOfActiveForms - 1);

          if (numOfActiveForms === 0) {
            if (window.removeEventListener) { // If event listener supported
              // Remove pop-up warning of unsaved data if user attempts to leave page
              window.removeEventListener("beforeunload", props.displayUnloadMessage, false);
            } else {
              window.detachEvent("beforeunload", props.displayUnloadMessage);
            }

            if (formsActive) {
              setFormsActive(false);
            }
          }

          // Page refresh
        }
        break;
      } case "fb": {
        let fb = target.fb.value;
        fb = encodeURIComponent(props.sanitizeInput(fb));

        // Change border color of input and select tag back to normal
        props.changeBorderColor(formInputIds[3]);

        // Clear error text if it currently exists on the DOM
        if (errorsThatExist[2]) {
          const element = document.getElementsByClassName(`error_2`)[0];
          element.parentElement.removeChild(element);
          tempErrorsThatExist[2] = false;
        }

        // Check for valid URL input
        if (!(props.urlIsValid(fb))) {
          if (!errorsThatExist[2]) {
            // Render error text and change boolean
            const formField = document.getElementsByClassName("fb_form_field")[0];
            const input = document.getElementById("fb_input");
            error[2].innerText = '*Please enter a valid URL link.';
            error[2].className = "error_2";
            error[2].style.fontSize = '.9rem';
            error[2].style.color = '#C31F01';
            formField.appendChild(error[2]);
            input.style.borderColor = '#C31F01';
            tempErrorsThatExist[2] = true;
          }
        } else {
          // Submit input to the API and database

          // Decrement numOfActiveForms
          setNumOfActiveForms(numOfActiveForms - 1);

          if (numOfActiveForms === 0) {
            if (window.removeEventListener) { // If event listener supported
              // Remove pop-up warning of unsaved data if user attempts to leave page
              window.removeEventListener("beforeunload", props.displayUnloadMessage, false);
            } else {
              window.detachEvent("beforeunload", props.displayUnloadMessage);
            }

            if (formsActive) {
              setFormsActive(false);
            }
          }

          // Page refresh
        }
        break;
      } case "twitter": {
        let twitter = target.twitter.value;
        twitter = encodeURIComponent(props.sanitizeInput(twitter));

        // Change border color of input and select tag back to normal
        props.changeBorderColor(formInputIds[4]);

        // Clear error text if it currently exists on the DOM
        if (errorsThatExist[3]) {
          const element = document.getElementsByClassName(`error_3`)[0];
          element.parentElement.removeChild(element);
          tempErrorsThatExist[3] = false;
        }

        // Check for valid URL input
        if (!(props.urlIsValid(twitter))) {
          if (!errorsThatExist[3]) {
            // Render error text and change boolean
            const formField = document.getElementsByClassName("twitter_form_field")[0];
            const input = document.getElementById("twitter_input");
            error[3].innerText = '*Please enter a valid URL link.';
            error[3].className = "error_3";
            error[3].style.fontSize = '.9rem';
            error[3].style.color = '#C31F01';
            formField.appendChild(error[3]);
            input.style.borderColor = '#C31F01';
            tempErrorsThatExist[3] = true;
          }
        } else {
          // Submit input to the API and database

          // Decrement numOfActiveForms
          setNumOfActiveForms(numOfActiveForms - 1);

          if (numOfActiveForms === 0) {
            if (window.removeEventListener) { // If event listener supported
              // Remove pop-up warning of unsaved data if user attempts to leave page
              window.removeEventListener("beforeunload", props.displayUnloadMessage, false);
            } else {
              window.detachEvent("beforeunload", props.displayUnloadMessage);
            }

            if (formsActive) {
              setFormsActive(false);
            }
          }

          // Page refresh
        }
        break;
      } case "insta": {
        let insta = target.insta.value;
        insta = encodeURIComponent(props.sanitizeInput(insta));

        // Change border color of all input and select tags back to normal
        props.changeBorderColor(formInputIds[5]);

        // Clear error text if it currently exists on the DOM
        if (errorsThatExist[4]) {
          const element = document.getElementsByClassName(`error_4`)[0];
          element.parentElement.removeChild(element);
          tempErrorsThatExist[4] = false;
        }

        // Check for valid URL input
        if (!(props.urlIsValid(insta))) {
          if (!errorsThatExist[4]) {
            // Render error text and change boolean
            const formField = document.getElementsByClassName("insta_form_field")[0];
            const input = document.getElementById("insta_input");
            error[4].innerText = '*Please enter a valid URL link.';
            error[4].className = "error_4";
            error[4].style.fontSize = '.9rem';
            error[4].style.color = '#C31F01';
            formField.appendChild(error[4]);
            input.style.borderColor = '#C31F01';
            tempErrorsThatExist[4] = true;
          }
        } else {
          // Submit input to the API and database

          // Decrement numOfActiveForms
          setNumOfActiveForms(numOfActiveForms - 1);

          if (numOfActiveForms === 0) {
            if (window.removeEventListener) { // If event listener supported
              // Remove pop-up warning of unsaved data if user attempts to leave page
              window.removeEventListener("beforeunload", props.displayUnloadMessage, false);
            } else {
              window.detachEvent("beforeunload", props.displayUnloadMessage);
            }

            if (formsActive) {
              setFormsActive(false);
            }
          }

          // Page refresh
        }
        break;
      } case "email": {
        let email = target.email.value;

        // Change border color of input and select tag back to normal
        props.changeBorderColor(formInputIds[6]);

        // Clear error text if it currently exists on the DOM
        if (errorsThatExist[5]) {
          const element = document.getElementsByClassName(`error_5`)[0];
          element.parentElement.removeChild(element);
          tempErrorsThatExist[5] = false;
        }

        // Check for valid email input and if it's already in use
        if (!(props.emailIsValid(email))) {
          if (!errorsThatExist[5]) {
            // Render error text and change boolean
            const formField = document.getElementsByClassName("email_form_field")[0];
            const input = document.getElementById("email_input");
            error[5].innerText = '*Please enter a valid email address.';
            error[5].className = "error_5";
            error[5].style.fontSize = '.9rem';
            error[5].style.color = '#C31F01';
            formField.appendChild(error[5]);
            input.style.borderColor = '#C31F01';
            tempErrorsThatExist[5] = true;
          }
        } else {
          // Do a query search in database to check if email entered in is unique. If it isn't, change value of boolean
          let emailAlreadyExists = false;

          // Do query search here

          if (emailAlreadyExists) {
            if (!errorsThatExist[5]) {
              // Render error text and change boolean
              const formField = document.getElementsByClassName("email_form_field")[0];
              const input = document.getElementById("email_input");
              error[5].innerText = '*Email address already exists.';
              error[5].className = "error_5";
              error[5].style.fontSize = '.9rem';
              error[5].style.color = '#C31F01';
              formField.appendChild(error[5]);
              input.style.borderColor = '#C31F01';
              tempErrorsThatExist[5] = true;
            }
          }
        }

        if (!errorsThatExist[5]) {
          // Submit input to the API and database

          // Decrement numOfActiveForms
          setNumOfActiveForms(numOfActiveForms - 1);

          if (numOfActiveForms === 0) {
            if (window.removeEventListener) { // If event listener supported
              // Remove pop-up warning of unsaved data if user attempts to leave page
              window.removeEventListener("beforeunload", props.displayUnloadMessage, false);
            } else {
              window.detachEvent("beforeunload", props.displayUnloadMessage);
            }

            if (formsActive) {
              setFormsActive(false);
            }
          }

          // Page refresh
        }
        break;
      } case "birthday": {
        const birthday = target.birthday.value;

        // Check if birthday and current date match variables
        const date = new Date();
        const currentDate = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
        const birthYear = parseInt(birthday[0] + birthday[1] + birthday[2] + birthday[3]);
        const birthMonth = parseInt(birthday[5] + birthday[6]);
        const birthDay = parseInt(birthday[8] + birthday[9]);
        const checkYears = birthYear <= currentDate[0];
        const checkMonths = birthMonth <= currentDate[1];
        const checkDays = birthDay <= currentDate[2];
        const checkDates = props.checkDates(checkYears, checkMonths, checkDays, birthYear, birthMonth, currentDate[0], currentDate[1]);

        // Change border color of input and select tag back to normal
        props.changeBorderColor(formInputIds[7]);

        // Clear error text if it currently exists on the DOM
        if (errorsThatExist[6]) {
          const element = document.getElementsByClassName(`error_6`)[0];
          element.parentElement.removeChild(element);
          tempErrorsThatExist[6] = false;
        }

        // Check birthday input
        if (birthday === "" || !checkDates) {
          if (!errorsThatExist[6]) {
            // Render error text and change boolean
            const formField = document.getElementsByClassName("birthday_form_field")[0];
            const input = document.getElementById("birthday_input");
            error[6].innerText = '*Please select a birthday that is under the current date.';
            error[6].className = "error_6";
            error[6].style.fontSize = '.9rem';
            error[6].style.color = '#C31F01';
            formField.appendChild(error[6]);
            input.style.borderColor = '#C31F01';
            tempErrorsThatExist[6] = true;
          }
        } else {
          // Submit input to the API and database

          // Decrement numOfActiveForms
          setNumOfActiveForms(numOfActiveForms - 1);

          if (numOfActiveForms === 0) {
            if (window.removeEventListener) { // If event listener supported
              // Remove pop-up warning of unsaved data if user attempts to leave page
              window.removeEventListener("beforeunload", props.displayUnloadMessage, false);
            } else {
              window.detachEvent("beforeunload", props.displayUnloadMessage);
            }

            if (formsActive) {
              setFormsActive(false);
            }
          }

          // Page refresh
        }
        break;
      } case "address": {
        console.log("case address is activiated");
        let street = target.street.value;
        const country = target.country.value;
        const state = target.state.value;
        const city = target.city.value;
        let zip = target.zip.value.toString();
        const formField = document.getElementsByClassName("address_form_field")[0];
        const inputStreet = document.getElementById("streetId");
        street = props.sanitizeInput(street);
        zip = props.sanitizeInput(zip);

        // Change border color of all input and select tags back to normal
        for (let id = 8; id < 13; id++) {
          props.changeBorderColor(formInputIds[id]);
        }

        // Clear error text if it currently exists on the DOM
        if (errorsThatExist[7]) {
          const element = document.getElementsByClassName(`error_7`)[0];
          element.parentElement.removeChild(element);
          tempErrorsThatExist[7] = false;
        }

        const inputCountry = document.getElementById("countryId");
        const inputState = document.getElementById("stateId");
        const inputCity = document.getElementById("cityId");
        const inputZip = document.getElementById("zipId");

        // Check for address input
        if (street === "" || country === "" || state === "" || city === "" || zip === "") {
          if (!errorsThatExist[7]) {
            // Render error text and change boolean
            error[7].innerText = '*Please enter or select a value in all address-related fields.';
            error[7].className = "error_7";
            error[7].style.fontSize = '.9rem';
            error[7].style.color = '#C31F01';
            formField.appendChild(error[7]);
            inputStreet.style.borderColor = '#C31F01';
            inputCountry.style.borderColor = '#C31F01';
            inputState.style.borderColor = '#C31F01';
            inputCity.style.borderColor = '#C31F01';
            inputZip.style.borderColor = '#C31F01';
            tempErrorsThatExist[7] = true;
          }
        } else if (street.length > 150) {
          if (!errorsThatExist[7]) {
            // Render error text and change boolean
            error[7].innerText = '*Please enter a value in the "street" field less than 150 characters.';
            error[7].className = "error_7";
            error[7].style.fontSize = '.9rem';
            error[7].style.color = '#C31F01';
            formField.appendChild(error[4]);
            inputStreet.style.borderColor = '#C31F01';
            inputCountry.style.borderColor = '#C31F01';
            inputState.style.borderColor = '#C31F01';
            inputCity.style.borderColor = '#C31F01';
            inputZip.style.borderColor = '#C31F01';
            tempErrorsThatExist[7] = true;
          }
        } else {
          // Submit input to the API and database

          // Decrement numOfActiveForms
          setNumOfActiveForms(numOfActiveForms - 1);

          if (numOfActiveForms === 0) {
            if (window.removeEventListener) { // If event listener supported
              // Remove pop-up warning of unsaved data if user attempts to leave page
              window.removeEventListener("beforeunload", props.displayUnloadMessage, false);
            } else {
              window.detachEvent("beforeunload", props.displayUnloadMessage);
            }

            if (formsActive) {
              setFormsActive(false);
            }
          }

          // Page refresh             
        }
        break;
      } case "password": {
        let oldPassword = target.old_password.value;
        let newPassword = target.new_password.value;
        let confirmPassword = target.confirm_password.value;

        // Do query search to find user's current password
        let currentPassword = null;

        // Change border color of all input and select tags back to normal
        for (let id = 13; id < formInputIds.length; id++) {
          props.changeBorderColor(formInputIds[id]);
        }

        // Clear error text if it currently exists on the DOM
        if (errorsThatExist[8]) {
          const element = document.getElementsByClassName(`error_8`)[0];
          element.parentElement.removeChild(element);
          tempErrorsThatExist[8] = false;
        }

        // NOTE: Password fields aren't being sanitized because they're being hashed/encoded. - Zane

        // Check if password fields match
        if (oldPassword === "" || newPassword === "" || confirmPassword === "" || oldPassword !== currentPassword || newPassword !== confirmPassword) {
          if (!errorsThatExist[8]) {
            // Render error text and change boolean
            const formField = document.getElementsByClassName("password_form_field")[0];
            const inputOldPassword = document.getElementById("oldPassword");
            const inputNewPassword = document.getElementById("newPassword");
            const inputConfirmPassword = document.getElementById("confirmPassword");
            if (oldPassword === "" || newPassword === "" || confirmPassword === "" || newPassword.length < 3 || newPassword.length > 30 || confirmPassword.length < 3 || confirmPassword.length > 30) {
              error[8].innerText = '*Please enter a password between 3 and 30 characters.';
            } else if (oldPassword !== currentPassword) {
              error[8].innerText = '*Your password is incorrect.';
            } else if (newPassword !== confirmPassword) {
              error[8].innerText = '*Your password inputs do not match.';
            }
            error[8].className = "error_8";
            error[8].style.fontSize = '.9rem';
            error[8].style.color = '#C31F01';
            formField.appendChild(error[8]);
            inputOldPassword.style.borderColor = '#C31F01';
            inputNewPassword.style.borderColor = '#C31F01';
            inputConfirmPassword.style.borderColor = '#C31F01';
            tempErrorsThatExist[8] = true;
          }
        } else {
          // Submit input to the API and database

          // Decrement numOfActiveForms
          setNumOfActiveForms(numOfActiveForms - 1);

          if (numOfActiveForms === 0) {
            if (window.removeEventListener) { // If event listener supported
              // Remove pop-up warning of unsaved data if user attempts to leave page
              window.removeEventListener("beforeunload", props.displayUnloadMessage, false);
            } else {
              window.detachEvent("beforeunload", props.displayUnloadMessage);
            }

            if (formsActive) {
              setFormsActive(false);
            }
          }

          // Page refresh
        }
        break;
      } default: {
        break;
      }
    }

    // set errorsThatExist array to tempErrorsThatExist
    setErrorsThatExist(tempErrorsThatExist);

    // Check if any errors exists before sending data to API
    for (let errorNo = 0; errorNo < errorsThatExist.length; errorNo++) {
      if (errorsThatExist[errorNo]) {
        return false;
      }
    }
  }

  /**
   * Hides the section's form that the comment belongs to and shows the associated "edit" button.
   *
   * @param {string} tagClassName
   */
  hideForm = (tagClassName) => {
    document.getElementsByClassName(`${tagClassName}_form`)[0].style.display = "none";
    document.getElementsByClassName(`edit_${tagClassName}_btn`)[0].style.display = "block";
    document.getElementsByClassName(`${tagClassName}_tag`)[0].style.display = "block";

    // Decrement numOfActiveForms
    setNumOfActiveForms(numOfActiveForms - 1);

    if (numOfActiveForms === 0) {
      if (window.removeEventListener) { // If event listener supported
        // Remove pop-up warning of unsaved data if user attempts to leave page
        window.removeEventListener("beforeunload", props.displayUnloadMessage, false);
      } else {
        window.detachEvent("beforeunload", props.displayUnloadMessage);
      }

      if (formsActive) {
        setFormsActive(false);
      }
    }
  }

  /**
   * Shows the section's form that the comment belongs to and hides the associated "edit" button.
   *
   * @param {string} tagClassName
   */
  displayForm = (tagClassName) => {
    document.getElementsByClassName(`${tagClassName}_form`)[0].style.display = "block";
    document.getElementsByClassName(`edit_${tagClassName}_btn`)[0].style.display = "none";
    document.getElementsByClassName(`${tagClassName}_tag`)[0].style.display = "none";

    // Increment numOfActiveForms
    setNumOfActiveForms(numOfActiveForms + 1);

    if (numOfActiveForms > 0 && !formsActive) {
      if (window.addEventListener) { // If event listener supported
        // Remove pop-up warning of unsaved data if user attempts to leave page
        window.addEventListener("beforeunload", props.displayUnloadMessage, false);
      } else {
        window.attachEvent("beforeunload", props.displayUnloadMessage);
      }

      setFormsActive(true);
    }
  }

  /**
   * Checks boolean value of user's subscription value column in database table via parameter
   * to render within DOM the proper markup content.
   *
   * @returns {class} Component - A React component.
   */
  displaySubscription = () => {
    let subscribed = true;
    let subscriptions = ["newsletter", "podcast"];
    let component = null;

    for (let subscription = 0; subscription < subscriptions.length; subscription++) {
      if (subscriptions[subscription] === "newsletter") {
        // Check and set boolean value of user's subscription value column in database table within "subscribed"

        // If true then return this markup
        if (subscribed) {
          component += <div><p>Newsletter</p>&nbsp;<button className="unsubscribe_btn text_btn" onClick={unsubscribe("newsletter")}><b>unsubscribe</b></button></div>;
          component += <br />;
        }
      } else if (subscriptions[subscription] === "podcast") {
        // Check and set boolean value of user's subscription value column in database table within "subscribed"

        // If true then return this markup
        if (subscribed) {
          component += <div><p>Podcast</p>&nbsp;<button className="unsubscribe_btn text_btn" onClick={unsubscribe("podcast")}><b>unsubscribe</b></button></div>;
          component += <br />;
        }
      }
    }

    console.log("Hello World!");
    //console.log(<React.Fragment>{component}</React.Fragment>);

    //return <React.Fragment>{component}</React.Fragment>;
  }

  useEffect(() => {
    const parsedQString = queryString.parse(props.location.search);

    // Change value of query variable to that of query string in URL
    setUserId(CryptoJS.AES.decrypt(props.match.params.userId, REACT_APP_KEY).toString(CryptoJS.enc.Utf8));
    setEditProfilePic(parsedQString.edit_profile_pic);

    // Display "Edit Profile Picture" form if editProfilePic is true. 
    // NOTE: Don't touch. - Zane
    if (editProfilePic == "true") {
      displayForm("profile_pic");
    }

    // When component is rendered, bring user to top of page
    window.scrollTo(0, 0);

    // This script tag is important htmlFor sign-up form to work properly.
    // Provides country data htmlFor users to help insert exact address location.
    // Src: https://geodata.solutions
    if (!props.geoDataExists) {
      const script = document.createElement("script");

      script.src = "//geodata.solutions/includes/countrystatecity.js";
      script.async = true;
      script.className = "geodata_script";

      document.body.appendChild(script);

      props.setGeoDataExists();
      setScriptRendered(true);
    }

    // componentWillUnmount() substitute for React Hooks 
    return () => {
      if (window.removeEventListener) { // If event listener supported
        // Remove pop-up warning of unsaved data if user attempts to leave page
        window.removeEventListener("beforeunload", props.displayUnloadMessage, false);
      } else {
        window.detachEvent("beforeunload", props.displayUnloadMessage);
      }

      // Remove geodata script from DOM 
      if (props.geoDataExists && scriptRendered) {
        const geoDataScript = document.getElementsByClassName('geodata_script')[0];
        geoDataScript.parentElement.removeChild(geoDataScript);

        props.setGeoDataExists();
        setScriptRendered(false);
      }
    }
  }, [props, editProfilePic, scriptRendered, REACT_APP_KEY, displayForm]);

  return (
    <div className="account_settings_container">
      {/* Profile Pic Section */}
      <div>
        <img className="profile_img_large profile_pic_tag" srcSet={profileImgLarge} alt="Portrait of user." />
        <form id="profilePic" className="profile_pic_form" onSubmit={(e) => { onSubmit(e, "profile_pic") }}>
          <fieldset>
            <div className="profile_pic_form_field">
              <label htmlFor="profilePic">Upload Picture</label>
              <svg onClick={() => { hideForm("profile_pic") }} className="_modal-close-icon" viewBox="0 0 40 40">
                <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
              </svg><br />
              <br />
              <div>
                <label htmlFor="profilePicLink">Select a file:</label><br />
                <input type="file" id="profilePicLink" name="profile_pic_link"></input><br />
              </div>
              <button className="submit_btn submit_padding" type="submit">Upload</button>
            </div>
          </fieldset>
        </form>
        <button onClick={() => { displayForm("profile_pic") }} className="edit_profile_pic_btn" type="button">Edit Profile Picture</button>
      </div>

      <div>
        {/* Name Section */}
        <div>
          <h2 className="name_tag">Harper "Kiss" Young</h2>
          <form id="name" className="name_form" onSubmit={(e) => { onSubmit(e, "name") }}>
            <fieldset>
              <div className="name_form_field">
                <label htmlFor="name">Name</label>
                <svg onClick={() => { hideForm("name") }} className="_modal-close-icon" viewBox="0 0 40 40">
                  <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                </svg><br />
                <br />
                <div>
                  <label htmlFor="firstName">First Name</label><br />
                  <input className="signup_input" type="text" id="firstName" name="first_name" placeholder="Harper" maxLength="50" /><br />
                  <label htmlFor="nickName">Nick Name</label><br />
                  <input className="signup_input" type="text" id="nickName" name="nick_name" placeholder="Kiss" maxLength="50" /><br />
                  <label htmlFor="lastName">Last Name</label><br />
                  <input className="signup_input" type="text" id="lastName" name="last_name" placeholder="Young" maxLength="50" /><br />
                </div>
              </div>
              <button className="submit_btn submit_padding" type="submit">Submit</button>
            </fieldset>
          </form>
          <button onClick={() => { displayForm("name") }} className="edit_name_btn text_btn" type="button"><b>edit</b></button>
        </div>
        {/* Status Section */}
        <div>
          <p className="status_tag">Status: none</p>
          <form id="status" className="status_form" onSubmit={(e) => { onSubmit(e, "status") }}>
            <fieldset>
              <div className="status_form_field">
                <label htmlFor="status">Status</label>
                <svg onClick={() => { hideForm("status") }} className="_modal-close-icon" viewBox="0 0 40 40">
                  <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                </svg><br />
                <textarea className="login_input" type="text" id="status_textarea" name="status" readOnly maxLength="32" value="Lorem ipsum dolor sit amet, cons" /><br />
              </div>
              <button className="submit_btn submit_padding" type="submit">Submit</button>
            </fieldset>
          </form>
          <button onClick={() => { displayForm("status") }} className="edit_status_btn text_btn" type="button"><b>edit</b></button>
        </div>
        <Link to={`/id_request/${CryptoJS.AES.encrypt(userId, REACT_APP_KEY).toString()}`}>Request new ID card</Link><br />
        <Container triggerText="Delete Account" /><br />
        {/* Social Media Links */}
        <div>
          {/* Facebook URL */}
          <div>
            <div>
              <img srcSet={fbMini} alt="User's facebook link." />
              <Link target="_blank" to="https://www.facebook.com" className="fb_tag">https://www.facebook.com</Link>
            </div>
            <form id="fb" className="fb_form" onSubmit={(e) => { onSubmit(e, "fb") }}>
              <fieldset>
                <div className="fb_form_field">
                  <label htmlFor="fb">Facebook Link</label>
                  <svg onClick={() => { hideForm("fb") }} className="_modal-close-icon" viewBox="0 0 40 40">
                    <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                  </svg><br />
                  <input className="login_input" id="fb_input" type="text" name="fb" readOnly maxLength="200" value="https://wwww.facebook.com" /><br />
                </div>
                <button className="submit_btn submit_padding" type="submit">Submit</button>
              </fieldset>
            </form>
            <button onClick={() => { displayForm("fb") }} className="edit_fb_btn text_btn" type="button"><b>edit</b></button>
          </div>
          {/* Twitter URL */}
          <div>
            <div>
              <img srcSet={twitterMini} alt="User's twitter link." />
              <Link target="_blank" to="https://www.twitter.com" className="twitter_tag">https://www.twitter.com</Link>
            </div>
            <form id="twitter" className="twitter_form" onSubmit={(e) => { onSubmit(e, "twitter") }}>
              <fieldset>
                <div className="twitter_form_field">
                  <label htmlFor="twitter">Twitter Link</label>
                  <svg onClick={() => { hideForm("twitter") }} className="_modal-close-icon" viewBox="0 0 40 40">
                    <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                  </svg><br />
                  <input className="login_input" type="text" id="twitter_input" name="twitter" readOnly maxLength="200" value="https://twitter.com" /><br />
                </div>
                <button className="submit_btn submit_padding" type="submit">Submit</button>
              </fieldset>
            </form>
            <button onClick={() => { displayForm("twitter") }} className="edit_twitter_btn text_btn" type="button"><b>edit</b></button>
          </div>
          {/* Instagram URL */}
          <div>
            <div>
              <img srcSet={instaMini} alt="User's instagram link." />
              <Link target="_blank" to="https://www.instagram.com" className="insta_tag">https://www.instagram.com</Link>
            </div>
            <form id="insta" className="insta_form" onSubmit={(e) => { onSubmit(e, "insta") }}>
              <fieldset>
                <div className="insta_form_field">
                  <label htmlFor="insta">Instagram Link</label>
                  <svg onClick={() => { hideForm("insta") }} className="_modal-close-icon" viewBox="0 0 40 40">
                    <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                  </svg><br />
                  <input className="login_input" type="text" id="insta_input" name="insta" readOnly maxLength="200" value="https://www.instagram.com" /><br />
                </div>
                <button className="submit_btn submit_padding" type="submit">Submit</button>
              </fieldset>
            </form>
            <button onClick={() => { displayForm("insta") }} className="edit_insta_btn text_btn" type="button"><b>edit</b></button>
          </div>
        </div>
      </div>

      <div className="clear"></div>

      <div>
        {/* Email Section */}
        <div>
          <p className="email_tag">Email: none</p>
          <form id="email" className="email_form" onSubmit={(e) => { onSubmit(e, "email") }}>
            <fieldset>
              <div className="email_form_field">
                <label htmlFor="email">Email</label>
                <svg onClick={() => { hideForm("email") }} className="_modal-close-icon" viewBox="0 0 40 40">
                  <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                </svg><br />
                <input className="signup_input" type="text" id="email_input" name="email" maxLength="320" placeholder="example@example.com" /><br />
              </div>
              <button className="submit_btn submit_padding" type="submit">Submit</button>
            </fieldset>
          </form>
          <button onClick={() => { displayForm("email") }} className="edit_email_btn text_btn" type="button"><b>edit</b></button>
        </div>
        {/* Birthday Section */}
        <div>
          <p className="birthday_tag">Birthday: DD-MM-YYYY</p>
          <form id="birthday" className="birthday_form" onSubmit={(e) => { onSubmit(e, "birthday") }}>
            <fieldset>
              <div className="birthday_form_field">
                <label htmlFor="birthday">Birthday</label><br />
                <svg onClick={() => { hideForm("birthday") }} className="_modal-close-icon" viewBox="0 0 40 40">
                  <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                </svg><br />
                <input className="signup_input" type="date" id="birthday_input" name="birthday" /><br />
              </div>
              <button className="submit_btn submit_padding" type="submit">Submit</button>
            </fieldset>
          </form>
          <button onClick={() => { displayForm("birthday") }} className="edit_birthday_btn text_btn" type="button"><b>edit</b></button>
        </div>
        {/* Address Section */}
        <div>
          <p className="address_tag">Address: none</p>
          <form id="address" className="address_form" onSubmit={(e) => { onSubmit(e, "address") }}>
            <fieldset>
              <div className="address_form_field">
                <label htmlFor="address">Address</label><br />
                <svg onClick={() => { hideForm("address") }} className="_modal-close-icon" viewBox="0 0 40 40">
                  <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                </svg><br />
                <div>
                  <input className="signup_input" type="text" name="street" id="streetId" maxLength="150" placeholder="Building number, Street name, Apartment ID" />
                  <div className="geo_location">
                    <select name="country" className="countries" id="countryId">
                      <option value="">Select Country</option>
                    </select>
                  </div>
                  <div className="geo_location">
                    <select name="state" className="states" id="stateId">
                      <option value="">Select State</option>
                    </select>
                  </div>
                  <div className="geo_location">
                    <select name="city" className="cities" id="cityId">
                      <option value="">Select City</option>
                    </select>
                  </div><br />
                  <input type="text" name="zip" id="zipId" maxLength="10" placeholder="Zip" /><br />
                </div>
              </div>
              <button className="submit_btn submit_padding" type="submit">Submit</button>
            </fieldset>
          </form>
          <button onClick={() => { displayForm("address") }} className="edit_address_btn text_btn" type="button"><b>edit</b></button>
        </div>
        {/* Change Password Section */}
        <div>
          <form id="password" className="password_form" onSubmit={(e) => { onSubmit(e, "password") }}>
            <fieldset>
              <div className="password_form_field">
                <label htmlFor="password">Change Password</label>
                <svg onClick={() => { hideForm("password") }} className="_modal-close-icon" viewBox="0 0 40 40">
                  <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                </svg><br />
                <br />
                <div>
                  <label htmlFor="oldPassword">Old Password</label><br />
                  <input className="signup_input" type="password" id="oldPassword" name="old_password" /><br />
                  <label htmlFor="newPassword">New Password</label><br />
                  <input className="signup_input" type="password" id="newPassword" name="new_password" minLength="3" maxLength="30" /><br />
                  <label htmlFor="confirmPassword">Confirm Password</label><br />
                  <input className="signup_input" type="password" id="confirmPassword" name="confirm_password" minLength="3" maxLength="30" /><br />
                  <input onClick={props.showPassword} type="checkbox" id="showPassword" name="show_password" />
                  <label htmlFor="showPassword">Show passwords</label><br />
                </div>
              </div>
              <button className="submit_btn submit_padding" type="submit">Submit</button>
            </fieldset>
          </form>
          <button onClick={() => { displayForm("password") }} className="edit_password_btn password_tag text_btn" type="button"><b>Change Password</b></button>
        </div>
        {/* Subscription Section */}
        <section>
          <h5 className="subscriptions_h5">Subscriptions</h5>
          {() => { displaySubscription() }}
        </section>
      </div>

    </div>
  );
}

export default AccountSettings;

// PropTypes for jest testing
AccountSettings.propTypes = {
  profileImgLarge: PropTypes.string,
  fbMini: PropTypes.string.isRequired,
  instaMini: PropTypes.string.isRequired,
  twitterMini: PropTypes.string.isRequired,
  emailIsValid: PropTypes.func.isRequired,
  geoDataExists: PropTypes.bool.isRequired,
  setGeoDataExists: PropTypes.func.isRequired,
  reviseName: PropTypes.func.isRequired,
  checkDates: PropTypes.func.isRequired,
  urlIsValid: PropTypes.func.isRequired,
  filePathIsValid: PropTypes.func.isRequired,
  changeBorderColor: PropTypes.func.isRequired,
  sanitizeInput: PropTypes.func.isRequired,
  displayUnloadMessage: PropTypes.func.isRequired,
  showPassword: PropTypes.func.isRequired
}
