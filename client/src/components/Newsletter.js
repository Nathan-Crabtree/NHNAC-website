// NOTE: Majority of this code is starter code. 
// Source: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571 - Zane

import React from 'react';
import PropTypes from 'prop-types';

export const Newsletter = ({ onSubmit, closeModal, emailIsValid, setNewsletterEmailAddress }) => {

return (
        <form className="modal_form" onSubmit={onSubmit}>
            <h2 className="newsletter_h2">Join Our Newsletter</h2>
            <p>Subscribe to our newsletter to get the latest articles, events, & updates. No spam.</p>
            <fieldset>
                <div className="newsletter_form_fields">
                    <input className="login_input" type="text" id="email" name="email" placeholder="Enter your email"/><br />
                </div>
                <button className="submit_btn" type="submit">Subscribe</button>
                <div className="form_links center_text">
                    <span><button className="form_links_btn" type="button" onClick={closeModal}>No thanks</button></span>
                </div>
            </fieldset>
        </form>
    );

};
export default Newsletter;

// PropTypes for jest testing in App.test.js
Newsletter.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    emailIsValid: PropTypes.func.isRequired,
    setNewsletterEmailAddress: PropTypes.func.isRequired
}