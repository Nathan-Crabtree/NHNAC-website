// NOTE:: Majority of this code is starter code. 
// Source: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571. - Zane

import React from 'react';
import ReactDOM from 'react-dom';
import { Newsletter } from './Newsletter';
import { Feedback } from './Feedback';
import { Cookies } from './Cookies';
import { Report } from './Report';
import { Connections } from './Connections';
import { Delete } from './Delete';
import FocusTrap from 'focus-trap-react';
import PropTypes from 'prop-types';

export const Modal = ({
    onClickOutside,
    onKeyDown,
    modalRef,
    buttonRef,
    closeModal,
    onSubmit,
    triggerText,
    displayForm,
    emailIsValid,
    className,
    profileImgSmall,
    messageIcon
}) => {

/**
 * displayForm() function - Renders following component according to what value triggerText has.
 * 
 */
displayForm = () => {
    switch (triggerText) {
        case "Feedback":
            return <Feedback />
        case "Newsletter":
            return <Newsletter onSubmit={onSubmit} closeModal={closeModal} emailIsValid={emailIsValid} />
        case "Cookies":
            return <Cookies onSubmit={onSubmit} closeModal={closeModal} />
        case "Report":
            return <Report className={className} />
        case "Connections":
            return <Connections profileImgSmall={profileImgSmall} messageIcon={messageIcon} />
        case "Delete Account":
            return <Delete onSubmit={onSubmit} closeModal={closeModal} />
        default:
            break;
    }
}

return ReactDOM.createPortal(
        <FocusTrap>
            <aside
                tag="aside"
                role="dialog"
                tabIndex="-1"
                aria-modal="true"
                className="modal-cover"
                onClick={onClickOutside}
                onKeyDown={onKeyDown}
            >
                <div className="modal-area" ref={modalRef}>
                    <button
                        ref={buttonRef}
                        aria-label="Close Modal"
                        aria-labelledby="close-modal"
                        className="_modal-close"
                        onClick={closeModal}
                    >
                        <span id="close-modal" className="_hide-visual">
                        Close
                        </span>
                        <svg className="_modal-close-icon" viewBox="0 0 40 40">
                            <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                        </svg>
                    </button>
                    <div className="modal-body">
                        {displayForm()}
                    </div>
                </div>
            </aside>
        </FocusTrap>,
        document.body
    );

};

export default Modal;

// PropTypes for jest testing in App.test.js
Modal.propTypes = {
    onClickOutside: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    modalRef: PropTypes.func.isRequired,
    buttonRef: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    triggerText: PropTypes.string.isRequired,
    emailIsValid: PropTypes.func,
    profileImgSmall: PropTypes.string,
    messageIcon: PropTypes.string
}