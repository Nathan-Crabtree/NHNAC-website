import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../Container';

export default class ProfileViewer extends Component {

    constructor() {
        super();
        this.state = {
            status: ""
        };
        this.checkUserConnection = this.checkUserConnection.bind(this);
        this.connectUser = this.connectUser.bind(this);
        this.cancelConnect = this.cancelConnect.bind(this);
    }

    /**
     * checkUserConnection() function - Checks status property of Connection table between auth. user and viewed user (if it exists)
     * via query and renders button options and permissions accordingly.
     *
     * @param {string} btn
     * @returns {class} Component - A React Component.
     */
    checkUserConnection(btn) {
        // Do query search here

        if (this.state.status === "approved") {
            if (btn === "connection") {
                return <Container onSubmit={ () => {} } triggerText="Connections" profileImgSmall={this.props.profileImgSmall} messageIcon={this.props.messageIcon} />;
            } else if (btn === "message") {
                return <button className="bitcoin_btn" onClick={ () => { window.location.href="/direct_message?senderid=1&receiverid=null" } } type="button"><h4>Message</h4></button>;
            }
        } else if (this.state.status === "pending") {
            if (btn === "connection") {
                return <button onClick={this.cancelConnect}><h4>Pending...</h4></button>;
            } else if (btn === "message") {
                return <button className="bitcoin_btn" type="button" disabled><h4>Message</h4></button>;
            }
        } else {
            if (btn === "connection") {
                return <button onClick={this.connectUser} className="paypal_btn connect_btn"><h4>Connect</h4></button>;
            } else if (btn === "message") {
                return <button className="bitcoin_btn" type="button" disabled><h4>Message</h4></button>;
            }
        }
    }

    /**
     * connectUser() function - Creates a connection request to viewed user by auth. user and changes "Connect" button to show pending
     * status. Create Connection table between users with status property valued "Pending" for viewed user to be notified. Refreshes the page.
     *
     */
    connectUser() {
        // Create Connection table between users

        // Refresh the page
        //location.reload();
    }

    /**
     * cancelConnect() function - Allows user to click on "Pending" button and revert connect request to show "Connect" button again. Deletes connection table between users with status property
     * valued "Pending". Refreshes the page.
     *
     */
    cancelConnect() {
        // Delete Connection between users

        // Refresh the page
        //location.reload();
    }

    componentDidMount() {
        if (this.state.status === "approved") {
            document.getElementsByClassName("profile_container1_section_container2--viewer")[0].firstChild.className = "paypal_btn connect_btn";
        } else if (this.state.status === "pending") {
            document.getElementsByClassName("profile_container1_section_container2--viewer")[0].firstChild.className = "pending_btn";
        }
    }

    render() {
        const {
          profileImgLarge,
          apple,
          instaMini,
          twitterMini,
          fbMini,
          badge
        } = this.props;

        return(
            <React.Fragment>
                <div className="profile_container1">
                    <div>
                        <div>
                            <img srcSet={profileImgLarge} alt="Portrait of user." />
                        </div>
                        <section>
                            <h2>Harper "Kiss" Young</h2>
                            <p>Tier: </p>
                            <p>Points: </p>
                            <p>Age: </p>
                            <p>Student <img srcSet={apple} alt="Student account displayed by apple." /></p>
                            <div>
                                <p className="status_p">Status: none</p>
                            </div><br />
                            <p>Last Signed In: </p>
                            <div className="clear"></div>
                            <div>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/"><img srcSet={instaMini} alt="Author's instagram link." /></a>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.twitter.com/"><img srcSet={twitterMini} alt="Author's twitter link." /></a>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/"><img srcSet={fbMini} alt="Author's facebook link." /></a>
                            </div><br />
                        </section>
                    </div>
                    <div className="clear"></div>
                    <section className="profile_container1_section_container2--viewer">
                        <div tabIndex="0" onClick={this.cancelConnect} role="button">{ this.checkUserConnection("connection") }</div>
                        { this.checkUserConnection("message") }
                        <br />
                    </section>
                    <div className="profile_container1_and_half">
                        <div className="profile_drop_zone">
                            <section className="profile_container1_section_container3" id="profileContainer1SectionContainer3" draggable="true">
                                <h2>Certifications</h2>
                                <ul>
                                    <li>12/2/2020, 3:35pm - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                    <li>1/1/2021, 1:50xpm - Tempor incididunt ut labore et dolore magna aliqua.</li>
                                    <li>5/4/2020, 2:30pm - Nullam non nisi.</li>
                                    <li>6/4/2020, 6:45am - Vulputate eu scelerisque felis.</li>
                                </ul>
                                <button onClick={ () => { } } className="text_btn" type="button"><b>Click here to load more</b></button>
                            </section>
                        </div>
                        <div className="profile_drop_zone">
                            <section className="profile_container1_section_container4" id="profileContainer1SectionContainer4" draggable="true">
                                <h2>Councils</h2>
                                <ul>
                                    <li>Council 1</li>
                                    <li>Council 2</li>
                                    <li>Council 3</li>
                                </ul>
                                <button onClick={ () => { } } className="text_btn" type="button"><b>Click here to load more</b></button>
                            </section>
                        </div>
                    </div>
                </div>
                <div className="profile_container2">
                    <div className="profile_drop_zone">
                        <section className="profile_container2_section_container1" id="profileContainer2SectionContainer1" draggable="true">
                            <h2>Recent Activity</h2>
                            <ul>
                                <li>12/2/2020, 3:35pm - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>1/1/2021, 1:50pm - Tempor incididunt ut labore et dolore magna aliqua.</li>
                                <li>5/4/2020, 2:30pm - Nullam non nisi.</li>
                                <li>6/4/2020, 6:45am - Vulputate eu scelerisque felis.</li>
                            </ul>
                            <button onClick={ () => { } } className="text_btn" type="button"><b>Click here to load more</b></button>
                        </section>
                    </div>
                    <div className="profile_drop_zone">
                        <section className="profile_container2_section_container2" id="profileContainer2SectionContainer2" draggable="true">
                            <h2>Recent Achievements</h2>
                            <ul>
                                <li>12/2/2020, 3:35pm - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>1/1/2021, 1:50pm - Tempor incididunt ut labore et dolore magna aliqua.</li>
                                <li>5/4/2020, 2:30pm - Nullam non nisi.</li>
                                <li>6/4/2020, 6:45am - Vulputate eu scelerisque felis.</li>
                            </ul>
                            <button onClick={ () => { } } className="text_btn" type="button"><b>Click here to load more</b></button>
                        </section>
                    </div>
                    <div className="profile_drop_zone">
                        <section className="profile_container2_section_container3" id="profileContainer2SectionContainer3" draggable="true">
                            <h2>Recent Badges</h2>
                            <ul>
                                <li><img className="badge" srcSet={badge} alt="User's Silver badge." /></li>
                            </ul>
                            <button onClick={ () => { } } className="text_btn" type="button"><b>Click here to load more</b></button>
                        </section>
                    </div>
                </div>
                <div className="clear"></div>
            </React.Fragment>
        );
    }
}

// PropTypes for jest testing in App.test.js
ProfileViewer.propTypes = {
    apple: PropTypes.string.isRequired,
    book: PropTypes.string.isRequired,
    twitterMini: PropTypes.string.isRequired,
    fbMini: PropTypes.string.isRequired,
    instaMini: PropTypes.string.isRequired,
    profileImgLarge: PropTypes.string,
    profileImgSmall: PropTypes.string.isRequired,
    badge: PropTypes.string,
    messageIcon: PropTypes.string.isRequired
}
