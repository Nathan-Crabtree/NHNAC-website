// NOTE: Majority of this code is starter code. 
// Source: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571 - Zane

import React from 'react';
import PropTypes from 'prop-types';

export const Cookies = ({ onSubmit, closeModal }) => {

return (
        <form className="modal_form" onSubmit={onSubmit}>
            <h2 className="newsletter_h2">Cookie Policy</h2>
            <p>We use cookies to personalize your experience. By continuing to visit this website you agree to our use of cookies.</p>
            <fieldset>
                <button className="submit_btn" type="submit">Got It</button>
                <div className="form_links">
                    <span><a href="/privacy_policy" className="form_links_btn" onClick={closeModal}>Read our privacy policy</a></span>
                </div>
            </fieldset>
        </form>
    );

};
export default Cookies;

// PropTypes for jest testing in App.test.js
Cookies.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
}