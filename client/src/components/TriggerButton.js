// NOTE: Majority of this code is starter code.
// Src: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571

import React from 'react';
import PropTypes from 'prop-types';

const Trigger = ({ triggerText, buttonRef, showModal }) => {

    return (
        <button
            className="modal_button"
            ref={buttonRef}
            onClick={showModal}
        >
        <b>{triggerText}</b>
        </button>
    );

};

export default Trigger;

// PropTypes for jest testing in App.test.js
Trigger.propTypes = {
    triggerText: PropTypes.string.isRequired,
    buttonRef: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired
}