import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Container from '../Container';

export default class ProfileUser extends Component {

    constructor() {
        super();
        this.state = {
            collapsedTables: [],
            key: 0,
            clickedDataTable: null
        }
        this.displayForm = this.displayForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.collapseDataTable = this.collapseDataTable.bind(this);
        this.expandDataTable = this.expandDataTable.bind(this);
        this.displayCollapsedDataTableHeaderAndExpandBtn = this.displayCollapsedDataTableHeaderAndExpandBtn.bind(this);
        this.resizeDataTable = this.resizeDataTable.bind(this);
        this.customizePage = this.customizePage.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
    }

    /**
     * displayForm() function - Shows the section's form that the comment belongs to and hides the associated "edit" button.
     * 
     */
    displayForm() {
        document.getElementsByClassName("status_form")[0].style.display = "block";
        document.getElementsByClassName("edit_status_btn")[0].style.display = "none";
        document.getElementsByClassName("status_p")[0].style.display = "none";
    }

    /**
     * hideForm() function - Hides the section's form that the comment belongs to and shows the associated "edit" button.
     * 
     */
    hideForm() {
        document.getElementsByClassName("status_form")[0].style.display = "none";
        document.getElementsByClassName("edit_status_btn")[0].style.display = "block";
        document.getElementsByClassName("status_p")[0].style.display = "block";
    }

    /**
     * onSubmit() function - Takes status content submitted from user and sends to API and then gets added to database; 
     * the page is then refreshed to include the new status.
     * 
     * @param {object} e  
     * 
     */
    onSubmit(e) {
        e.preventDefault();
        console.log(e.target.status.value);
    }

    /**
     * collapseDataTable() function - Collapses the Table associated with "className" and replaces it with tableHeader
     * and the option to expand it in section with class "proflie_container1_section_container2".
     * 
     * @param {string} className, @param {string} tableHeader 
     */
    collapseDataTable(className, tableHeader) {
        const expandedTable = document.getElementsByClassName(className)[0];
        const newJSX = this.displayCollapsedDataTableHeaderAndExpandBtn(className, tableHeader, this.state.key);

        expandedTable.style.resize = "none";
        expandedTable.style.display = "none";

        // Src: https://stackoverflow.com/questions/37435334/correct-way-to-push-into-state-array - Zane
        const joined = this.state.collapsedTables.concat(newJSX);
        this.setState({ collapsedTables: joined });        

        // Increment the value of key to have it remain unique for the next array value
        const newKey = this.state.key + 1;
        this.setState({ key: newKey });
    }

    /**
     * expandDataTable() function - Expands the Table associated with "className" and removes table's
     * header and the option to expand it in section with class "proflie_container1_section_container2" via popping
     * it out of the collapsedTables array.
     * 
     * @param {string} className  
     */
    expandDataTable(className) {
        const collapsedTable = document.getElementsByClassName(className)[1];

        collapsedTable.style.resize = "vertical";
        collapsedTable.style.display = "block";

        // Search array for correlated child component to pop
        for (let collapsedTable = 0; collapsedTable < this.state.collapsedTables.length; collapsedTable++) {
            if (this.state.collapsedTables[collapsedTable].props.className === className) {
                // Src: https://stackoverflow.com/questions/36326612/delete-item-from-state-array-in-react - Zane
                var array = [...this.state.collapsedTables]; // make a separate copy of the array
                array.pop(collapsedTable);
                this.setState({collapsedTables: array});
            }
        }
    }

    /**
     * displayCollapsedDataTableHeaderAndExpandBtn() function - Once collapseDataTable() has been called, displayCollapsedDataTableHeaderAndExpandBtn()
     * will be called with it and render within the DOM some JSX correlating to the collapsed table allowing to expand it once again. A unique 
     * key is also generated for the component within the array.
     * 
     * @param {string} className, @param {string} tableHeader, @param {integer} key  
     */
    displayCollapsedDataTableHeaderAndExpandBtn(className, tableHeader, key) {
        return <div key={key} className={className}>
            <p>{ tableHeader }</p>
            <button onClick={ () => { this.expandDataTable(className) } } className="text_btn" type="button"><b>expand</b></button>
        </div>;
    }

