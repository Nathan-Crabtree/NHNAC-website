import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//import axios from 'axios';

export default class SignUp extends Component {

    constructor() {
        super();
        this.state = {
            errorsThatExist: [],
            hasReedemableCode: false,
            listenerRemoved: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * An event handler that prevents default action (page refresh), 
     * checks to see if all values are fit for submission.
     * Submits and conditionally redirects to profile page or to PayPal website 
     * according to payment status.
     *
     * NOTE: Could be further refactored to reduce runtime. - Zane
     *
     * @param {object} event
     * @returns {boolean} false
     */
    onSubmit(event) {
        const target = event.target || event.srcElement;
        let submit = document.querySelector(".signup_form #submit");

        // Use IE5-8 fallback if event object not present
        if (!event) {
            event = window.event;
        }

        console.log("onSubmit() called");
        event.preventDefault();

        let firstName = target.first_name.value;
        let revisedFirstName = [];
        let nickName = target.nick_name.value;
        let revisedNickName = [];
        let lastName = target.last_name.value;
        let nameArray = [firstName, nickName, lastName];
        //let chapterID = 1;
        let revisedLastName = [];
        let email = target.email.value;
        const birthday = target.birthday.value;
        const gender = target.gender.value;
        let street = target.street.value;
        const country = target.country.value;
        const state = target.state.value;
        const city = target.city.value;
        let zip = target.zip.value.toString();
        let addressArray = [street, zip];
        const securityQuestion = target.security_question.value;
        let securityAnswer = target.security_answer.value;
        const password = target.password.value;
        const confirmPassword = event.target.confirm_password.value;
        //let redeemableCode = target.redeemable_code.value;
        //const payment = parseInt(target.payment.value.split("").filter(string => string !== "$").join(""));

        // Check if birthday and current date match variables
        const date = new Date();
        const currentDate = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
        const birthYear = parseInt(birthday[0] + birthday[1] + birthday[2] + birthday[3]);
        const birthMonth = parseInt(birthday[5] + birthday[6]);
        const birthDay = parseInt(birthday[8] + birthday[9]);
        const checkYears = birthYear <= currentDate[0];
        const checkMonths = birthMonth <= currentDate[1];
        const checkDays = birthDay <= currentDate[2];
        const checkDates = this.props.checkDates(checkYears, checkMonths, checkDays, birthYear, birthMonth, currentDate[0], currentDate[1]);

        // Array of form input IDs
        const formInputIds = ["firstName", "lastName", "email", "birthday", "gender", "streetId", "countryId", "stateId", "cityId", "zipId",
            "securityQuestion", "securityAnswer", "password", "payment"];

        // Create error array
        let error = [];
        for (let input = 0; input < 11; input++) {
            error[input] = document.createElement('p');
        }

        // Change border color of all input and select tags back to normal
        for (let id = 0; id < formInputIds.length; id++) {
            this.props.changeBorderColor(formInputIds[id]);
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

        firstName = this.props.sanitizeInput(firstName);
        nickName = this.props.sanitizeInput(nickName);
        lastName = this.props.sanitizeInput(lastName);

        // Check if first name, nick name and last name exist
        if (firstName.length === 0 || lastName.length === 0) {
            if (!errorsThatExist[0]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[0];
                const inputFirstName = document.getElementById("firstName");
                const inputLastName = document.getElementById("lastName");
                error[0].innerText = '*Please enter both your first and last name.';
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
            firstName = this.props.reviseName(firstName, revisedFirstName, "firstName", true);
        }
        if (nickName.length > 0) {
            nickName = this.props.reviseName(nickName, revisedNickName, "nickName", true);
        }
        if (lastName.length > 0) {
            lastName = this.props.reviseName(lastName, revisedLastName, "lastName", true);
        }

        // Check for valid email input and if it's already in use
        if (!(this.props.emailIsValid(email))) {
            if (!errorsThatExist[1]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[1];
                const input = document.getElementById("email");
                error[1].innerText = '*Please enter a valid email address.';
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
                    error[1].innerText = '*Email address already exists.';
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
        if (birthday === "" || !checkDates) {
            if (!errorsThatExist[2]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[2];
                const input = document.getElementById("birthday");
                error[2].innerText = '*Please select a birthday that is under the current date.';
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
                error[3].innerText = '*Please select a gender.';
                error[3].className = "error_3";
                error[3].style.fontSize = '.9rem';
                error[3].style.color = '#C31F01';
                formField.appendChild(error[3]);
                input.style.borderColor = '#C31F01';
                errorsThatExist[3] = true;
            }
        }

        street = this.props.sanitizeInput(street);
        zip = this.props.sanitizeInput(zip);

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
                error[4].innerText = '*Please enter or select a value in all address-related fields.';
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
        } else if (street.length > 150) {
            // Render error text and change boolean
            const formField = document.getElementsByClassName("signup_fields")[4];
            const inputStreet = document.getElementById("streetId");
            error[4].innerText = '*Please enter a value in the "street" field less than 150 characters.';
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

        // Check for security question selection
        if (securityQuestion === "Choose a security question") {
            if (!errorsThatExist[5]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[5];
                const input = document.getElementById("securityQuestion");
                error[5].innerText = '*Please select a security question.';
                error[5].className = "error_5";
                error[5].style.fontSize = '.9rem';
                error[5].style.color = '#C31F01';
                formField.appendChild(error[5]);
                input.style.borderColor = '#C31F01';
                errorsThatExist[5] = true;
            }
        }

        securityAnswer = this.props.sanitizeInput(securityAnswer);

        // Check for security answer input
        if (securityAnswer === "" || securityAnswer.length > 150) {
            if (!errorsThatExist[6]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[6];
                const input = document.getElementById("securityAnswer");
                error[6].innerText = '*Please enter a security answer less than 150 characters.';
                error[6].className = "error_6";
                error[6].style.fontSize = '.9rem';
                error[6].style.color = '#C31F01';
                formField.appendChild(error[6]);
                input.style.borderColor = '#C31F01';
                errorsThatExist[6] = true;
            }
        }

        // NOTE: Password fields aren't being sanitized because they're being hashed/encoded. - Zane

        // Check if password fields match
        if (password !== confirmPassword || password === "" || password.length < 3 || password.length > 30) {
            if (!errorsThatExist[7]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[7];
                const inputPassword = document.getElementById("password");
                const inputConfirmPassword = document.getElementById("confirmPassword");
                if (password === "" || password.length < 3 || password.length > 30) {
                    error[7].innerText = '*Please enter a password between 3 and 30 characters.';
                }
                if (password !== confirmPassword) {
                    error[7].innerText = '*Your password inputs do not match.';
                }
                error[7].className = "error_7";
                error[7].style.fontSize = '.9rem';
                error[7].style.color = '#C31F01';
                formField.appendChild(error[7]);
                inputPassword.style.borderColor = '#C31F01';
                inputConfirmPassword.style.borderColor = '#C31F01';
                errorsThatExist[7] = true;
            }
        }

        // Input sanitization for redeemableCode
        // for (let inputIndex = 0; inputIndex < redeemableCode.length; inputIndex++) {
        //   if (redeemableCode[inputIndex] === "<") {
        //     redeemableCode = redeemableCode.replace(redeemableCode[inputIndex], "&lt");
        //   }
        //   if (redeemableCode[inputIndex] === ">") {
        //     redeemableCode = redeemableCode.replace(redeemableCode[inputIndex], "&gt");
        //   }
        //   if (redeemableCode[inputIndex] === "&") {
        //     redeemableCode = redeemableCode.replace(redeemableCode[inputIndex], "&amp;");
        //   }
        // }

        // Check for valid redeemable code input offered in promotional email
        // if (redeemableCode === "XGDV9DJZ") {
        //     this.setState({
        //         hasReedemableCode: true
        //     });
        // }

        // Check if pay field is greater than 0
        // NOTE: If new user has redeemable code, they can bypass having to pay
        if (payment === 0 && !this.state.hasReedemableCode) {
            if (!errorsThatExist[8]) {
                // Render error text and change boolean
                const formField = document.getElementsByClassName("signup_fields")[8];
                const input = document.getElementById("payment");
                error[8].innerText = '*Please enter a value greater than 0.';
                error[8].className = "error_8";
                error[8].style.fontSize = '.9rem';
                error[8].style.color = '#C31F01';
                formField.appendChild(error[8]);
                input.style.borderColor = '#C31F01';
                errorsThatExist[8] = true;
            }
        }

        // Check if any errors exists before sending data to API
        for (let errorNo = 0; errorNo < errorsThatExist.length; errorNo++) {
            if (errorsThatExist[errorNo]) {
                return false;
            }
        }

        // After-submit code
        // Disable submit button
        submit.disabled = true;
        submit.setAttribute("class", "disabled_btn");

        if (window.removeEventListener) { // If event listener supported
            // Remove pop-up warning of unsaved data if user attempts to leave page
            window.removeEventListener("beforeunload", this.props.displayUnloadMessage, false);
        } else {
            window.detachEvent("beforeunload", this.props.displayUnloadMessage);
        }

        this.setState({ listenerRemoved: true });

        /* let addressID = 0; //not sure if variable needs to be declared here
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
        }); */
    }

    componentDidMount() {
        // When component is rendered, bring user to top of page
        window.scrollTo(0, 0);

        // This script tag is important htmlFor sign-up form to work properly.
        // Provides country data htmlFor users to help insert exact address location.
        // Src: https://geodata.solutions
        if (!this.props.geoDataExists) {
            const script = document.createElement("script");

            script.src = "//geodata.solutions/includes/countrystatecity.js";
            script.async = true;
            script.className = "geodata_script";

            document.body.appendChild(script);

            this.props.setGeoDataExists();
        }

        if (window.addEventListener) { // If event listener supported
            // Add pop-up warning of unsaved data if user attemps to leave page
            window.addEventListener("beforeunload", this.props.displayUnloadMessage, false);
        } else {
            window.attachEvent("beforeunload", this.props.displayUnloadMessage, false);
        }

        this.setState({ listenerRemoved: false });
    }

    componentWillUnmount() {
        if (!this.state.listenerRemoved) {
            if (window.removeEventListener) { // If event listener supported
                // Remove pop-up warning of unsaved data if user attempts to leave page
                window.removeEventListener("beforeunload", this.props.displayUnloadMessage, false);
            } else {
                window.detachEvent("beforeunload", this.props.displayUnloadMessage);
            }
        }

        // Remove geodata script from DOM 
        if (this.props.geoDataExists) {
            const geoDataScript = document.getElementsByClassName('geodata_script')[0];

            geoDataScript.parentElement.removeChild(geoDataScript);
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
                                <input className="signup_input" type="text" id="firstName" name="first_name" maxLength="50" placeholder="First Name" /><br />
                                <label htmlFor="nickName">Nick Name</label><br />
                                <input className="signup_input" type="text" id="nickName" name="nick_name" maxLength="50" placeholder="Nick Name" /><br />
                                <label htmlFor="lastName">Last Name</label><br />
                                <input className="signup_input" type="text" id="lastName" name="last_name" maxLength="50" placeholder="Last Name" /><br />
                            </div>
                            <div className="signup_fields">
                                <label htmlFor="email">Email</label><br />
                                <input className="signup_input" type="text" id="email" name="email" maxLength="320" placeholder="Email" /><br />
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
                                <input className="signup_input" type="text" name="street" id="streetId" maxLength="150" placeholder="Building number, Street name, Apartment ID" />
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
                                <input type="text" name="zip" id="zipId" maxLength="10" placeholder="Zip" /><br />
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
                                <input className="signup_input" type="text" id="securityAnswer" name="security_answer" maxLength="150" placeholder="Type your security answer here" /><br />
                            </div>
                            <div className="signup_fields">
                                <label htmlFor="password">Password</label><br />
                                <input className="signup_input" type="password" id="password" name="password" minLength="3" maxLength="30" placeholder="Password" /><br />
                                <label htmlFor="confirm_password">Confirm Password</label><br />
                                <input className="signup_input" type="password" id="confirmPassword" name="confirm_password" minLength="3" maxLength="30" placeholder="Confirm Password" /><br />
                                <input onClick={this.props.showPassword} type="checkbox" id="showPassword" name="show_password" />
                                <label htmlFor="showPassword">Show password</label><br />
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
                                <input className="signup_input" type="text" id="redeemableCode" name="redeemable_code" maxLength="8" placeholder="Redeemable Code" /><br />
                            </div>
                            <div className="signup_fields">
                                <label className="center_text" htmlFor="payment">Pay Us What You'd Like</label><br />
                                <input className="signup_input" type="string" id="payment" name="payment" placeholder="0" defaultValue="$0.00" /><br />
                                <div className="pay_buttons_div">
                                    <button className="pay_button" type="button" value="1" onClick={() => { document.getElementById("payment").value = "$1.00" }}>$1</button>
                                    <button className="pay_button" type="button" value="5" onClick={() => { document.getElementById("payment").value = "$5.00" }}>$5</button>
                                    <button className="pay_button" type="button" value="10" onClick={() => { document.getElementById("payment").value = "$10.00" }}>$10</button>
                                    <button className="pay_button" type="button" value="20" onClick={() => { document.getElementById("payment").value = "$20.00" }}>$20</button>
                                </div>
                            </div>
                            <div className="signup_fields">
                                <div className="pay_with_div center_text">
                                    <button id="submit" className="paypal_btn" type="submit">Pay with PayPal</button>
                                    {/* Code snippet for bitcoin payment option, which is currently an unavailable feature in the beta release. - Zane */}
                                    {/*<p>Or</p>
                                        <button id="submit" className="bitcoin_btn" type="submit">Pay with Bitcoin</button>*/}
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

// PropTypes for jest testing
SignUp.propTypes = {
    geoDataExists: PropTypes.bool.isRequired,
    setGeoDataExists: PropTypes.func.isRequired,
    emailIsValid: PropTypes.func.isRequired,
    reviseName: PropTypes.func.isRequired,
    checkDates: PropTypes.func.isRequired,
    changeBorderColor: PropTypes.func.isRequired,
    sanitizeInput: PropTypes.func.isRequired,
    displayUnloadMessage: PropTypes.func.isRequired,
    showPassword: PropTypes.func.isRequired
}
