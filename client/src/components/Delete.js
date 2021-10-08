// NOTE: Majority of this code is starter code.
// Src: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571

import React from 'react';
import PropTypes from 'prop-types';

export const Delete = ({ closeModal }) => {

    return (
        <form className="modal_form" onSubmit={() => { }}>
            <h2 className="newsletter_h2">Delete Account</h2>
            <p>Are you sure you would like to delete your account?</p>
            <fieldset>
                <button className="submit_btn" type="submit">Yes</button>
                <button className="close_btn" type="button" onClick={closeModal}>No</button>
            </fieldset>
        </form>
    );
};

export default Delete;

// PropTypes for jest testing
Delete.propTypes = {
    closeModal: PropTypes.func.isRequired
}