import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Verification = ({emailAddress = "example@example.com"}) => {

    useEffect(() => {
      // When component is rendered, bring user to top of page.
      window.scrollTo(0, 0);
    }, []);

    return (
        <React.Fragment>
            <div className="MsoNormal"><strong><span>Email Verification</span></strong></div><br />
            <p>We've sent an email out to {emailAddress} that provides a verification link. 
              Please verify your email by clicking the link.</p><br />
            <span className="resend_email_span">Didn't get an email? <Link to="#">Click here to have it resent.</Link></span>           
        </React.Fragment>
      );
}
 
export default Verification;

// PropTypes for jest testing in App.test.js
Verification.propTypes = {
  emailAddress: PropTypes.string.isRequired
}