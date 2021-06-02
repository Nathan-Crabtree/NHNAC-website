// NOTE: Majority of this code is starter code. 
// Source: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571 - Zane

import React from 'react';

export const Feedback = () => {

let errorExists = false;

/**
* onSubmit() function - An event handler that prevents default action (page refresh), checks to see if message
* content is > 3 characters, submits and renders HTML according to condition.
* 
* @param {object} event 
*/
function onSubmit(event) {
  event.preventDefault(event);
  const messageContent = event.target.message.value;
  if (messageContent.length > 3) {
      // Take the data and send it to API
      console.log(messageContent);

      // Render on the modal thank you text
      const modalForm = document.getElementsByClassName("modal_form")[0];
      modalForm.parentElement.innerHTML = '<h3 align="center">Thank you for your feedback!</h3>';
  } else {
      // Render error text and colors 
      if (!errorExists) {
        const formField = document.getElementsByClassName("feedback_form_fields")[0];
        const input = document.getElementById("message");
        const error = document.createElement('p');
        error.innerHTML = '*Please type in more than 3 characters.';
        error.style.fontSize = '.9rem';
        error.style.color = '#C31F01';
        formField.appendChild(error);
        input.style.borderColor = '#C31F01';
        errorExists = true;
      }
  }
}

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
                        <textarea className="login_input" type="text" id="message" name="message" /><br />
                    </div>
                    <button className="submit_btn submit_padding" type="submit">Submit</button>
                </fieldset>
            </form>
        </div>   
    );

};

export default Feedback;