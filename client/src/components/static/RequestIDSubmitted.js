import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RequestIDSubmitted = ({userFirstName, userLastName, userStreet, 
    userCountry, userState, userCity, userZip, userTier, userEmail}) => {

  useEffect(() => {
    // When component is rendered, bring user to top of page.
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
        <div className="MsoNormal"><strong><span>Request ID Form Submitted</span></strong></div><br />
        <p>We've sent an email out to {userEmail} with your new ID card attached to it.</p><br />
        <span className="resend_email_span">Didn't get an email? <Link to="#">Click here to have it resent.</Link></span>           
    </React.Fragment>
  );
}

export default RequestIDSubmitted;

// PropTypes for jest testing in App.test.js
RequestIDSubmitted.propTypes = {
    userFirstName: PropTypes.string.isRequired,
    userLastName: PropTypes.string.isRequired, 
    userStreet: PropTypes.string.isRequired,
    userCountry: PropTypes.string.isRequired,
    userState: PropTypes.string.isRequired,
    userCity:  PropTypes.string.isRequired,
    userZip: PropTypes.string.isRequired,
    userTier: PropTypes.string.isRequired,
    userEmail:  PropTypes.string.isRequired
}