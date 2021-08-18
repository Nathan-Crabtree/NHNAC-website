// NOTE: Majority of this code is starter code.
// Source: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571 - Zane

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const Feedback = ({ sanitizeInput, displayUnloadMessage }) => {

const [errorExists, setErrorExists] = useState(false);
const [formActive, setFormActive] = useState(false);

/**
* onSubmit() function - An event handler that prevents default action (page refresh), checks to see if message
* content is > 3 and < 500 characters, submits and renders HTML according to condition.
*
* @param {object} event
*/
function onSubmit(event) {
  // Use IE5-8 fallback if event object not present
  if (!event) {
    event = window.event;
  }

  event.preventDefault(event);

  let messageContent = event.target.message.value;
  messageContent = sanitizeInput(messageContent);

  if (messageContent.length > 3 && messageContent.length <= 500) {
      // Take the data and send it to API
      console.log(messageContent);

      // Render on the modal thank you text
      const modalForm = document.getElementsByClassName("modal_form")[0];
      const thankYouBlock = document.createElement("h3");
      thankYouBlock.innerText = "Thank you for your feedback!";
      thankYouBlock.style.textAlign = "center";
      modalForm.parentElement.replaceChild(thankYouBlock, modalForm);

      if (window.removeEventListener) { // If event listener supported
          // Remove pop-up warning of unsaved data if user attempts to leave page
          window.removeEventListener("beforeunload", displayUnloadMessage, false);
      } else {
          window.detachEvent("beforeunload", displayUnloadMessage);
      }

      setFormActive(false);
  } else {
      // Render error text and colors
      if (!errorExists) {
        const formField = event.target.children[1].firstChild;
        const input = event.target.children[1].firstChild.children[6];
        const error = document.createElement('p');
        error.innerText = '*Please type in more than 3 characters.';
        error.style.fontSize = '.9rem';
        error.style.color = '#C31F01';
        formField.appendChild(error);
        input.style.borderColor = '#C31F01';
        setErrorExists(true);
      }
  }
}

useEffect(() => {
    if (window.addEventListener) { // If event listener supported
        // Add pop-up warning of unsaved data if user attempts to leave page
        window.addEventListener("beforeunload", displayUnloadMessage, false);
    } else {
        window.attachEvent("beforeunload", displayUnloadMessage);
    }

    setFormActive(true);

    // componentWillUnmount() substitute for React Hooks 
    return () => {
        if (formActive) {
            if (window.removeEventListener) { // If event listener supported
                // Remove pop-up warning of unsaved data if user attempts to leave page
                window.removeEventListener("beforeunload", displayUnloadMessage, false);
            } else {
                window.detachEvent("beforeunload", displayUnloadMessage);
            }
        }
    }
}, [])

return (
        <div>
            <form className="modal_form" onSubmit={onSubmit}>
                <h2 className="newsletter_h2">Feedback</h2>
                <fieldset>
                    <div className="feedback_form_fields">
                        <label htmlFor="type">Choose your feedback type</label><br />
                        <select id="type" name="type">
                            <option value="compliment">Compliment</option>
                            <option value="complaint">Complaint</option>
                            <option value="suggestion">Suggestion</option>
                        </select><br />
                        <label htmlFor="message">Comment</label><br />
                        <textarea className="login_input" type="text" id="message" name="message" maxLength="500" /><br />
                    </div>
                    <button className="submit_btn submit_padding" type="submit">Submit</button>
                </fieldset>
            </form>
        </div>
    );

};

export default Feedback;

// PropTypes for jest testing in App.test.js
Feedback.propTypes = {
  sanitizeInput: PropTypes.func.isRequired,
  displayUnloadMessage: PropTypes.func.isRequired
}
