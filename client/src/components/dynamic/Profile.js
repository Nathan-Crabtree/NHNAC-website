import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

// Import sub-components for dynamic rendering of profile page according to query string
import ProfileUser from './ProfileUser';
import ProfileViewer from './ProfileViewer';

export default class Profile extends Component {

    constructor() {
        super();
        this.state = {
            view: null,
            customize: null
        }
        this.displayViewComponent = this.displayViewComponent.bind(this);
    }

    /**
     * displayViewComponent() function - Grabs the "view" query string value and renders the proper component according to the view of profile.
     * 
     */
    displayViewComponent() {
        // Render proper component according to "type" string value
        switch(this.state.view) {
            case "user":
                return <ProfileUser apple={this.props.apple} book={this.props.book} twitterMini={this.props.twitterMini}
                fbMini={this.props.fbMini} instaMini={this.props.instaMini} profileImgLarge={this.props.profileImgLarge}
                profileImgSmall={this.props.profileImgSmall} badge={this.props.badge} messageIcon={this.props.messageIcon} 
                customize={this.state.customize} />
            case "viewer":
                return <ProfileViewer apple={this.props.apple} book={this.props.book} twitterMini={this.props.twitterMini}
                fbMini={this.props.fbMini} instaMini={this.props.instaMini} profileImgLarge={this.props.profileImgLarge}
                profileImgSmall={this.props.profileImgSmall} badge={this.props.badge} messageIcon={this.props.messageIcon} />
            default:
                break;
        }
    }

    componentDidMount() {
        const parsedQString = queryString.parse(this.props.location.search);

        // Change state value of query property to that of query string in URL
        this.setState({ view: parsedQString.view, customize: parsedQString.customize });

        // When component is rendered, bring user to top of page
        window.scrollTo(0, 0);
    }

    render() {
        return(
            <React.Fragment>
                { this.displayViewComponent() }
            </React.Fragment>
        );
    }
} 

// PropTypes for jest testing in App.test.js
Profile.propTypes = {
    apple: PropTypes.string.isRequired,
    book: PropTypes.string.isRequired,
    twitterMini: PropTypes.string.isRequired,
    fbMini: PropTypes.string.isRequired,
    instaMini: PropTypes.string.isRequired,
    profileImgLarge: PropTypes.string,
    profileImgSmall: PropTypes.string.isRequired,
    badge: PropTypes.string,
    messageIcon: PropTypes.string.isRequired
}