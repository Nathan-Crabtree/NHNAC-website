import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class SignUp extends Component {

    componentDidMount() {
        // When component is rendered, bring user to top of page.
        window.scrollTo(0, 0);

        // This script tag is important htmlFor sign-up form to work properly. 
        // Provides country data htmlFor users to help insert exact address location. - Zane
        // Source: https://geodata.solutions
        if (!this.props.geoDataExists) {
            const script = document.createElement("script");

            script.src = "//geodata.solutions/includes/countrystatecity.js";
            script.async = true;
    
            document.body.appendChild(script);

            this.props.setGeoDataExists();
        }
    }

    render() { 
        return ( 
            <React.Fragment>
                    <form className="signup_form">
                        <div className="top_div">
                            <h2>Adoption form</h2>
                            <p>Pay what you'd like. Join our church today!</p>
                        </div>
                        <fieldset className="signup_fieldset">
                            <div className="signup_fields">
                                <label htmlFor="name">Full Name</label><br />
                                <input className="signup_input" type="text" id="name" name="name" placeholder="Full Name" /><br />
                            </div>
                            <div className="signup_fields">
                                <label htmlFor="email">Email</label><br />
                                <input className="signup_input" type="text" id="email" name="email" placeholder="Email" /><br />       
                            </div>
                            <div className="signup_fields">
                                <label htmlFor="birthday">Birthday</label><br />
                                <input className="signup_input" type="date" id="birthday" name="birthday" /><br /> 
                            </div>
                            <div className="signup_fields">
                                <label htmlFor="gender">Gender</label><br />
                                <select id="gender" name="gender">
                                <option>Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select><br />
                            </div>
                            <div className="signup_fields">
                                <label htmlFor="address">Mailing Address</label><br />
                                <input className="signup_input" type="text" name="street" id="address" placeholder="Building number, Street name, Apartment ID" />
                                <div className="geo_location">
                                    <select name="country" className="countries" id="countryId">
                                        <option value="">Select Country</option>
                                    </select>
                                </div>
                                <div className="geo_location">
                                    <select name="state" className="states" id="stateId">
                                        <option value="">Select State</option>
                                    </select>
                                </div>
                                <div className="geo_location">
                                    <select name="city" className="cities" id="cityId">
                                        <option value="">Select City</option>
                                    </select>
                                </div><br />
                                <input type="text" name="zip" id="address" placeholder="Zip" /><br />
                            </div>
                            <div className="signup_fields">
                                <label htmlFor="securityQuestion">Type your security question here</label><br />
                                <input className="signup_input" type="text" id="securityOuestion" name="security_question" placeholder="Type your security question here" /><br />          
                            </div>
                            <div className="signup_fields">
                                <label htmlFor="securityAnswer">Type your security answer here</label><br />
                                <input className="signup_input" type="text" id="securityAnswer" name="security_answer" placeholder="Type your security answer here" /><br />       
                            </div>
                            <div className="signup_fields">
                                <label htmlFor="password">Password</label><br />
                                <input className="signup_input" type="password" id="password" name="password" placeholder="Password" /><br />                   
                            </div>
                            <div className="signup_fields">
                                <label htmlFor="confirm_password">Confirm Password</label><br />
                                <input className="signup_input" type="password" id="confirmPassword" name="confirm_password" placeholder="Confirm Password" /><br />    
                            </div>
                            <div className="newsletter_div">
                                <input type="checkbox" id="newsletter" name="newsletter" />
                                <label htmlFor="newsletter">Check this box to sign up for our newsletter</label><br />
                            </div>
                            {/* Insert e-signature widget here */}
                            <label htmlFor="payment">Pay Us What You'd Like</label><br />
                            <input className="signup_input" type="number" id="payment" name="payment" placeholder="0" /><br />
                            <div className="pay_buttons_div">
                                <button className="pay_button" type="button" value="1">$1</button>
                                <button className="pay_button" type="button" value="5">$5</button>
                                <button className="pay_button" type="button" value="10">$10</button>
                                <button className="pay_button" type="button" value="20">$20</button>
                            </div>
                            <div className="pay_with_div">
                                <button className="paypal_btn" type="button">Pay with PayPal</button>
                                <p>Or</p>
                                <button className="bitcoin_btn" type="button">Pay with Bitcoin</button>
                            </div>
                        </fieldset>
                        <p className="agreement_p">By signing up, you automatically agree to our <Link to="/adoption_agreement" target="_blank">Adoption Agreement</Link> and <Link to="/terms_of_service" target="_blank">Terms Of Service</Link>.</p>
                    </form>
            </React.Fragment> 
        );
    }
}

// PropTypes for jest testing in App.test.js
SignUp.propTypes = {
    geoDataExists: PropTypes.bool.isRequired,
    setGeoDataExists: PropTypes.func.isRequired
}