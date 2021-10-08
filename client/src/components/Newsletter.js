// NOTE: Majority of this code is starter code. 
// Src: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571

import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const Newsletter = ({ onSubmit, closeModal, emailIsValid, setNewsletterEmailAddress }) => {

    const [errorExists, setErrorExists] = useState(false);

    /**
     * An event handler that prevents default action (page refresh), checks to see if email
     * is valid, submits and renders HTML according to condition. Subscribes user to newsletter email list.
     *
     * @param {object} event
     */
    onSubmit = (event) => {
        const target = event.target || event.srcElement;
        let submit = document.querySelector(".newsletter_form #submit");

        // Use IE5-8 fallback if event object not present
        if (!event) {
            event = window.event;
        }

        event.preventDefault();

        let email = target.email.value;

        // Check if email length is greater than 320 characters and valid
        if (email.length > 320 || !emailIsValid(email)) {
            if (!errorExists) {
                // Render error text and change boolean
                const formField = target.children[2].firstChild;
                const input = target.children[2].firstChild.firstChild;
                let error = document.createElement("p");
                error.innerText = '*Please enter a valid email address.';
                error.style.fontSize = '.9rem';
                error.style.color = '#C31F01';
                formField.appendChild(error);
                input.style.borderColor = '#C31F01';
                setErrorExists(true);
            }
        } else {
            // Do a query search in database to check if email entered in is unique. If it isn't, change value of boolean
            let emailAlreadyExists = false;

            // Do query search here

            if (emailAlreadyExists) {
                if (!errorExists) {
                    // Render error text and change boolean
                    const formField = target.children[2].firstChild;
                    const input = target.children[2].firstChild.firstChild;
                    let error = document.createElement("p");
                    error.innerText = '*Email address already exists.';
                    error.style.fontSize = '.9rem';
                    error.style.color = '#C31F01';
                    formField.appendChild(error);
                    input.style.borderColor = '#C31F01';
                    setErrorExists(true);
                }
            } else {
                // Do code here
                // Disable submit button
                submit.disabled = true;
                submit.setAttribute("class", "disabled_btn");

                setNewsletterEmailAddress(email);

                // Render on the modal thank you text
                const modalForm = document.getElementsByClassName("modal_form")[0];
                const thankYouBlock = document.createElement("h3");
                thankYouBlock.innerText = "Thank you for your subscribing!";
                thankYouBlock.style.textAlign = "center";
                modalForm.parentElement.replaceChild(thankYouBlock, modalForm);
            }
        }

    }

    return (
        <form className="modal_form newsletter_form" onSubmit={onSubmit}>
            <h2 className="newsletter_h2">Join Our Newsletter</h2>
            <p>Subscribe to our newsletter to get the latest articles, events, & updates. No spam.</p>
            <fieldset>
                <div className="newsletter_form_fields">
                    <input className="login_input" type="text" id="email" name="email" maxLength="320" placeholder="Enter your email" /><br />
                </div>
                <button id="submit" className="submit_btn" type="submit">Subscribe</button>
                <div className="form_links center_text">
                    <span><button className="form_links_btn" type="button" onClick={closeModal}>No thanks</button></span>
                </div>
            </fieldset>
        </form>
    );

};
export default Newsletter;

// PropTypes for jest testing
Newsletter.propTypes = {
    closeModal: PropTypes.func.isRequired,
    emailIsValid: PropTypes.func.isRequired,
    setNewsletterEmailAddress: PropTypes.func.isRequired,
    sanitizeInput: PropTypes.func.isRequired
}
