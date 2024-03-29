import React, { Component } from 'react';

export default class Error extends Component {

    constructor() {
        super();
        this.state = {
            error: { status: null, description: null }
        }
    }

    componentDidMount() {
        // When component is rendered, bring user to top of page
        window.scrollTo(0, 0);
    }

    render() {
        const {
            error
        } = this.state;

        return (
            <div>
                <p>Oops. There seems to be a problem with finding this page.</p>
                &nbsp;
                <p>Status: <b>{error.status}</b></p>
                &nbsp;
                <p className="error_description">Description: {error.description}</p>
            </div>
        );
    }
}
