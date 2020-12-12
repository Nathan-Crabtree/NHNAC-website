// Import React libraries
import React,{ Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import $ from 'jquery';

// Import images
import logo from './images/header/nhnac.png';
import hbIcon from './images/header/hamburger_icon.png';
import fbLogo from './images/facebook.svg';
import donate from './images/donate/donate.png';
import paypal from './images/donate/paypal.png';
import bitcoin from './images/donate/bitcoin-accepted.png';
import indian from './images/about/indian.png';
import tribe from './images/about/tribe.jpeg';

// Import components
import { Footer, PrivacyPolicy, TermsOfService, FAQ, 
         Donate, SignUp, About, Constitution, 
         LegalRights, Adoption, CodeOfConduct 
        } from './components/static/Static.js';
import Header from './components/Header.js';
import Error from './components/Error.js';
import Login from './components/Login.js';
import ForgotPassword from './components/ForgotPassword.js';
import Verification from './components/Verification.js';
import ConstitutionPdf from './components/documents/new_haven_constitution.pdf';
import CodeOfConductPdf from './components/documents/ethical_code_of_conduct.pdf';

export default class App extends Component {

  constructor() {
    super(); 
    this.state = {
      geoDataExists: false
    }
    this.setGeoDataExists = this.setGeoDataExists.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetToggleDisplay = this.resetToggleDisplay.bind(this);
    this.removeNoJavaScriptDiv = this.removeNoJavaScriptDiv.bind(this);
    this.emailIsValid = this.emailIsValid.bind(this);
    this.reviseName = this.reviseName.bind(this);
  }
  
  /**
   * setGeoDataExists() function - Switches boolean value of this.state.geoDataExists
   */
  setGeoDataExists = () => {
    this.setState({ geoDataExists: true });
  }

  /**
   * onSubmit() function - An event handler that prevents default action (page refresh) 
   * and console logs name and email values.
   * 
   * @param {object} event 
   */
  onSubmit = (event) => {
    event.preventDefault(event);
    console.log(event.target.name.value);
    console.log(event.target.email.value);
  }

  /**
   * resetToggleDisplay() funcion - An event handler for whenever a link is clicked on phone,
   * the menu automatically disappears to avoid usage interference.
   */
  resetToggleDisplay() {
    if (window.outerWidth <= 375) {
      const hamburgerIcon = document.getElementsByClassName("hamburger_icon")[0];
      const navDiv = document.getElementsByTagName("div")[1];
      const body = document.getElementsByTagName("body")[0];
      const main = document.getElementsByTagName("main")[0];
      const footer = document.getElementsByTagName("footer")[0];
      
      // Change hamburgerIcon's display to block;
      hamburgerIcon.style.display = "block";
      
      // Change navDiv margin and transition settings.
      navDiv.style.marginTop = "-485.72px";
      navDiv.style.transition = "margin-top 0s";

      // Set body overflow style property to scroll
      body.style.overflow = "scroll";

      // Set page-content brightness style property back to 100% and remove the style attribute.
      main.style.filter = "brightness(100%)";
      main.removeAttribute("style");
      
      // Set footer brightness style property back to 100% and remove the style attribute.
      footer.style.filter = "brightness(100%)";
      footer.removeAttribute("style");
    }
  }

  /**
   * removeNoJavaScriptDiv() funcion - Remove "noJavaScriptDiv" <div> tag because JavaScript works in browser.
   * UPDATE: jQuery solved the "App render testing" test issue in App.test.js by having the document load first before changing the styling. - Zane
   *
   * @param {string} className 
   */
  removeNoJavaScriptDiv(className) {
    $(function() {
      className.style.display = "none";
    });
  }

  /**
   * emailIsValid() function - Checks for valid email input.
   * Source: https://ui.dev/validate-email-address-javascript/
   * 
   * @param {string} email 
   */
  emailIsValid (email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * reviseName() function - this function takes a string and capitalizes the first letter of the string and puts into a new array.
   * Useful for correcting name-related values inserted in forms by user.
   * 
   * @param {string} name, @param {array} revisedName
   */
  reviseName(name, revisedName) {

      // Capitalize the first letter of the name and insert into revised array
      for (let letter = 0; letter < name.length; letter++) {
          if (letter === 0) {
              revisedName.push(name[letter].toUpperCase());
          } else {
              revisedName.push(name[letter]);
          }
      }

      document.getElementById(name.toString()).value = revisedName.join("");
  }

  componentDidMount() {
    let noJavaScriptDiv = document.getElementsByClassName("no_javascript_div")[0];
    let links = document.getElementsByTagName("a");

    // Remove "noJavaScriptDiv" <div> tag because JavaScript works in browser.
    this.removeNoJavaScriptDiv(noJavaScriptDiv);

    // This code allows all <a> tags to have the resetToggleDisplay() function implemented to 
    // remove any user interference from the nav menu in mobile mode.
    for (let link = 0; link < links.length; link++) {
      links[link].onclick = this.resetToggleDisplay();
    }

    // When component is rendered, bring user to top of page.
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <BrowserRouter>
        <Header logo={logo} hbIcon={hbIcon} />
        <div onClick={this.resetToggleDisplay}>
          <main>
            <Switch>
                <Route exact path="/privacy_policy" component={ () => <PrivacyPolicy />} />
                <Route exact path="/terms_of_service" component={ () => <TermsOfService />} />
                <Route exact path="/FAQ" component={ () => <FAQ />} />
                <Route exact path="/donate" component={ () => <Donate donate={donate} paypal={paypal} bitcoin={bitcoin} />} />
                <Route exact path="/login" component={ () => <Login />} />
                <Route exact path="/signup" component={ () => <SignUp geoDataExists={this.state.geoDataExists} emailIsValid={this.emailIsValid} 
                setGeoDataExists={this.setGeoDataExists} reviseName={this.reviseName}/>} />
                <Route exact path="/forgot_password" component={ () => <ForgotPassword />} />
                <Route exact path="/verification" component={ () => <Verification />} />
                <Route exact path="/about" component={ () => <About indian={indian} tribe={tribe} emailIsValid={this.emailIsValid} reviseName={this.reviseName} />} />
                <Route exact path="/constitution" component={ () => <Constitution ConstitutionPdf={ConstitutionPdf} />} />
                <Route exact path="/adoption_agreement" component={ () => <Adoption /> } />
                <Route exact path="/ethical_code_of_conduct" component={ () => <CodeOfConduct CodeOfConductPdf={CodeOfConductPdf} /> } />
                <Route exact path="/legal_rights" component={ () => <LegalRights /> } />
                <Route component={Error} />
            </Switch>
          </main>
          <Footer fbLogo={fbLogo} onSubmit={this.onSubmit} emailIsValid={this.emailIsValid} />
        </div>
      </BrowserRouter>
    );
  }
}