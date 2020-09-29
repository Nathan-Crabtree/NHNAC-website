// Import React libraries
import React,{ Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 

// Import images
import logo from './images/header/nhnac.png';
import hbIcon from './images/header/hamburger_icon.png';
import cross from './images/header/cross.png';
import fbLogo from './images/facebook.svg';
import donate from './images/donate/donate.png';
import paypal from './images/donate/paypal.png';
import bitcoin from './images/donate/bitcoin-accepted.png';

// Import components
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import PrivacyPolicy from './components/PrivacyPolicy.js';
import TermsOfService from './components/TermsOfService.js';
import Error from './components/Error.js';
import FAQ from './components/FAQ.js';
import Donate from './components/Donate.js';
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';
import ForgotPassword from './components/ForgotPassword.js';

export default class App extends Component {

  constructor() {
    super(); 
    this.resetToggleDisplay = this.resetToggleDisplay.bind(this);
    this.removeNoJavaScriptDiv = this.removeNoJavaScriptDiv.bind(this);
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
   * NOTE: Causes App.test.js to fail "App render testing" test because it returns undefined. - Zane
   */
  removeNoJavaScriptDiv(className) {
    className.parentElement.removeChild(className);
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

    window.scrollTo(0, 0);
  }

  render() {
    return (
      <BrowserRouter>
        <Header logo={logo} hbIcon={hbIcon} cross={cross} />
        <div onClick={this.resetToggleDisplay}>
          <main>
            <Switch>
                <Route exact path="/privacy_policy" component={ () => <PrivacyPolicy />} />
                <Route exact path="/terms_of_service" component={ () => <TermsOfService />} />
                <Route exact path="/FAQ" component={ () => <FAQ />} />
                <Route exact path="/donate" component={ () => <Donate donate={donate} paypal={paypal} bitcoin={bitcoin} />} />
                <Route exact path="/login" component={ () => <Login />} />
                <Route exact path="/signup" component={ () => <SignUp />} />
                <Route exact path="/forgot_password" component={ () => <ForgotPassword />} />
                <Route component={Error} />
            </Switch>
          </main>
          <Footer fbLogo={fbLogo} />
        </div>
      </BrowserRouter>
    );
  }
}