    /**
     * resizeDataTable() function - Checks to see if user has resized the selected data table. Will automatically change the 
     * styling to a medium or large height setting.
     * 
     * @param {string} id
     */
    resizeDataTable(id) {
        const idStyleHeight = parseInt(document.getElementById(id).style.height);
        if (idStyleHeight > 397.81) {
            document.getElementById(id).style.height = "795.62px";
        } else {
            document.getElementById(id).style.height = "397.81px";
        };
    }

    /**
     * customizePage() function - Allows user to collapse, resize, and move around their data tables for desired settings.
     * When completed, user will click "Save Settings" which will send preference data to the API and reload the page showing 
     * the new preferred settings.
     * 
     */
    customizePage() {
        // Replace "Customize Page" with "Save Settings"
        document.getElementsByClassName("text_btn")[1].style.display = "none"; 
        document.getElementsByClassName("text_btn")[2].style.display = "block"

        // Edit the styling of all data tables to show buttons and allow customization.
        // Utilizing the Drag and Drop API.
        // Src: https://www.youtube.com/watch?v=OHTudicK7nY - Zane
        let dataTables = [];
        dataTables[0] = document.querySelector("#profileContainer1SectionContainer3");
        dataTables[1] = document.querySelector("#profileContainer1SectionContainer4");
        dataTables[2] = document.querySelector("#profileContainer2SectionContainer1");
        dataTables[3] = document.querySelector("#profileContainer2SectionContainer2");
        dataTables[4] = document.querySelector("#profileContainer2SectionContainer3");
        dataTables[5] = document.querySelector("#profileContainer2SectionContainer4");

        for (let dataTable = 0; dataTable < dataTables.length; dataTable++) {
            dataTables[dataTable].addEventListener("dragstart", e => {
                e.dataTransfer.setData("text/plain", dataTables[dataTable].id);
                this.setState({ clickedDataTable: dataTables[dataTable] });
                this.state.clickedDataTable.classList.add("table--clicked");
            });

            // Setting the display style of data table's resizing feature and collapse link to block
            dataTables[dataTable].children[0].style.display = "block";
            dataTables[dataTable].style.resize = "vertical";
        }

        for (const dropZone of document.querySelectorAll(".profile_drop_zone")) {
            // When draggable element is over a drop zone
            dropZone.addEventListener("dragover", e => {
                e.preventDefault();
                dropZone.classList.add("profile_drop_zone--over");
                if (dropZone.children.length < 1) {
                    dropZone.classList.add("profile_drop_zone--empty");
                }
            });

            // When draggable element is no longer over drop zone
            dropZone.addEventListener("dragleave", e => {
                dropZone.classList.remove("profile_drop_zone--over");
                dropZone.classList.remove("profile_drop_zone--empty");
            });

            // When draggable element is dropped onto drop zone
            dropZone.addEventListener("drop", e => {
                e.preventDefault();

                const droppedElementId = e.dataTransfer.getData("text/plain");
                const droppedElement = document.getElementById(droppedElementId);

                if (dropZone.children.length < 1) {
                    dropZone.appendChild(droppedElement);
                }

                dropZone.classList.remove("profile_drop_zone--over");
                dropZone.classList.remove("profile_drop_zone--empty");
                this.state.clickedDataTable.classList.remove("table--clicked");
            });
        }
    }

    /**
     * saveSettings() function - Checks the styling of each data table to see if there are any changes made by user in order to 
     * update the preference data to the API and reload the page.
     * 
     */
    saveSettings() {
        // Check the styling of each data table to see if any changes need to made for user's preference data on back-end
        
        // Force reload the page to show new settings and revert changed styling
        window.location.href = '/profile?userid=1&view=user';
    }

    componentDidMount() {
        if (this.props.customize === "true") {
            this.customizePage();
        }
    }

