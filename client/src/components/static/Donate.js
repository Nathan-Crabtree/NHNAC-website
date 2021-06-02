import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Donate extends Component {

    constructor() {
        super();
        this.state = {
            alt: "A woman with her children.",
        }
    }

    componentDidMount() {
        // When component is rendered, bring user to top of page
        window.scrollTo(0, 0);
    }

    render() { 
        return (
            <React.Fragment>
                <div className="MsoNormal"><strong><span>Donate</span></strong></div>
                <div className="image_display">
                    <img className="donate_image" srcSet={this.props.donate} alt={this.state.alt} />
                    <p className="donate_image_desc image_desc">&emsp;Photo description: {this.state.alt}</p>
                </div>
                <p>&emsp;Many people may wonder about donating and where the funds are being applied. We understand this can be a major concern with so many nonprofit organizations and churches taking in billions of dollars in donations, and then just squandering the money without any real benefit to the world or their members. New Haven Native American Church is quite saddened by this exploitation and sees the problems of this world all stem from this type of selfishness and greed. We are dedicated to assisting our members and all others and this is the path we follow! We encourage all to join us in making a real difference in this world.</p>
                <br />
                <p>&emsp;Our President, Man Found Standing, has a vision of establishing ever increasing and self sustaining Healing Communities and Ceremonial Grounds around the country and the world. What does this mean? Imagine places of worship and also healing centers that not only cared for and assisted others but also was able to provide an increase in supplies or some type of abundance. Over time this increase could be used to grow other Centers and assist more and more people. Where you had one, you will have two. Where you have two, you get four. Over time this pattern of increase will fulfill his vision and truly impact our world for good. (It is basically the principle of give a man a fish you feed him for a day, teach a man to fish and you feed him for life.)</p>
                <br />
                <p>&emsp;NHNAC understands that it is through love and assisting others that we can create a better life for ourselves and also make the positive changes our world deserves. We do not have a paid clergy, so all funds received are to cover costs and to further establish the missions of the Church. Please prayerfully consider a small monthly Sacred Giveaway Donation to assist the Missions of the Church to move forward. Even a small $1.00 donation monthly from many people can be all that is needed to see a powerful change in this world. Remember the saying, &quot;If not you, then who?&quot; Make your vote really count and join us in making a real difference.</p>
                <br />
                <p>&emsp;Your Sacred Giveaway Donations or support in other ways is all that is needed to speed up the World&#39;s healing process. All donations will go into the General Church Fund unless they are specifically requested to be used elsewhere. Example: Charity, Missionary Work, Educational Programs, Building Projects, and so forth.</p>
                <br />
                <p>&emsp;Currently the Sacred Giveaway General Fund Donations are being applied as follows:</p>
                <br />
                <p><strong>&emsp;1. Establishing and running the official website of NHNAC. (Minimum expense.)</strong></p>
                <br />
                <p><strong>&emsp;2. Purchasing and establishing the main Ceremonial Grounds of the Church 14.4 miles east of Ava, Missouri on Highway 14. Through the significant donations of Man Found Standing, the Church has purchased 439 acres in Bryant Creek watershed area. It is our desire to enhance the property for the benefit of all our members. Please view our pictures to see more. (Major expense.)</strong></p>
                <br />
                <p><strong>&emsp;3. Providing Ceremonial Services (Average expense.)</strong></p>
                <br />
                <p><strong>&emsp;4. Legal Services (Average expense at this time.)</strong></p>
                <br />
                <p><strong>&emsp;5. Other office expenses (Minimum expense.)</strong></p>
                <br />
                <p>&emsp;Our next major phase is to start new construction on the New Haven Ceremonial Grounds. This new construction will consist of housing (private and community living areas), organic gardens, healing center, supporting businesses, and so forth.</p>
                <br />
                <p>&emsp;As our Church membership grows, many services will be abundantly provided and shared with all those who are interested. Thank you, thank you, thank you for supporting our cause and choosing an organization that is truly committed to making a real difference in the world!</p>
                <br />
                <p><em>&quot;It does not take a majority to prevail... but rather an irate, tireless minority, keen on setting brushfires of freedom in the minds of men.&quot; - Samuel Adams</em></p>
                {/* Donate to PayPal option needs a link. */}
                <Link to="#"><img className="paypal_bitcoin paypal_link" srcSet={this.props.paypal} alt="Donate with PayPal." /></Link><br />
                {/* Code snippet for bitcoin payment option, which is currently an unavailable feature in the beta release. - Zane */}
                {/* <div className="bitcoin_link">
                    <Link to="#"><img className="paypal_bitcoin" srcSet={this.props.bitcoin} alt="Donate with Bitcoin." /></Link><br />
                    <span className="bitcoin_span">Got crypto? We're now accepting bitcoin donations!</span>
                </div> */}
            </React.Fragment>
        );
    }
}

// PropTypes for jest testing in App.test.js
Donate.propTypes = {
    donate: PropTypes.string.isRequired,
    paypal: PropTypes.string.isRequired,
    bitcoin: PropTypes.string.isRequired
}