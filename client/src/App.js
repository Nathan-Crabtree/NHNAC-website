import React, { Component } from 'react';
import logo from './images/nhnac.png';
import fbLogo from './images/facebook.svg';
import './css/style.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import PrivacyPolicy from './components/PrivacyPolicy.js';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header logo={logo} />
          <div className="page">
            <Route path="/privacy-policy" component={PrivacyPolicy} /> 
          </div>
        <Footer fbLogo={fbLogo} />
      </BrowserRouter>
    );
  }
}

export default App;
