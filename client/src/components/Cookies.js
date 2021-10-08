// NOTE: Majority of this code is starter code.
// Src: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571

import React from 'react';
import PropTypes from 'prop-types';

export const Cookies = ({ onSubmit, closeModal }) => {

    /**
     * 
     * 
     * @param {object} event
     */
    onSubmit = (event) => {
        let submit = document.querySelector(".cookie_form #submit");

        // Use IE5-8 fallback if event object not present
        if (!event) {
            event = window.event;
        }

        event.preventDefault();

        // Disable submit button
        submit.disabled = true;
        submit.setAttribute("class", "disabled_btn");

        closeModal();
    }

    return (
        <form className="modal_form cookie_form" onSubmit={onSubmit}>
            <h2 className="newsletter_h2">Cookie Policy</h2>
            <p>We use cookies to personalize your experience. By continuing to visit this website you agree to our use of cookies.</p>
            <fieldset>
                <button id="submit" className="submit_btn" type="submit">Got It</button>
                <div className="form_links center_text">
                    <span><a href="/privacy_policy" className="form_links_btn" onClick={closeModal}>Read our privacy policy</a></span>
                </div>
            </fieldset>
        </form>
    );

};
export default Cookies;

// PropTypes for jest testing
Cookies.propTypes = {
    closeModal: PropTypes.func.isRequired
}