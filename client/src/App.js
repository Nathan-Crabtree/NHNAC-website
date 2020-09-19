// Import React libraries
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 

// Import images
import logo from './images/nhnac.png';
import fbLogo from './images/facebook.svg';
import hbIcon from './images/hamburger-icon.png';
import cross from './images/cross.png';

// Import components
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import PrivacyPolicy from './components/PrivacyPolicy.js';
import TermsOfService from './components/TermsOfService.js';
import Error from './components/Error.js';

class App extends Component {

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
      const hamburgerIcon = document.getElementsByClassName("hamburger-icon")[0];
      const navDiv = document.getElementsByTagName("div")[1];
      
      // Change hamburgerIcon's display to block; change navDiv and headerLinks display to none.
      hamburgerIcon.style.display = "block";
        
      // Change navDiv margin and transition settings.
      navDiv.style.marginTop = "-485.72px";
      navDiv.style.transition = "margin-top 0s";
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
    let noJavaScriptDiv = document.getElementsByClassName("noJavaScriptDiv")[0];
    let links = document.getElementsByTagName("a");

    // Remove "noJavaScriptDiv" <div> tag because JavaScript works in browser.
    this.removeNoJavaScriptDiv(noJavaScriptDiv);

    // This code allows all <a> tags to have the resetToggleDisplay() function implemented to 
    // remove any user interference from the nav menu in mobile mode.
    for (let link = 0; link < links.length; link++) {
      links[link].onclick = this.resetToggleDisplay();
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Header logo={logo} hbIcon={hbIcon} cross={cross} />
          <div className="page">
            <Switch>
              <Route exact path="/privacy-policy" component={ () => <PrivacyPolicy resetToggleDisplay={this.resetToggleDisplay} />} />
              <Route exact path="/terms-of-service" component={ () => <TermsOfService resetToggleDisplay={this.resetToggleDisplay} />} />
              <Route component={Error} />
            </Switch>
          </div>
        <Footer fbLogo={fbLogo} />
      </BrowserRouter>
    );
  }
}

export default App;