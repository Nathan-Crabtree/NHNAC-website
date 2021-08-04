import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ContentNav extends Component {

    render() {
        return(
            <nav className="content_nav">
                <div>
                    <ul className="header_links">
                        <li><Link to="/content?header=news" onClick={ () => {this.props.setStateHandler()}}>News</Link></li>
                        <li className="vertical_bar">|</li>
                        <li><Link to="/content?header=articles" onClick={ () => {this.props.setStateHandler()}}>Articles</Link></li>
                        <li className="vertical_bar">|</li>
                        <li><Link to="/content?header=updates" onClick={ () => {this.props.setStateHandler()}}>Updates</Link></li>
                        <li className="vertical_bar">|</li>
                        <li><Link to="/content?header=blogs" onClick={ () => {this.props.setStateHandler()}}>Blogs</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

// PropTypes for jest testing in App.test.js
ContentNav.propTypes = {
    setStateHandler: PropTypes.func.isRequired
}