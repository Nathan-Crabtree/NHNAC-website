import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const About = ({indian, tribe}) => {

    const indianAlt = "A Native American Indian.";
    const tribeAlt = "Tribe logo.";
    const devURL = 'http://localhost:3000/about';
    const prodURL = 'https://newhavennativeamericanchurch.org/about';
    const prodURLInsecure = 'http://newhavennativeamericanchurch.org/about';

    useEffect(() => {
        // When component is rendered, bring user to top of page iff(if and only if) URL doesn't reference to home#contact 
        // else bring home#contact into view.
        if (window.location.href === devURL ||
        window.location.href === prodURL ||
        window.location.href === prodURLInsecure) {
            window.scrollTo(0, 0);
        } else {
            document.getElementById('contactDiv').scrollIntoView();
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
            <Link className="about_link center_text" to="/legal_rights">Read more about our legal rights</Link>
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
            <Link className="about_link center_text" to="/constitution">Read Our Constitution</Link><br />
            <Link className="about_link center_text" to="/ethical_code_of_conduct">Read our Ethical Code Of Conduct</Link>
            <div className="image_display">
                <img className="tribe_image" srcSet={tribe} alt="Tribe logo." />
                <p className="tribe_image_desc image_desc">&emsp;Photo description: {tribeAlt}</p>
            </div>
            <div id="contactDiv">
                <p>If you have questions or concerns, we implore you to read our <Link to="/faq">F.A.Q</Link> page or our <Link to="/community">Community</Link> section. You're also more than welcomed to write a letter to us at the following address: </p>
                <div>
                    <p>New Haven NAC</p>
                    <p>P.O. Box 2045</p>
                    <p>Ava, MO 65608</p>
                    <p>U.S.A.</p>
                </div>
            </div>
        </React.Fragment> 
    );
}
 
export default About;

// PropTypes for jest testing in App.test.js
About.propTypes = {
    indian: PropTypes.string.isRequired,
    tribe: PropTypes.string.isRequired,
}