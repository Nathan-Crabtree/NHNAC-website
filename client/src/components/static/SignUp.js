import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class SignUp extends Component {

    constructor() {
        super();
        this.state = { 
            errorsThatExist: [],
            hasReedemableCode: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }


    /**
    * onSubmit() function - An event handler that prevents default action (page refresh), checks to see if all values from are fit for submission. 
    * Submits and renders HTML or transfer to PayPal website according to condition.
    * 
    * NOTE: Could be further refactored to reduce runtime. - Zane
    * 
    * @param {object} event 
    */
   onSubmit(event) {
        console.log("onSubmit() called");
        event.preventDefault(event);

        let firstName = event.target.first_name.value;
        let revisedFirstName = [];
        let lastName = event.target.last_name.value;
        //let chapterID = 1;
        let revisedLastName = [];
        const email = event.target.email.value;
        const birthday = event.target.birthday.value;
        const gender = event.target.gender.value; 
        const street = event.target.street.value;
        const country = event.target.country.value;
        const state = event.target.state.value;
        const city = event.target.city.value;
        const zip = event.target.zip.value.toString();
        const securityQuestion = event.target.security_question.value;
        const securityAnswer = event.target.security_answer.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirm_password.value;
        //const redeemableCode = event.target.redeemable_code.value;
        //const payment = parseInt(event.target.payment.value.split("").filter(string => string !== "$").join(""));

        // Create error array
        let error = [];
        for (let input = 0; input < 11; input++) {
            error[input] = document.createElement('p');
        }

        // Clear error text if it currently exists on the DOM
        let errorsThatExist = this.state.errorsThatExist;
        for (let errorNo = 0; errorNo < errorsThatExist.length; errorNo++) {
            if (errorsThatExist[errorNo]) {
                const element = document.getElementsByClassName(`error_${errorNo}`)[0];
                element.parentElement.removeChild(element);
                errorsThatExist[errorNo] = false;
            }
        }

        // Check if first name and last name exist
        if (firstName.length === 0 || lastName.length === 0) {
            if (!errorsThatExist[0]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[0];
                const inputFirstName = document.getElementById("firstName");
                const inputLastName = document.getElementById("lastName");
                error[0].innerHTML = '*Please enter both your first and last name.';
                error[0].className = "error_0";
                error[0].style.fontSize = '.9rem';
                error[0].style.color = '#C31F01';
                formField.appendChild(error[0]);
                if (firstName.length === 0) {
                    inputFirstName.style.borderColor = '#C31F01';
                } 
                if (lastName.length === 0) {
                    inputLastName.style.borderColor = '#C31F01';
                }
                errorsThatExist[0] = true;
            }
        }

        // Capitalize the first letter of any names if haven't been done so by user
        if (firstName.length > 0) {
            this.props.reviseName(firstName, revisedFirstName, "firstName", true);
        } 
        if (lastName.length > 0) {
            this.props.reviseName(lastName, revisedLastName, "lastName", true);
        } 

        // Check for valid email input and if it's already in use
        if (!(this.props.emailIsValid(email))) {
            if (!errorsThatExist[1]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[1];
                const input = document.getElementById("email");
                error[1].innerHTML = '*Please enter a valid email address.';
                error[1].className = "error_1";
                error[1].style.fontSize = '.9rem';
                error[1].style.color = '#C31F01';
                formField.appendChild(error[1]);
                input.style.borderColor = '#C31F01';
                errorsThatExist[1] = true;
            }
        } else {
            // Do a query search in database to check if email entered in is unique. If it isn't, change value of boolean
            let emailAlreadyExists = false;

            // Do query search here 

            if (emailAlreadyExists) {
                if (!errorsThatExist[1]) {
                    // Render error text and change boolean
                    const formField = document.getElementsByClassName("signup_fields")[1];
                    const input = document.getElementById("email");
                    error[1].innerHTML = '*Email address already exists.';
                    error[1].className = "error_1";
                    error[1].style.fontSize = '.9rem';
                    error[1].style.color = '#C31F01';
                    formField.appendChild(error[1]);
                    input.style.borderColor = '#C31F01';
                    errorsThatExist[1] = true;
                }
            }
        }


        // Check for birthday input
        if (birthday === "") {
            if (!errorsThatExist[2]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[2];
                const input = document.getElementById("birthday");
                error[2].innerHTML = '*Please select a birthday.';
                error[2].className = "error_2";
                error[2].style.fontSize = '.9rem';
                error[2].style.color = '#C31F01';
                formField.appendChild(error[2]);
                input.style.borderColor = '#C31F01';
                errorsThatExist[2] = true;
            }
        }

        // Check for gender selection
        if (gender === "Gender") {
            if (!errorsThatExist[3]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[3];
                const input = document.getElementById("gender");
                error[3].innerHTML = '*Please select a gender.';
                error[3].className = "error_3";
                error[3].style.fontSize = '.9rem';
                error[3].style.color = '#C31F01';
                formField.appendChild(error[3]);
                input.style.borderColor = '#C31F01';
                errorsThatExist[3] = true;
            }
        }

        // Check for address input
        if (street === "" || country === "" || state === "" || city === "" || zip === "") {
            if (!errorsThatExist[4]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[4];
                const inputStreet = document.getElementById("streetId");
                const inputCountry = document.getElementById("countryId");
                const inputState = document.getElementById("stateId");
                const inputCity = document.getElementById("cityId");
                const inputZip = document.getElementById("zipId");
                error[4].innerHTML = '*Please enter or select a value in all address-related fields.';
                error[4].className = "error_4";
                error[4].style.fontSize = '.9rem';
                error[4].style.color = '#C31F01';
                formField.appendChild(error[4]);
                inputStreet.style.borderColor = '#C31F01';
                inputCountry.style.borderColor = '#C31F01';
                inputState.style.borderColor = '#C31F01';
                inputCity.style.borderColor = '#C31F01';
                inputZip.style.borderColor = '#C31F01';
                errorsThatExist[4] = true;
            }
        }

        // Check for security question selection
        if (securityQuestion === "Choose a security question") {
            if (!errorsThatExist[6]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[6];
                const input = document.getElementById("securityQuestion");
                error[6].innerHTML = '*Please select a security question.';
                error[6].className = "error_6";
                error[6].style.fontSize = '.9rem';
                error[6].style.color = '#C31F01';
                formField.appendChild(error[6]);
                input.style.borderColor = '#C31F01';
                errorsThatExist[6] = true;
            }
        }

        // Check for security answer input
        if (securityAnswer === "") {
            if (!errorsThatExist[7]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[7];
                const input = document.getElementById("securityAnswer");
                error[7].innerHTML = '*Please enter a security answer.';
                error[7].className = "error_7";
                error[7].style.fontSize = '.9rem';
                error[7].style.color = '#C31F01';
                formField.appendChild(error[7]);
                input.style.borderColor = '#C31F01';
                errorsThatExist[7] = true;
            }
        }

        // Check if password fields match
        if (password !== confirmPassword || password === "") {
            if (!errorsThatExist[8]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[8];
                const inputPassword = document.getElementById("password");
                const inputConfirmPassword = document.getElementById("confirmPassword");
                if (password === "") {
                    error[8].innerHTML = '*Please enter a password.';
                }
                if (password !== confirmPassword) {
                    error[8].innerHTML = '*Your password inputs do not match.';
                }
                error[8].className = "error_8";
                error[8].style.fontSize = '.9rem';
                error[8].style.color = '#C31F01';
                formField.appendChild(error[8]);
                inputPassword.style.borderColor = '#C31F01';
                inputConfirmPassword.style.borderColor = '#C31F01';
                errorsThatExist[8] = true;
            }
        }

        // Check for valid reedemable code input
        // if (redeemableCode === "XGDV9DJZ") {
        //     this.setState({
        //         hasReedemableCode: true
        //     });
        // }

        // Check if pay field is greater than 0
        // if (payment === 0) {
        //     if (!errorsThatExist[9]) {
        //         // Render error text and change boolean
        //         const formField = document.getElementsByClassName("signup_fields")[10];
        //         const input = document.getElementById("payment");
        //         error[9].innerHTML = '*Please enter a value greater than 0.';
        //         error[9].className = "error_9";
        //         error[9].style.fontSize = '.9rem';
        //         error[9].style.color = '#C31F01';
        //         formField.appendChild(error[9]);
        //         input.style.borderColor = '#C31F01';
        //         errorsThatExist[9] = true;
        //     }
        // }

        // Check if any errors exists before sending data to API
        for (let errorNo = 0; errorNo < errorsThatExist.length; errorNo++) {
            if (errorsThatExist[errorNo]) {
                return;
            }
        }

        // Write after-submit code here 
        let addressID = 0; //not sure if variable needs to be declared here
        let api_url = `http://localhost:8001/createAddress/${street}/${country}/${state}/${city}/${zip}/` ;
        axios.post(api_url)
        .then(res => {
            console.log(res);
            console.log(res.data);
            console.log("ADDRESSID11: " + res.data.ID);
            addressID = res.data.ID;
        })
        .catch(error => {
            console.log("error");
            if (error.response){
                // When response status code is out of 2xx range 
                console.log(error.response.data)
                console.log(error.response.status)
                console.log(error.response.headers)
            } else if(error.request) {
                // When no response was recieved after request was made
                console.log(error.request)
            } else {
                console.log(error.message)
            }
        });

        console.log("ADDRESSID: " + addressID);
        api_url = `http://localhost:8001/createUser/${addressID}/${email}/${password}/${firstName}/${lastName}/${birthday}/${gender}/${securityQuestion}/${securityAnswer}` ;
        
        axios.post(api_url)
        //axios.post(api_url, {testChapter})
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .catch(error => {
            console.log("error");
            if (error.response){
                // When response status code is out of 2xx range 
                console.log(error.response.data)
                console.log(error.response.status)
                console.log(error.response.headers)
            } else if(error.request) {
                // When no response was recieved after request was made
                console.log(error.request)
            } else {
                console.log(error.message)
            }
        });
    }

    componentDidMount() {
        // When component is rendered, bring user to top of page
        window.scrollTo(0, 0);

        // This script tag is important htmlFor sign-up form to work properly. 
        // Provides country data htmlFor users to help insert exact address location. 
        // Source: https://geodata.solutions - Zane
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
                <div className="adoption_agreement">
                    <div className="MsoNormal"><strong><span>Adoption Agreement</span></strong></div><br />
                    <p>New Haven Native American Church’s Constitution limits membership in the Native American Church to those who have been duly adopted by the President of the Church.  This adoption is an ancient principle and Ceremony called "Making Relations."  The Ceremony involves two parts: First, that you perform by you in your location; and second, which the President of the Church performs at this location.</p><br />
                    <p>The Native American Church allows individuals to exercise the freedom the Creator has given them to follow the dictates of religion according to how they feel directed by the Spirit.  Members of the Native American Church must have sincere belief and a willingness to abide by the simple truths found in our Constitution and the Ethical Code of Conduct. The Church, however, does restrict membership to individuals at the age of accountability, that age being eight years old, and only to those who feel called by the Creator to become a Healer, which are also called Medicine Men and Medicine Women.  All people can be healers and assist this world in becoming a better place.  To be established as a Healer/Medicine Person, one must place themselves in one or more of the categories below.</p><br />
                    <ol>
                        <strong><li>As a Healer of people or animals. These are Medicine Men and Women of the Native American Church whose focus is in relieving the suffering of people or animals.</li></strong><br />
                        <strong><li>As a Healer of the family unit. These are Medicine Men and Women of the Native American Church who focus their ceremonial healing in family issues and in healing the values of family life.</li></strong><br />
                        <strong><li>As a Healer of the community. These are Medicine Men and Women of the Native American Church whose focus is more toward building up the Chapters, Communities, and so forth.</li></strong><br />
                        <strong><li>As a Healer of Society. These are Medicine Men and Women of the Native American Church that focus on repairing social systems or situations.</li></strong><br />
                        <strong><li>As a Healer of the Planet. These are Medicine Men and Women of the Native American Church whose focus is on restoring sustainable care of our Earth Mother and to educate others in the responsible use of her resources.</li></strong><br />
                    </ol><br />
                    <p>Membership in the New Haven Native American Church is permanent, meaning once an individual is a member of the Church Family, they can only be removed by their own personal request or by a serious infraction against the Church's Constitution or Ethical Code of Conduct.  This practice of "Making Relations" or "Spiritual Adoption" is an ancient religious practice and should be taken seriously. This is the same principle that that Chief Joseph became Chief of the Nez Perce People, even though by today's accepted or legal standards, he could not be considered Nez Perce.  Because of this ancient practice, Chief Joseph's signature was accepted as authoritative by the United States Federal Government in the Nez Perce Treaty.</p><br />
                    <p>The Native American Church has been recognized by the High Court as an "other organized group or community" of Indians and therefore all members of the Native American Church are legally defined as "Indians" even though they may not be enrolled members or recognized by any Tribe or Band.  Also, the United Nations Declaration on the Rights of Indigenous Peoples states in Article 33 section one, "Indigenous peoples have the right to determine their own identity or membership in accordance with their customs and traditions."</p><br />
                    <p>There are many benefits, including legal ones, in becoming Spiritually Adopted, and any person of any ethnic background may request adoption if they have sincerity of belief.  (Read more about the legal benefits under the "EDUCATION" tab above.)  To be a "Member of Good Standing", one must be willing to make the following Declarations of Intention, as Covenant Obligations, which are described in the following:</p><br />
                    <h3>Declarations:</h3>
                    <ol>
                        <strong><li>It is my belief that Natural Medicine is a part of my established freedom to practice my Religion.</li></strong><br />
                        <strong><li>I will follow the practice of "First, Do Good" and I will, to the best of my ability, make this the guiding practice of my Healing Ministry.</li></strong><br />
                        <strong><li>For my development as a Healing Minister, I will faithfully study traditional healing methods and work to become educated in the various materials suggested by the President of the New Haven Native American Church. </li></strong><br />
                        <strong><li>I will donate from my surplus, as the Spirit directs, to the Church so that the Ministry of the Church may move forward and become fully established in all areas of the world.  (The Church does not have a paid clergy so all donations go to building up the Church and giving greater support to its members.)</li></strong><br />
                        <strong><li>I will strive to establish a Native American Church Chapter in my area, if none is already present, and I will dedicate time, talent and resources, as suggested to me by the Spirit, to forward the purpose of that Chapter.</li></strong><br />
                    </ol><br />
                    <p>Covenant Obligations are the foundation of furthering the New Haven Native American Church's Ministry and Healing the World depends upon your faithfulness. If you feel that you can be true to the Declarations and can place yourself in at least one category above, then your request for Spiritual Adoption will be approved.</p><br />
                </div>  
                <React.Fragment>
                        <form className="signup_form" onSubmit={this.onSubmit}>
                            <div className="top_div center_text">
                                <h2>Adoption form</h2>
                                <p>Pay what you'd like. Join our church today!</p>
                            </div>
                            <fieldset className="signup_fieldset">
                                <div className="signup_fields">
                                    <label htmlFor="firstName">First Name</label><br />
                                    <input className="signup_input" type="text" id="firstName" name="first_name" placeholder="First Name" /><br />
                                    <label htmlFor="lastName">Last Name</label><br />
                                    <input className="signup_input" type="text" id="lastName" name="last_name" placeholder="Last Name" /><br />
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
                                    <label htmlFor="address">Physical Address</label><br />
                                    <input className="signup_input" type="text" name="street" id="streetId" placeholder="Building number, Street name, Apartment ID" />
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
                                    <input type="text" name="zip" id="zipId" placeholder="Zip" /><br />
                                </div>
                                <div className="signup_fields">
                                    <label htmlFor="securityQuestion">Select your security question here</label><br />
                                    <select id="securityQuestion" name="security_question">
                                    <option>Choose a security question</option>
                                        <option value="question_1">What is your favorite car?</option>
                                        <option value="question_2">What city were you born in?</option>
                                        <option value="question_3">What is your favorite color?</option>
                                    </select><br />  
                                </div>
                                <div className="signup_fields">
                                    <label htmlFor="securityAnswer">Type your security answer here</label><br />
                                    <input className="signup_input" type="text" id="securityAnswer" name="security_answer" placeholder="Type your security answer here" /><br />       
                                </div>
                                <div className="signup_fields">
                                    <label htmlFor="password">Password</label><br />
                                    <input className="signup_input" type="password" id="password" name="password" placeholder="Password" /><br />                   
                                    <label htmlFor="confirm_password">Confirm Password</label><br />
                                    <input className="signup_input" type="password" id="confirmPassword" name="confirm_password" placeholder="Confirm Password" /><br />    
                                </div>
                                {/* Code snippet for newsletter checkbox, which is currently an unavailable feature in the beta release. - Zane */}
                                {/*<div className="signup_fields">
                                    <div className="newsletter_div center_text">
                                        <input type="checkbox" id="newsletter" name="newsletter" />
                                        <label className="center_text" htmlFor="newsletter">Check this box to sign up for our newsletter</label><br />
                                    </div>
                                </div>*/}
                                {/* Insert e-signature widget here. */}
                                <div className="signup_fields">
                                    <label htmlFor="redeemableCode">Redeemable Code</label><br />
                                    <input className="signup_input" type="text" id="redeemableCode" name="redeemable_code" placeholder="Redeemable Code" /><br />          
                                </div>
                                <div className="signup_fields">
                                    <label className="center_text" htmlFor="payment">Pay Us What You'd Like</label><br />
                                    <input className="signup_input" type="string" id="payment" name="payment" placeholder="0" defaultValue="$0.00"/><br />
                                    <div className="pay_buttons_div">
                                        <button className="pay_button" type="button" value="1" onClick={() => { document.getElementById("payment").value = "$1.00"} }>$1</button>
                                        <button className="pay_button" type="button" value="5" onClick={() => { document.getElementById("payment").value = "$5.00"} }>$5</button>
                                        <button className="pay_button" type="button" value="10" onClick={() => { document.getElementById("payment").value = "$10.00"} }>$10</button>
                                        <button className="pay_button" type="button" value="20" onClick={() => { document.getElementById("payment").value = "$20.00"} }>$20</button>
                                    </div>
                                </div>
                                <div className="signup_fields">
                                    <div className="pay_with_div center_text">
                                        <button className="paypal_btn" type="submit">Pay with PayPal</button>
                                        {/* Code snippet for bitcoin payment option, which is currently an unavailable feature in the beta release. - Zane */}
                                        {/*<p>Or</p>
                                        <button className="bitcoin_btn" type="submit">Pay with Bitcoin</button>*/}
                                    </div>
                                </div>
                                <div className="signup_fields agreement_div">
                                    <div className="newsletter_div center_text">
                                        <input type="checkbox" id="agreement" name="agreement" />
                                        <label className="center_text" htmlFor="agreement">&nbsp;I agree to the <b>Adoption Agreement</b> and <Link to="/terms_of_service" target="_blank">Terms Of Service</Link>.</label><br />
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                </React.Fragment>
            </React.Fragment> 
        );
    }
}

// PropTypes for jest testing in App.test.js
SignUp.propTypes = {
    geoDataExists: PropTypes.bool.isRequired,
    setGeoDataExists: PropTypes.func.isRequired,
    emailIsValid: PropTypes.func.isRequired,
    reviseName: PropTypes.func.isRequired
}