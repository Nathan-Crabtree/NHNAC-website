// NOTE: Majority of this code is starter code.
// Src: https://blog.bitsrc.io/build-a-full-featured-modal-dialog-form-with-react-651dcef6c571

import React from 'react';
import PropTypes from 'prop-types';

export const Report = ({className}) => {

/**
* Prevents default action (page refresh), takes the data and sends it to the API, 
* and renders HTML acknowledging submission.
* 
* @param {object} event 
*/
function onSubmit(event) {
    const target = event.target || event.srcElement;
    const reportType = target.type.value;

    // Use IE5-8 fallback if event object not present
    if (!event) {
        event = window.event;
    }

    event.preventDefault();

    // Disable submit button
    submit.disabled = true;
    submit.setAttribute("class", "disabled_btn");  
    
    // Take the data and send it to the API
    console.log(className);
    console.log(reportType);
  
    // Render on the modal thank you text
    const modalForm = document.getElementsByClassName("modal_form")[0];
    modalForm.parentElement.innerHTML = '<h3 align="center">Thank you for your submission. We will be looking into this.</h3>';
}

return (
        <div>
            <form className="modal_form" onSubmit={onSubmit}>
                <h2 className="newsletter_h2">Report</h2>
                <fieldset>
                    <div className="feedback_form_fields">
                        <label className="report_label" htmlFor="type">Choose your report type</label><br />
                        <div className="report_radio">
                            <input type="radio" id="spam" name="type" value="spam" />
                            <label htmlFor="spam">Spam</label><br />
                        </div>
                        <div className="report_radio">
                            <input type="radio" id="child_abuse" name="type" value="child_abuse" />
                            <label htmlFor="child_abuse">Child Abuse</label><br />
                        </div>
                        <div className="report_radio">
                            <input type="radio" id="bullying" name="type" value="bullying" />
                            <label htmlFor="bullying">Bullying or Harassment</label><br />
                        </div>
                        <div className="report_radio">
                            <input type="radio" id="violence" name="type" value="violence" />
                            <label htmlFor="violence">Violent Threats</label><br />
                        </div>
                    </div>
                    <button id="submit" className="submit_btn submit_padding" type="submit">Submit</button>
                </fieldset>
            </form>
        </div>   
    );

};

export default Report;

// PropTypes for jest testing in App.test.js
Report.propTypes = {
    className: PropTypes.string.isRequired
}