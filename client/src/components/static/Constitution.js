import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Constitution = ({ ConstitutionPdf }) => {

    useEffect(() => {
        // When component is rendered, bring user to top of page
        window.scrollTo(0, 0);
    }, []);

    return ( 
        <React.Fragment>
            <div className="MsoNormal"><strong><span>Constitution</span></strong></div><br />
            <p>&emsp;New Haven Native American Church’s Medicine Men and Medicine Women are dedicated in following the Sacred Healing Way.  As an Independent Governing Branch of the Native American Church, our Spiritual Authority directly stems from the Lakota Sioux’s Native American Church, Rosebud Reservation of South Dakota.  In the Declaration of Good Conscience and Practice, Constitution, and Establishment of the Church, We Walk In The Sacred Way!</p>
            <h3>Constitution Preamble</h3>
            <p>&emsp;We believe in the Creator and that the Creator made all men and women who have lived, do now live, and who will yet live, as free and equal beings. We recognize the inherent, ancestral, sovereign rights granted to all people by the Creator, human conscience, international law, and legal constructs of reciprocity, mutuality, and comity, which cannot be diminished or extinguished.</p>
            <p>&emsp;We believe that we derive from and that we may become like the natives who lived in this land anciently and that, through their literal descendants, we claim the right to form a church organization based upon their teachings which have been passed down to us through the traditions, customs, ceremonies, records which have been guarded through the ages by their descendants.</p>
            <p>&emsp;Accordingly, we believe that we are all relations one to another and we are children of the same Creator.  We affirm the UNITED NATIONS Declaration on the Rights of Indigenous Peoples <cite>(U.N. Subcommission on Prevention of Discrimination and Protection of Minorities, 1994/45, August 26, 1994. U.N. Doc. E/CN.4/1995/2, E/CN.4/sub.2/1994/56, at 105 (1994))</cite>, which finally culminated in the Unanimous Ratification of the Members States and has become part of International Rights Law.</p>
            <p>&emsp;Fundamental to our traditions is the truth that, as children of the Creator, we are entitled to the freedoms of thought, religion, education, assembly, opinion, speech, movement, our sacred rights of worship and methods of healing, our traditional lifestyle and security within our historical territories, insofar as that freedom does not prevent others from likewise enjoying the same freedoms.  We believe that men and women have been endowed with intelligence enough to govern themselves in such a manner as to guarantee to themselves these freedoms, to establish just and right ways to deal with each other, to maintain a tranquil and secure domestic life, provide for defense of these rights when needed, and to ensure for ourselves and our posterity the blessings that our culture, traditions, and teachings bring.</p>
            <p>&emsp;Accordingly, we exercise the Right of Self-Determination, which has been guaranteed by International and Domestic Law, to form the New Haven Native American Church comprised of individuals out of many Federally and Crown-Recognized Tribes and Bands, Non-recognized Tribes and Bands, Native Hawaiian, Native Alaskan, other Indigenous Peoples worldwide, and also from those individuals whom the Church shall see fit to admit by the exercise of our Religion and the administration of our Cultural Traditions and Institutions, whom we recognize as Our People, founded upon the Customs, Traditions, Principles, Religion, Governance, and Belief Systems cited herein, and we ordain and establish this Constitution for the New Haven Native American Church as an Indigenous Group under U.N.D.R.I.P.</p>
            <br />
            <Link className="about_link" to={ConstitutionPdf} target="_blank">Read Our Full Constitution</Link>
        </React.Fragment>  
    );
}
 
export default Constitution;

// PropTypes for jest testing in App.test.js
Constitution.propTypes = {
    ConstitutionPdf: PropTypes.string.isRequired,
}