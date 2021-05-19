import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Confirmation = ({newsletterEmailAddress}) => {

    useEffect(() => {
      // When component is rendered, bring user to top of page.
      window.scrollTo(0, 0);
    }, []);

    return (
        <React.Fragment>
            <div className="MsoNormal"><strong><span>Delete Confirmation</span></strong></div><br />
            <p>We've sent an email out to {newsletterEmailAddress} that provides a confirmation link. 
              Please confirm deleting your account by clicking the link.</p><br />
            <span className="resend_email_span">Didn't get an email? <Link to="#">Click here to have it resent.</Link></span>           
        </React.Fragment>
      );
}
 
export default Confirmation;

// PropTypes for jest testing in App.test.js
Confirmation.propTypes = {
  newsletterEmailAddress: PropTypes.string.isRequired
}