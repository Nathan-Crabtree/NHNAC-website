// NOTE: Majority of this code is starter code.
// Source: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571 - Zane

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const Connections = ({ profileImgSmall, messageIcon, approveOrReject}) => {

/**
 * approveOrReject() function - Change status in Connection table with auth. user and connecting user to "Approved" in database if
 * approved. Deletes Connection table related to auth. user and connecting user if rejected.
 *
 * @param {boolean} approved  
 */
approveOrReject = (approved) => {
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
                <Link to="/profile?userid=1&view=viewer"><h2>Milton Miles</h2></Link>
                <p>Tier</p>
                <p>Last Online: 35 min ago</p>
            </div>
            <section>
                <button onClick={ () => { approveOrReject(true) } }>Approve</button>
                <button onClick={ () => { approveOrReject(false) } }>Reject</button>
            </section>
            <div className="clear"></div>
        </li>
        <li><hr /></li>
        <li>
            <img className="profile_img_med" srcSet={profileImgSmall} alt="Portrait of user." />
            <div>
                <Link to="/profile?userid=1&view=viewer"><h2>Milton Miles</h2></Link>
                <p>Tier</p>
                <p>Last Online: 35 min ago</p>
            </div>
            <Link className="message_icon_a" to="/direct_message?senderid=1&receiverid=null"><img className="message_icon" srcSet={messageIcon} alt="Click to message this user." /></Link>
            <div className="clear"></div>
        </li>
        <li><hr /></li>
        <li>
            <img className="profile_img_med" srcSet={profileImgSmall} alt="Portrait of user." />
            <div>
                <Link to="/profile?userid=1&view=viewer"><h2>Milton Miles</h2></Link>
                <p>Tier</p>
                <p>Last Online: 35 min ago</p>
            </div>
            <Link className="message_icon_a" to="/direct_message?senderid=1&receiverid=null"><img className="message_icon" srcSet={messageIcon} alt="Click to message this user." /></Link>
            <div className="clear"></div>
        </li>
    </ul>
    );

};

export default Connections;

// PropTypes for jest testing in App.test.js
Connections.propTypes = {
    profileImgSmall: PropTypes.string,
    messageIcon: PropTypes.string.isRequired
}
