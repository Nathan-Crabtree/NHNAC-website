import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//import { __RouterContext } from 'react-router';

const About = ({indian, tribe, emailIsValid, reviseName}) => {

    const indianAlt = "A Native American Indian.";
    const tribeAlt = "Tribe logo.";
    const devURL = 'http://localhost:3000/about';
    const prodURL = 'https://newhavennativeamericanchurch.org/about';
    const prodURLInsecure = 'http://newhavennativeamericanchurch.org/about';
    let errorsThatExist = [];

    /**
    * onSubmit() function - An event handler that prevents default action (page refresh), checks to see if message
    * content is > 3 characters, validates email input, submits and renders HTML according to condition.
    * NOTE: Could be further refactored to reduce runtime. - Zane
    * 
    * @param {object} event 
    */
    function onSubmit(event) {
        event.preventDefault(event);

        const messageContent = event.target.message.value;
        const email = event.target.email.value;
        let name = event.target.name.value;
        let revisedName = [];

        // Create error array
        let error = [];
        error[0] = document.createElement('p');
        error[1] = document.createElement('p');

        reviseName(name, revisedName);

        // Clear error text if it currently exists on the DOM
        for (let errorNo = 0; errorNo < errorsThatExist.length; errorNo++) {
            if (errorsThatExist[errorNo]) {
                const element = document.getElementsByClassName(`error_${errorNo}`)[0];
                element.parentElement.removeChild(element);
                errorsThatExist[errorNo] = false;
            }
        }

        // Check for valid email input
        if (!(emailIsValid(email))) {
            if (!errorsThatExist[0]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("email_form_field")[0];
                const input = document.getElementById("email");
                error[0].innerHTML = '*Please enter a valid email address.';
                error[0].className = "error_0";
                error[0].style.fontSize = '.9rem';
                error[0].style.color = '#C31F01';
                formField.appendChild(error[0]);
                input.style.borderColor = '#C31F01';
                errorsThatExist[0] = true;
            }
        }

        // Check if messageContent value is greater than 3 characters
        if (messageContent.length <= 3) {
            if (!errorsThatExist[1]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("contact_form_fields")[0];
                const input = document.getElementById("message");
                error[1].innerHTML = '*Please type in more than 3 characters.';
                error[1].className = "error_1";
                error[1].style.fontSize = '.9rem';
                error[1].style.color = '#C31F01';
                formField.appendChild(error[1]);
                input.style.borderColor = '#C31F01';
                errorsThatExist[1] = true;
            }
        } 

        // Check if any errors exists before sending data to API
        for (let errorNo = 0; errorNo < errorsThatExist.length; errorNo++) {
            if (errorsThatExist[errorNo]) {
                return;
            }
        }
        
        // Take the data and send it to API 
        console.log(messageContent);
        console.log(email);
        console.log(revisedName.join(""));
    
        // Render on the modal feedback text 
        const modalForm = document.getElementsByClassName("contact_form")[0];
        modalForm.innerHTML = '<h3 align="center">Your inquiry has been sent.</h3>';
    }

    useEffect(() => {
        // When component is rendered, bring user to top of page iff(if and only if) URL doesn't reference to home#contact 
        // else bring home#contact into view.
        if (window.location.href === devURL ||
        window.location.href === prodURL ||
        window.location.href === prodURLInsecure) {
            window.scrollTo(0, 0);
        } else {
            document.getElementById('contact').scrollIntoView();
        }
    }, []);

    return ( 

        <React.Fragment>
            <div className="MsoNormal center_text"><strong><span>About</span></strong></div>
            <div className="image_display">
                <img className="indian_image" srcSet={indian} alt={indianAlt} />
                <p className="indian_image_desc image_desc">&emsp;Photo description: {indianAlt}</p>
            </div>
            <p>&emsp;We are a legally established independent Native American Church that desires to protect and restore to the world our religious and personal freedoms as a Native American Religious Culture. For thousands of years, native plants such as peyote, ayahuasca, and others have been used in some Native American Ceremonies.  Many of these plants are now deemed to be illegal by federal and state governments except for Church Ceremonial use.</p>
            <Link className="about_link" to="/legal_rights">Read more about our legal rights</Link>
            <p>&emsp;Sadly because of monetary and political whims, new laws to control and enslave the population continue to "creep" into our legal system.  These new laws are classifying other natural substances, like essential oils and healing plants, to be illegal when used for healing purposes.  Because these new laws were "sneaked" into our legal system, many people do not realize they are committing a felony every time they use them.</p>
            <em>&emsp;For example, even a full blooded tribal card carrying Native American massage therapist is at risk of being sent federal prison if they use therapeutic essential oils on any client off their reservation.</em>
            <p>&emsp;So once again we see another step to take away our God given freedoms.  Because of this, many Natural Healers and individuals ask, “What can we do?”</p>
            <p>&emsp;The answer is simple. Join the New Haven Native American Religious Movement and take a stand to protect our Healing Practices, Health Care Choices, Traditions, Ceremonies, and Religious Freedom!  We desire all peoples around the world to be fully protected under the law in their religious worship and natural healing practices by being adopted into the Native American Church.  Visit the "Adoption" tab at the top of this webpage to learn more.</p>
            <iframe title="Oklevueha NAC Religious Freedoms Prevails" width="560" height="315" src="https://www.youtube.com/embed/M3AG28-njPE" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <p>&emsp;It is perfectly acceptable to have the beliefs of another organized religion and still be a member of our Church.  The Native American Church does not dictate any official religious dogma over their Healers, other than the simple truths found in our Constitution and the Ethical Code of Conduct.  We allow individuals to exercise the freedom the Creator has given them to follow their unique Spiritual Path.  All members follow the dictates of their own hearts and choose their own form of worship.  Our God-given freedoms allow members to pick from different cultures around the world what bona fide Traditional Ceremonies they would like to experience:</p>
            <div className="experiences_div">
                <ul>
                    <li>Native American Culture</li>
                    <li>Native American Rituals</li>
                    <li>Native American Spirituality</li>
                    <li>Native American Ceremonies</li>
                </ul>
            </div>
            <Link className="about_link" to="/constitution">Read Our Constitution</Link><br />
            <Link className="about_link" to="/ethical_code_of_conduct">Read our Ethical Code Of Conduct</Link>
            <div className="image_display">
                <img className="tribe_image" srcSet={tribe} alt="Tribe logo." />
                <p className="tribe_image_desc image_desc">&emsp;Photo description: {tribeAlt}</p>
            </div>
            <form id="contact" className="contact_form" onSubmit={onSubmit}>
                <h2 className="newsletter_h2">Contact Us</h2>
                <fieldset>
                    <div className="contact_form_fields">
                        <label htmlFor="name">First Name</label><br />
                        <input className="login_input" type="text" id="name" name="name" /><br />
                        <div className="email_form_field">
                            <label htmlFor="email">Email</label><br />
                            <input className="login_input" type="text" id="email" name="email" /><br />
                        </div>
                        <label htmlFor="message">Comment or Message</label><br />
                        <textarea className="login_input" type="text" id="message" name="message" /><br />
                    </div>
                    <button className="submit_btn submit_padding" type="submit">Submit</button>
                </fieldset>
            </form>
        </React.Fragment> 
    );
}
 
export default About;

// PropTypes for jest testing in App.test.js
About.propTypes = {
    indian: PropTypes.string.isRequired,
    emailIsValid: PropTypes.func.isRequired,
    reviseName: PropTypes.func.isRequired
}