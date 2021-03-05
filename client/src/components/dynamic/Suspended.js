import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import queryString from 'query-string';

export default class Suspended extends Component {

    constructor() {
        super();
        this.state = {
            dateAccountSuspended: '2021-01-15',
            currentDate: new Date()
        }
        this.countDaysLeft = this.countDaysLeft.bind(this);
    }

    /**
     * countDaysLeft() function - Takes converted versions of dateAccountSuspended and currentDate to find the number of 
     * days left for the user.
     * NOTE: Chunks of this code were copied from 
     * https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/. - Zane
     * 
     */
    countDaysLeft() {
        // Convert dateAccountSuspended into MM/DD/YYYY form.
        let tempArray = this.state.dateAccountSuspended.split("");
        let revisedDateAccountSuspended = `${tempArray[5]}${tempArray[6]}/${tempArray[8]}${tempArray[9]}/${tempArray[0]}${tempArray[1]}${tempArray[2]}${tempArray[3]}`;

        // Convert currentDate into MM/DD/YYYY form.
        let currentMonth;
        if (this.state.currentDate.getMonth() <= 9) {
            currentMonth = `0${this.state.currentDate.getMonth() + 1}`;    
        } else {
            currentMonth = this.state.currentDate.getMonth() + 1;
        }
        let revisedCurrentDate = `${currentMonth}/${this.state.currentDate.getDate()}/${this.state.currentDate.getFullYear()}`;

        // Store revisedCurrentDate and revisedDateAccountSuspended into Date objects.
        let suspendedDate = new Date(revisedDateAccountSuspended);
        let currentDate = new Date(revisedCurrentDate);

        // To calculate the time difference of two dates. 
        var differenceInTime = currentDate.getTime() - suspendedDate.getTime(); 
        
        // To calculate the no. of days between two dates. 
        var differenceInDays = differenceInTime / (1000 * 3600 * 24); 

        // Return the result if value is not null, else reset user's suspension and warning data.
        if (differenceInDays > 0) {
            return differenceInDays;
        } else {
            // Reset user's suspension and warning data. 
            
            // Set this.state.suspended in App.js to false and force a re-render.
        }

    }

    componentDidMount() {
        // When component is rendered, bring user to top of page.
        window.scrollTo(0, 0);

        this.countDaysLeft();
    }

    render() {
        return(
            <React.Fragment>
                <div className="MsoNormal"><strong><span>Your account has been temporarily suspended.</span></strong></div><br />
                <p>You will be able to use your account in <b>{ this.countDaysLeft() }</b> days.</p><br />
                <span className="resend_email_span">Want to learn more? <Link to="/community_guidlines_and_rules">Read our community guidelines and rules.</Link></span> 
            </React.Fragment>
        );
    }
}