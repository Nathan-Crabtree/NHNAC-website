// NOTE: Majority of this code is starter code.
// Source: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571 - Zane

import React from 'react';
import ReactDOM from 'react-dom';
import { Newsletter } from './Newsletter';
import { Feedback } from './Feedback';
import { Cookies } from './Cookies';
import { Report } from './Report';
import { Connections } from './Connections';
import { Delete } from './Delete';
import { SharePodcast } from './SharePodcast'
import FocusTrap from 'focus-trap-react';
import PropTypes from 'prop-types';

export const Modal = ({
    onClickOutside,
    onKeyDown,
    modalRef,
    buttonRef,
    closeModal,
    triggerText,
    displayForm,
    emailIsValid,
    setNewsletterEmailAddress,
    className,
    profileImgSmall,
    messageIcon,
    sanitizeInput,
    displayUnloadMessage
}) => {

/**
 * displayForm() function - Renders following component according to what value triggerText has.
 *
 * @returns {class} Component - A React Component.
 */
displayForm = () => {
    switch (triggerText) {
        case "Feedback":
            return <Feedback sanitizeInput={sanitizeInput} displayUnloadMessage={displayUnloadMessage} />
        case "Newsletter":
            return <Newsletter closeModal={closeModal} emailIsValid={emailIsValid} setNewsletterEmailAddress={setNewsletterEmailAddress} />
        case "Cookies":
            return <Cookies closeModal={closeModal} />
        case "Report":
            return <Report className={className} />
        case "Connections":
            return <Connections profileImgSmall={profileImgSmall} messageIcon={messageIcon} />
        case "Delete Account":
            return <Delete closeModal={closeModal} />
        case "Share this podcast":
            return <SharePodcast />
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
// NOTE: emailIsValid and setNewsletterEmailAddress aren't marked as required to avoid warnings when
// non-newsletter modals are activated. - Zane
Modal.propTypes = {
    onClickOutside: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
    modalRef: PropTypes.func.isRequired,
    buttonRef: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    triggerText: PropTypes.string.isRequired,
    emailIsValid: PropTypes.func,
    setNewsletterEmailAddress: PropTypes.func,
    profileImgSmall: PropTypes.string,
    messageIcon: PropTypes.string,
    sanitizeInput: PropTypes.func,
    displayUnloadMessage: PropTypes.func
}
