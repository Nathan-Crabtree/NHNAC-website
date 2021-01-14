import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ContentNav extends Component {

    render() {
        return(
            <nav className="content_nav">
                <div>
                    <ul className="header_links">
                        <li><Link to="/content?header=news&top_aside=calendar&bottom_aside=events" onClick={ () => {this.props.setStateHandler()}}>News</Link></li>
                        <li className="vertical_bar">|</li>
                        <li><Link to="/content?header=articles&top_aside=archive&bottom_aside=most_viewed" onClick={ () => {this.props.setStateHandler()}}>Articles</Link></li>
                        <li className="vertical_bar">|</li>
                        <li><Link to="/content?header=updates&top_aside=archive&bottom_aside=popular" onClick={ () => {this.props.setStateHandler()}}>Updates</Link></li>
                        <li className="vertical_bar">|</li>
                        <li><Link to="/content?header=blogs&top_aside=archive&bottom_aside=most_viewed" onClick={ () => {this.props.setStateHandler()}}>Blogs</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}