    render() {
        return(
            <React.Fragment>
                <div className="profile_container1">
                    <div>
                        <div>
                            <img className="profile_img_large" srcSet={this.props.profileImgLarge} alt="Portrait of user." />
                            <button onClick={ () => { window.location.href="/account_settings?userid=1&edit_profile_pic=true" } } type="button">Edit Profile Picture</button>
                        </div>
                        <section>
                            <h2>Harper "Kiss" Young</h2>
                            <p>Tier: </p>
                            <p>Points: </p>
                            <p>Age: </p>
                            <p>Student <img srcSet={this.props.apple} alt="Student account displayed by apple." /></p>
                            <div>
                                <p className="status_p">Status: none</p>
                                <form id="status" className="status_form" onSubmit={ this.onSubmit }>
                                    <fieldset>
                                        <div className="status_form_field">
                                            <label htmlFor="status">Status</label>
                                            <svg onClick={ () => { this.hideForm() } } className="_modal-close-icon" viewBox="0 0 40 40">
                                                <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                            </svg><br />
                                            <textarea className="login_input" type="text" id="status_textarea" name="status" readOnly maxLength="32" value="Lorem ipsum dolor sit amet, cons" /><br />
                                        </div>
                                        <button className="submit_btn submit_padding" type="submit">Submit</button>
                                    </fieldset>
                                </form>
                                <button onClick={ () => { this.displayForm() } } className="edit_status_btn text_btn" type="button"><b>edit</b></button>
                            </div>
                            <div className="clear"></div>
                            <Link to="/account_settings?userid=1&edit_profile_pic=false">Account Settings</Link><br />
                            <button onClick={this.customizePage} className="text_btn" type="button"><b>Customize Page</b></button>
                            <button onClick={this.saveSettings} className="text_btn" type="button"><b>Save Settings</b></button>
                            <div>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/"><img srcSet={this.props.instaMini} alt="Author's instagram link." /></a>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.twitter.com/"><img srcSet={this.props.twitterMini} alt="Author's twitter link." /></a>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/"><img srcSet={this.props.fbMini} alt="Author's facebook link." /></a>
                            </div>
                        </section>
                    </div>
                    {/* This button needs to link to a specific URL generated by a function that checks the most recent course being worked on by the user. - Zane */}
                    <button className="paypal_btn" type="button"><h4>Go to current course: <br />Course Name (50% complete)</h4></button>
                    <section className="profile_container1_section_container2">
                        <Link to="/direct_message?senderid=1&receiverid=null">Messages (1)</Link><br />
                        <Container onSubmit={ () => {} } triggerText="Connections" profileImgSmall={this.props.profileImgSmall} messageIcon={this.props.messageIcon} /><br />
                        <Link to="/id_request?userid=1">Request new ID card</Link><br />
                        <Link to="/download_archive?userid=1">Download archive</Link><br />
                        <Container onSubmit={ () => {} } triggerText="Feedback" />
                        {this.state.collapsedTables}
                    </section>
                    <div className="profile_container1_and_half">
                        <div className="profile_drop_zone">
                            <section onClick={ () => { this.resizeDataTable("profileContainer1SectionContainer3") } } className="profile_container1_section_container3" id="profileContainer1SectionContainer3" draggable="true">
                                <button onClick={ () => { this.collapseDataTable("profile_container1_section_container3", "Certifications") }} className="text_btn" type="button"><b>collapse</b></button>
                                <h2>Certifications</h2>
                                <ul>
                                    <li>12/2/2020, 3:35pm - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                    <li>1/1/2021, 1:50pm - Tempor incididunt ut labore et dolore magna aliqua.</li>
                                    <li>5/4/2020, 2:30pm - Nullam non nisi.</li>
                                    <li>6/4/2020, 6:45am - Vulputate eu scelerisque felis.</li>
                                </ul>
                                <button onClick={ () => { } } className="text_btn" type="button"><b>Click here to load more</b></button>
                            </section>
                        </div>
                        <div className="profile_drop_zone"></div>
                        <div className="profile_drop_zone">
                            <section onClick={ () => { this.resizeDataTable("profileContainer1SectionContainer4") } } className="profile_container1_section_container4" id="profileContainer1SectionContainer4" draggable="true">
                                <button onClick={ () => { this.collapseDataTable("profile_container1_section_container4", "Updates") }} className="text_btn" type="button"><b>collapse</b></button>
                                <h2>Updates</h2>
                                <ul>
                                    <li>12/2/2020, 3:35pm - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                    <li>1/1/2021, 1:50pm - Tempor incididunt ut labore et dolore magna aliqua.</li>
                                    <li>5/4/2020, 2:30pm - Nullam non nisi.</li>
                                    <li>6/4/2020, 6:45am - Vulputate eu scelerisque felis.</li>
                                </ul>
                                <button onClick={ () => { } } className="text_btn" type="button"><b>Click here to load more</b></button>
                            </section>
                        </div>
                    </div>
                </div>
                <div className="profile_container2">
                    <div className="profile_drop_zone">
                        <section onClick={ () => { this.resizeDataTable("profileContainer2SectionContainer1") } } className="profile_container2_section_container1" id="profileContainer2SectionContainer1" draggable="true">
                            <button onClick={ () => { this.collapseDataTable("profile_container2_section_container1", "Councils") }} className="text_btn" type="button"><b>collapse</b></button>
                            <h2>Councils</h2> 
                            <ul>
                                <li>Council 1</li>
                                <li>Council 2</li>
                                <li>Council 3</li>
                            </ul>
                            <button onClick={ () => { } } className="text_btn" type="button"><b>Click here to load more</b></button>
                        </section>
                    </div>
                    <div className="profile_drop_zone"></div>
                    <div className="profile_drop_zone">
                        <section onClick={ () => { this.resizeDataTable("profileContainer2SectionContainer2") } } className="profile_container2_section_container2" id="profileContainer2SectionContainer2" draggable="true">
                            <button onClick={ () => { this.collapseDataTable("profile_container2_section_container2", "Recent Activity") }} className="text_btn" type="button"><b>collapse</b></button>
                            <h2>Recent Activity</h2> 
                            <ul>
                                <li>12/2/2020, 3:35pm - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>1/1/2021, 1:50pm - Tempor incididunt ut labore et dolore magna aliqua.</li>
                                <li>5/4/2020, 2:30pm - Nullam non nisi.</li>
                                <li>6/4/2020, 6:45am - Vulputate eu scelerisque felis.</li>
                            </ul>
                            <button onClick={ () => { } } className="text_btn" type="button"><b>Click here to load more</b></button>
                        </section>
                    </div>
                    <div className="profile_drop_zone"></div>
                    <div className="profile_drop_zone">
                        <section onClick={ () => { this.resizeDataTable("profileContainer2SectionContainer3") } } className="profile_container2_section_container3" id="profileContainer2SectionContainer3" draggable="true">
                            <button onClick={ () => { this.collapseDataTable("profile_container2_section_container3", "Recent Achievements") }} className="text_btn" type="button"><b>collapse</b></button>
                            <h2>Recent Achievements</h2>
                            <ul>
                                <li>12/2/2020, 3:35pm - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>1/1/2021, 1:50pm - Tempor incididunt ut labore et dolore magna aliqua.</li>
                                <li>5/4/2020, 2:30pm - Nullam non nisi.</li>
                                <li>6/4/2020, 6:45am - Vulputate eu scelerisque felis.</li>
                            </ul>
                            <button onClick={ () => { } } className="text_btn" type="button"><b>Click here to load more</b></button> 
                        </section>
                    </div>
                    <div className="profile_drop_zone"></div>
                    <div className="profile_drop_zone">
                        <section onClick={ () => { this.resizeDataTable("profileContainer2SectionContainer4") } } className="profile_container2_section_container4" id="profileContainer2SectionContainer4" draggable="true">
                            <button onClick={ () => { this.collapseDataTable("profile_container2_section_container4", "Recent Badges") }} className="text_btn" type="button"><b>collapse</b></button>
                            <h2>Recent Badges</h2>
                            <ul>
                                <li><img className="badge" srcSet={this.props.badge} alt="User's Silver badge." /></li>
                            </ul>
                            <button onClick={ () => { } } className="text_btn" type="button"><b>Click here to load more</b></button>
                        </section>
                    </div>
                </div>
                <div className="clear"></div>
            </React.Fragment>
        );
    }
} 

// PropTypes for jest testing in App.test.js
ProfileUser.propTypes = {
    apple: PropTypes.string.isRequired,
    book: PropTypes.string.isRequired,
    twitterMini: PropTypes.string.isRequired,
    fbMini: PropTypes.string.isRequired,
    instaMini: PropTypes.string.isRequired,
    profileImgLarge: PropTypes.string,
    profileImgSmall: PropTypes.string.isRequired,
    badge: PropTypes.string,
    messageIcon: PropTypes.string.isRequired,
    customize: PropTypes.string.isRequired
}