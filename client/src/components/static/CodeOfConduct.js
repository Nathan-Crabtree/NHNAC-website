import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CodeOfConduct = ({ CodeOfConductPdf }) => {

    useEffect(() => {
        // When component is rendered, bring user to top of page
        window.scrollTo(0, 0);
    }, []);

    return ( 
        <React.Fragment>
            <div className="MsoNormal"><strong><span>Ethical Code Of Conduct</span></strong></div><br />
            <h3>Introduction</h3>
            <p>&emsp;The New Haven Native American Church (NHNAC) is a group of Members who strive to live and practice the
            Sacred Healing Way of their Ancient Ancestors. Each NHNAC Chapter Medicine Person is a duly adopted
            Member of the Spiritual Family of the Principle Medicine Chief, and has made Covenant Declarations that
            complete the requirements to be inducted into Ministry. The Sacred Healing Way is a system of teachings and
            practices which has been developed and approved under the direction of the Principle Medicine Chief and
            appropriate councils, for the creation and training of the Church's Ministers of Medicine Men and Medicine
            Women.</p>
            <p>&emsp;NHNAC Medicine People are committed to the use of their knowledge, experience, and training to enhance and
            further the condition of individuals, families, communities, all of society, and the planet. Our Medicine Men
            and Medicine Women respect and protect the civil and human rights of others and their freedom of inquiry and
            spiritual experience. They strive to assist the public and other Members of the Church to understand and learn
            about healing, freedom of health care, informed judgment, self-empowered choice regarding religion, Spirit,
            health, Ceremony, education, and so forth. In doing so, they perform many functions including Healer,
            Teacher, Support Person, Consultant, Councilor, Spiritual Guide, Interventionist, Minister, Clergy, Role Model,
            and so forth.</p>
            <p>&emsp;Medicine Men and Medicine Women should understand that by the very virtue of their position and chosen way
            of life, they are models for society and their way of administering their healing services. By them living within
            a code created by the Spirit and by ethical consideration, they are doing all that is reasonably within their power
            to perform, to teach, and to heal.</p>
            <p>&emsp;The NHNAC Ethical Code of Conduct is intended to provide guides to encompass most scenarios found in
            Healing. Found in it are the guides to establish and protect the safety and welfare of individuals, communities,
            society, and the world. The goal of the Ethical Code of Conduct is to educate its Members and Ministers and to
            inform them that actions can result in outcomes which are sometimes cannot be seen before the fact. Medicine
            Men and Medicine Women should be dedicated to an Ethical Code of Conduct so the outcomes of their actions
            will produce much more positive results.</p>
            <h3>Ethical Code of Conduct General Guidelines</h3>
            <p>&emsp;These general guidelines for the Ethical Code of Conduct assist to inspire the Healing Community and the
            World toward the spiritual understanding of the Creator and assist the physical welfare of all. The ethical
            standards and guidelines form a foundation of integrity and assist the thought process to produce the best result
            in a situation. Use them as a guide in your Ministry to assist you in creating a better world both physically and
            also spiritually.</p>
            <p>&emsp;The following Guidelines have within them the Four Great Principles of the Ancestors:</p>
            <h3>Guideline 1: Do No Harm In Your Beneficence</h3>
            <p>&emsp;In their Ministry , NHNAC Medicine Men and Medicine Women strive to safeguard the rights and welfare of
            those with whom they interact, other affected persons, the welfare of all living things, and of the Earth itself.
            Methods that might conceivably do harm, directly or as a side effect, are avoided where reasonably possible.
            Any conflict that may occur, a Medicine Person will strive to resolve it in the most responsible manner and with
            as little or no harm as they can.</p>
            <p>&emsp;Ministers should use the educational materials, Sacred Writings, their Chapters, District Councils, and so forth
            to ensure little or no harm comes from their actions. A Medicine Person needs to be vigilant in protecting
            others form any misuse of their influence. While in service of others, the Medicine Person needs to hold the
            safety of who they are ministering too as top priority.</p>
            <p>&emsp;Each NHNAC Medicine Man and Medicine Woman also needs to take in consideration of their own physical,
            mental, and spiritual health and the possible effects of their wellbeing on those with whom they minister.</p>
            <h3>Guideline 2: Responsibility</h3>
            <p>&emsp;Forming relationships of trust and honesty is the process for all Church Members. Medicine People should also
            hold themselves to a higher standard of ethical conduct and seek to educate all they work with. Clarifying any
            healing modality, be it physical or spiritual, and establishing informed consent with the person they are
            ministering to, is the responsibility of all Medicine Men and Medicine Women. Medicine People also accept
            fitting responsibility for who they are and for all of their actions.</p>
            <p>&emsp;NHNAC Ministers make sure they consult with other NHNAC Medicine Men and Women, assist other
            professionals, educate themselves, maintain dignity and respect, and refer their clients to more qualified
            professional or Healer when appropriate. They are attentive to the Ethical Code of Conduct for themselves and
            other Ministers in the Church. They strive to only speak positive about all others and avoid "evil speaking" in
            all its forms.</p>
            <p>&emsp;Ministers regularly perform service, volunteer time, or support the Spiritual Community as appropriate.
            Contributing to the greater good is an honor and Spiritual duty.</p>
            <h3>Guideline 3: Integrity, Honor, and Service</h3>
            <p>&emsp;In simple language NHNAC Healers hold to a Goodness Ethic. They strive to care for themselves, their family,
            their community, and the planet through cooperation. This leads to living a life of integrity and sustainability.</p>
            <p>&emsp;Through education in all its forms, Medicine Men and Medicine Women maintain competency in their Ministry
            and a connection to their Healing Services. They should only undertake those activities they can reasonably
            expect to fulfill. In their Medicine Bundle, they honor the Creator through symbolism of the Sacraments,
            Healing Modalities, and so forth. It is an Honor for the Medicine People to stand firm in their Spiritual
            Commitment by performing the Bundle Opening and Closing Ceremonies in the course of their Healing
            Services they provide. This brings Honor to the Church at to the Minister.</p>
            <p>&emsp;Supporting other NHNAC Ministers in Goodness of Faith shows integrity and honor for the Sacred Healing
            Way. Medicine People only represent themselves honestly and make sure any recipient of their Ministry are
            fully informed that they are a Minister of the Church and of the services they are providing. Medicine People
            and avoid all forms of "evil" and breaking of the established laws they are under. Ministers strive to keep their
            commitments, promises, and covenants.</p>
            <h3>Guideline 4: Respect</h3>
            <p>&emsp;NHNAC Medicine Men and Women have respect for self, others, the environment, and their Healing Services.
            With honor and dignity they find worth in the diversity connection and hold the life of all living things as
            Sacred. They are always mindful and reverent when the life of living things is taken.</p>
            <p>&emsp;Medicine People respect the right of all individuals to live their life as they see fit. In the knowledge that some
            people may have physical, psychological, or Spiritual weaknesses over ethnicity, gender, age, disability, sexual
            orientation, religion, language barriers, and so forth, each Minister of the NHNAC respects their own personal
            beliefs and values on any of these issues. However, Ministers shall not base their treatments of other people
            based on their own prejudices and shall always work within their knowledge base.</p>
            <br />
            <Link className="about_link" to={CodeOfConductPdf} target="_blank">Read Our Full Ethical Code Of Conduct</Link>
        </React.Fragment>  
    );
}
 
export default CodeOfConduct;

// PropTypes for jest testing in App.test.js
CodeOfConduct.propTypes = {
    CodeOfConductPdf: PropTypes.string.isRequired,
}