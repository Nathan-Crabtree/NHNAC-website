// NOTE: Majority of this code is starter code. 
// Source: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571 - Zane

import React from 'react';
import PropTypes from 'prop-types';

export const Feedback = ({ onSubmit, closeModal }) => {

return (
        <div>
            {/*<h3 align="center">Coming soon!</h3>*/}
            <form className="modal_form" onSubmit={onSubmit}>
                <h2 className="newsletter_h2">Feedback</h2>
                <fieldset>
                    <div className="form_fields">
                        <label for="type">Choose your feedback type</label><br />
                        <select id="type" name="type">
                            <option value="compliment">Compliment</option>
                            <option value="complaint">Complaint</option>
                            <option value="suggestion">Suggestion</option>
                        </select><br />
                        <label htmlFor="message">Comment</label><br />
                        <textarea className="login_input" type="text" id="message" name="message" /><br />
                    </div>
                    <button className="submit_btn submit_padding" type="submit" onClick={closeModal}>Submit</button>
                </fieldset>
            </form>
        </div>   
    );

};

export default Feedback;

// PropTypes for jest testing in App.test.js
Feedback.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
}