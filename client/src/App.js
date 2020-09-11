import React, { Component } from 'react';
import logo from './images/nhnac.png';
import fbLogo from './images/facebook.svg';
import hbIcon from './images/hamburger-icon.png';
import cross from './images/cross.png';
import './css/style.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import PrivacyPolicy from './components/PrivacyPolicy.js';
import { BrowserRouter, Route } from 'react-router-dom';  

class App extends Component {

  constructor() {
    super(); 
    this.resetToggleDisplay = this.resetToggleDisplay.bind(this);
  }
  
  /**
   * resetToggleDisplay() funcion - An event handler for whenever a link is clicked on phone,
   * the menu automatically disappears to avoid usage interference. 
   * 
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

  componentDidMount() {
    // This code allows all anchor tags to have the resetToggleDisplay() function implemented to 
    // remove any user interference from the nav menu in mobile mode.
    let links = document.getElementsByTagName("a");
    for (let link = 0; link < links.length; link++) {
      links[link].onclick = this.resetToggleDisplay();
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Header logo={logo} hbIcon={hbIcon} cross={cross} />
          <div className="page">
            <Route path="/privacy-policy" component={ () => <PrivacyPolicy resetToggleDisplay={this.resetToggleDisplay} />} />
          </div>
        <Footer fbLogo={fbLogo} />
      </BrowserRouter>
    );
  }
}

export default App;
