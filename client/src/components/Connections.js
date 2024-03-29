// NOTE: Majority of this code is starter code.
// Src: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

var CryptoJS = require("crypto-js");
require('dotenv').config();

export const Connections = ({ profileImgSmall, messageIcon, closeModal }) => {
    const { REACT_APP_KEY } = process.env;

    /**
     * Change status in Connection table with auth. user and connecting user to "Approved" in database if
     * approved. Deletes Connection table related to auth. user and connecting user if rejected. 
     *
     * @param {boolean} approved  
     */
    const approveOrReject = (approved) => {
        if (approved) {
            // Change status in Connection table with auth. user and connecting user to "Approved" in database. Query with userId
            // in class attribute. Replace approve and reject buttons with linked message button.
        } else {
            // Delete Connection table related to auth. user and connecting user.
        }
    }

    useEffect(() => {
        // Search via query for auth. user's connections with others and render proper content via status property with
        // non-auth userId in class attributes.
    }, []);

    return (
        <ul className="connections_modal_ul">
            <li>
                <img className="profile_img_med" srcSet={profileImgSmall} alt="Portrait of user." />
                <div>
                    <a href={`/profile/${CryptoJS.AES.encrypt("1", REACT_APP_KEY).toString()}}?view=viewer`} onClick={closeModal}><h2>Milton Miles</h2></a>
                    <p>Tier</p>
                    <p>Last Online: 35 min ago</p>
                </div>
                <section>
                    <button onClick={() => { approveOrReject(true) }}>Approve</button>
                    <button onClick={() => { approveOrReject(false) }}>Reject</button>
                </section>
                <div className="clear"></div>
            </li>
            <li><hr /></li>
            <li>
                <img className="profile_img_med" srcSet={profileImgSmall} alt="Portrait of user." />
                <div>
                    <a href={`/profile/${CryptoJS.AES.encrypt("1", REACT_APP_KEY).toString()}}?view=viewer`} onClick={closeModal}><h2>Milton Miles</h2></a>
                    <p>Tier</p>
                    <p>Last Online: 35 min ago</p>
                </div>
                <a className="message_icon_a" href={`/direct_message?senderid=${CryptoJS.AES.encrypt("1", REACT_APP_KEY).toString()}&receiverid=null`} onClick={closeModal}><img className="message_icon" srcSet={messageIcon} alt="Click to message this user." /></a>
                <div className="clear"></div>
            </li>
            <li><hr /></li>
            <li>
                <img className="profile_img_med" srcSet={profileImgSmall} alt="Portrait of user." />
                <div>
                    <a href={`/profile/${CryptoJS.AES.encrypt("1", REACT_APP_KEY).toString()}}?view=viewer`} onClick={closeModal}><h2>Milton Miles</h2></a>
                    <p>Tier</p>
                    <p>Last Online: 35 min ago</p>
                </div>
                <a className="message_icon_a" href={`/direct_message?senderid=${CryptoJS.AES.encrypt("1", REACT_APP_KEY).toString()}&receiverid=null`} onClick={closeModal}><img className="message_icon" srcSet={messageIcon} alt="Click to message this user." /></a>
                <div className="clear"></div>
            </li>
        </ul>
    );
};

export default Connections;

// PropTypes for jest testing in App.test.js
Connections.propTypes = {
    profileImgSmall: PropTypes.string,
    messageIcon: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired
}
