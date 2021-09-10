// NOTE: Majority of this code is starter code.
// Src: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571

import React, { Component } from 'react';
import { Modal } from './Modal';
import TriggerButton from './TriggerButton';
import PropTypes from 'prop-types';

export default class Container extends Component {

    constructor() {
        super();
        this.state = {
            isShown: false
        }
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onClickOutside = this.onClickOutside.bind(this);
        this.toggleScrollLock = this.toggleScrollLock.bind(this);
    }

    /**
     * Changes "isShown" value, locks screen, and shows closeButton.
     *
     */
    showModal = () => {
        this.setState({ isShown: true }, () => {
        this.closeButton.focus();
        });
        this.toggleScrollLock();
    };

    /**
     * Negates the effect of showModal().
     *
     */
    closeModal = () => {
        this.setState({ isShown: false });
        this.TriggerButton.focus();
        this.toggleScrollLock();
    };

    /**
     * Event handler that allows "Enter" key to trigger closeModal() by user.
     *
     * @param {object} event
     */
    onKeyDown = (event) => {
      if (event.keyCode === 27) {
        this.closeModal();
        }
    };

    /**
     * Allows user to exit out of modal when clicking outside.
     *
     * @param {object} event
     */
    onClickOutside = (event) => {
       const target = event.target || event.srcElement;

       if (this.modal && this.modal.contains(target)) return;
       this.closeModal();
    };

    /**
     * Creates a class for <html> called "scroll-lock" that allows CSS to style scroll prevention.
     *
     */
    toggleScrollLock = () => document.querySelector('html').classList.toggle('scroll-lock');

    render() {
        const {
          profileImgSmall,
          messageIcon
        } = this.props;

        return(
            <React.Fragment>
                <TriggerButton
                    showModal={this.showModal}
                    buttonRef={(n) => (this.TriggerButton = n)}
                    triggerText={this.props.triggerText}
                />
                {this.state.isShown ? (
                <Modal
                    triggerText={this.props.triggerText}
                    modalRef={(n) => (this.modal = n)}
                    buttonRef={(n) => (this.closeButton = n)}
                    closeModal={this.closeModal}
                    onKeyDown={this.onKeyDown}
                    onClickOutside={this.onClickOutside}
                    emailIsValid={this.props.emailIsValid}
                    setNewsletterEmailAddress={this.props.setNewsletterEmailAddress}
                    className={this.props.className}
                    profileImgSmall={profileImgSmall}
                    messageIcon={messageIcon}
                    sanitizeInput={this.props.sanitizeInput}
                    displayUnloadMessage={this.props.displayUnloadMessage}
                />
                ) : null}
            </React.Fragment>
         );
    }
}

// PropTypes for jest testing in App.test.js
// NOTE: isRequired causes DOM errors for emailIsValid and setNewsletterEmailAddress because some modals don't use them. - Zane
Container.propTypes = {
    triggerText: PropTypes.string.isRequired,
    className: PropTypes.string,
    emailIsValid: PropTypes.func,
    setNewsletterEmailAddress: PropTypes.func,
    profileImgSmall: PropTypes.string,
    messageIcon: PropTypes.string,
    sanitizeInput: PropTypes.func,
    displayUnloadMessage: PropTypes.func
}
