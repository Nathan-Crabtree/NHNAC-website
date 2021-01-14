import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Article extends Component {

    constructor() {
        super();
        this.hideComments = this.hideComments.bind(this);
        this.hideResponses = this.hideResponses.bind(this);
        this.displayComments = this.displayComments.bind(this);
        this.displayForm = this.displayForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     *  hideComments() function - Hides the comment section and shows the "See Comments" button. Hides all forms.
     * 
     */
    hideComments() {
        this.hideForm("comment_form_1_0","comment_content_1_0",true);
        this.hideForm("comment_form_1_1","comment_content_1_1",true,true);
        document.getElementsByClassName("comment_section_container")[0].style.display = "none";
        document.getElementsByClassName("see_comments_btn")[0].style.display = "block";
        document.getElementsByClassName("see_comments_btn")[1].style.display = "block";
        document.getElementsByClassName("see_comments_btn")[2].style.display = "none";
        document.getElementsByClassName("comment_form")[0].style.display = "none";
        this.hideResponses();
    }   

    /**
     *  hideResponses() function - Hides the response section for the comment and shows the "See Responses" button. Hides response form.
     * 
     */
    hideResponses() {
        document.getElementsByClassName("response_section_container")[0].style.display = "none";
        document.getElementsByClassName("comment_btn")[0].style.display = "block";
        document.getElementsByClassName("comment_btn")[1].style.display = "block";
        document.getElementsByClassName("comment_btn")[2].style.display = "none";
        document.getElementsByClassName("response_form")[0].style.display = "none";
    }

    /**
     * displayComments() function - Shows the section the comment belongs to and hides the associated button. 
     * 
     * @param {string} containerClassName, @param {string} btnClassName 
     * 
     */
    displayComments(containerClassName, btnClassName) {
        document.getElementsByClassName(containerClassName)[0].style.display = "block";
        document.getElementsByClassName(btnClassName)[1].style.display = "none";
        document.getElementsByClassName(btnClassName)[2].style.display = "block";
    }   

    /**
     * displayForm() function - Shows the section's form that the comment belongs to and hides the associated button(s). 
     * 
     * @param {string} formClassName, @param {string} btnClassName, @param {boolean} editMode, @param {boolean} responseComment  
     * 
     */
    displayForm(formClassName, btnClassName, editMode = false, responseComment = false) {
        document.getElementsByClassName(formClassName)[0].style.display = "block";
        document.getElementsByClassName(btnClassName)[0].style.display = "none";
        if (editMode && !responseComment) {
            document.getElementsByClassName(formClassName)[0].parentElement.getElementsByTagName("ul")[0].style.display = "none";
        } else if (editMode && responseComment) {
            document.getElementsByClassName(formClassName)[0].parentElement.parentElement.getElementsByTagName("ul")[1].style.display = "none";
        } 
    }

    /**
     * hideForm() function - Hides the section's form that the comment belongs to and shows the associated button(s). 
     * 
     * @param {string} formClassName, @param {string} btnClassName, @param {boolean} editMode, @param {boolean} responseComment 
     * 
     */
    hideForm(formClassName, btnClassName, editMode = false, responseComment = false) {
        document.getElementsByClassName(formClassName)[0].style.display = "none";
        document.getElementsByClassName(btnClassName)[0].style.display = "block";
        if (editMode && !responseComment) {
            document.getElementsByClassName(formClassName)[0].parentElement.getElementsByTagName("ul")[0].style.display = "block";
        } else if (editMode && responseComment) {
            document.getElementsByClassName(formClassName)[0].parentElement.parentElement.getElementsByTagName("ul")[1].style.display = "block";
        } 
    }

    /**
     * onSubmit() function - Takes comment content submitted from user and sends to API and then gets added to database; 
     * the page is then refreshed to include the new comment.
     * 
     */
    onSubmit(e) {
        e.preventDefault();
        console.log(e.target.comment.value);
    }

    render() {
        return(
            <React.Fragment>
                <div className="MsoNormal center_text"><strong><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit?</span></strong></div>
                <div className="image_display">
                    <img className="article_image" srcSet={this.props.articleImg} alt="Stock for development purposes." />
                    <p className="article_image_desc image_desc">&emsp;Photo description: {"Stock for development purposes."}</p>
                </div>
                <aside className="top_aside_container">
                    <div>
                        <p>Posted on 2-2-20</p>
                        <img className="profile_img_small" srcSet={this.props.profileImgSmall} alt="Stock profile for development purposes." />
                        <h4>by <Link to="/profile?userid=1&view=viewer">Milton Miles</Link></h4>
                    </div>
                    <div>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/"><img srcSet={this.props.instaMini} alt="Author's instagram link." /></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.twitter.com/"><img srcSet={this.props.twitterMini} alt="Author's twitter link." /></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/"><img srcSet={this.props.fbMini} alt="Author's facebook link." /></a>
                    </div>
                    <div className="clear"></div>
                </aside>
                { this.props.isAuthenticated ? 
                <React.Fragment>
                    <div className="blur_container">
                        <article>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
                            aliqua. Faucibus nisl tincidunt eget nullam. Amet justo donec enim diam vulputate ut. Sed viverra ipsum nunc aliquet 
                            bibendum. Suspendisse sed nisi lacus sed viverra. Bibendum est ultricies integer quis. Sed faucibus turpis in eu mi.</p>

                            <p>Adipiscing bibendum est ultricies integer quis auctor elit sed. Ipsum dolor sit amet consectetur adipiscing elit. 
                            Et ultrices neque ornare aenean euismod elementum nisi quis. Neque vitae tempus quam pellentesque nec nam 
                            aliquam.</p>

                            <p>Ullamcorper velit sed ullamcorper morbi tincidunt. Enim sed faucibus turpis in eu mi. Consequat ac felis donec et odio. 
                            Egestas pretium aenean pharetra magna ac placerat vestibule lectus mauris. Cursus in hac habitasse platea dictumst. 
                            Porttitor eget dolor morbi non arcu risus.</p> 

                            <p>Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Non curabitur gravida arcu ac tortor 
                            dignissim convallis. Cursus in hac abitasse platea dictumst. Ultricies mi eget mauris pharetra. Accumsan sit amet nulla 
                            facilisi morbi tempus iaculis urna id. Maecenas sed enim ut sem.</p>

                            <p>Urna neque viverra justo nec ultrices dui. Scelerisque fermentum dui faucibus in ornare quam. At in tellus integer 
                            feugiat scelerisque varius morbi enim. Vel facilisis volutpat est velit egestas dui id.</p>

                            <p>Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Consectetur a erat nam at lectus urna duis 
                            convallis. Tincidunt vitae semper quis lectus nulla at volutpat diam. Sem fringilla ut morbi tincidunt augue interdum 
                            velit euismod. Viverra aliquet eget sit amet tellus. Et odio pellentesque diam volutpat. Sed sed risus pretium quam. In 
                            aliquam sem fringilla ut morbi tincidunt augue interdum. Leo duis ut diam quam.</p> 

                            <p>Pulvinar pellentesque habitant morbi tristique senectus et. Ornare suspendisse sed nisi lacus sed viverra tellus in hac. </p>
                        </article>
                        <aside className="bottom_aside_container">
                            <div>
                                <ul>
                                    <li><img srcSet={this.props.thumbsUp} alt="Like this button." /></li>
                                    <li><b>3.5 likes</b></li>
                                </ul>
                                <p>Like this article</p>
                                <div className="clear"></div>
                            </div>
                            <div>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/"><img srcSet={this.props.instaMini} alt="Author's instagram link." /></a>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.twitter.com/"><img srcSet={this.props.twitterMini} alt="Author's twitter link." /></a>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/"><img srcSet={this.props.fbMini} alt="Author's facebook link." /></a>
                            </div>
                            <div className="clear"></div>
                        </aside>
                        <div className="comment_section_container">
                            <section className="comment_container">
                                <hr />
                                <div>
                                    <img className="profile_img_small" srcSet={this.props.profileImgSmall} alt="Stock profile for development purposes." />
                                    <div>
                                        <h4><Link to="/profile?userid=1&view=viewer">Milton Miles</Link></h4>
                                        <div>
                                            <p>Tier</p>
                                            <p>Last Online: 35 min ago</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="clear"></div>
                                <div>
                                    <div>
                                        <p>Posted 35 min ago</p>
                                    </div>
                                    <ul>
                                        <li><img srcSet={this.props.thumbsUp} alt="Like this button." /></li>
                                        <li><p><b>3.5 likes</b></p></li>
                                    </ul>
                                    <div className="clear"></div>
                                    <div>
                                        <p className="comment_content_1_0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                        sed do eiusmod tempor incididunt ut labore et dolore 
                                        magna aliqua.</p>
                                        <form id="comment" className="comment_form_1_0" onSubmit={ this.onSubmit }>
                                            <fieldset>
                                                <div className="comment_form_field">
                                                    <label htmlFor="comment">Comment</label>
                                                    <svg onClick={ () => { this.hideForm("comment_form_1_0", "comment_content_1_0", true) } } className="_modal-close-icon" viewBox="0 0 40 40">
                                                        <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                                    </svg><br />
                                                    <textarea className="login_input" type="text" id="comment" name="comment" readOnly value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                                    sed do eiusmod tempor incididunt ut labore et dolore 
                                                    magna aliqua." /><br />
                                                </div>
                                                <button className="submit_btn submit_padding" type="submit">Submit</button>
                                            </fieldset>
                                        </form>
                                        <ul>
                                            <li><button onClick={ () => { this.displayForm("comment_form_1_0", "comment_content_1_0", true) } } className="text_btn" type="button"><b>Edit</b></button></li>
                                            <li><button onClick={ () => {} } className="text_btn" type="button"><b>Delete</b></button></li>
                                            <li><Link to="/about#contact">Report</Link></li>
                                        </ul>
                                        <div className="response_section_container">
                                            <section className="response_container">
                                                <div>
                                                    <div>
                                                        <Link to="/"><img className="profile_img_small" srcSet={this.props.profileImgSmall} alt="Stock profile for development purposes." /></Link>
                                                        <div>
                                                            <h4><Link to="/profile?userid=1&view=viewer">Milton Miles</Link></h4>
                                                            <div>
                                                                <p>Tier</p>
                                                                <p>Last Online: 35 min ago</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p>Posted 35 min ago</p>
                                                    </div>
                                                    <ul>
                                                        <li><img srcSet={this.props.thumbsUp} alt="Like this button." /></li>
                                                        <li><p><b>3.5 likes</b></p></li>
                                                    </ul>
                                                    <div className="clear"></div>
                                                    <div>
                                                        <p className="comment_content_1_1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                                        sed do eiusmod tempor incididunt ut labore et dolore 
                                                        magna aliqua.</p>
                                                        <form id="comment" className="comment_form_1_1" onSubmit={ this.onSubmit }>
                                                            <fieldset>
                                                                <div className="comment_form_field">
                                                                    <label htmlFor="comment">Comment</label>
                                                                    <svg onClick={ () => { this.hideForm("comment_form_1_1", "comment_content_1_1", true, true) } } className="_modal-close-icon" viewBox="0 0 40 40">
                                                                        <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                                                    </svg><br />
                                                                    <textarea className="login_input" type="text" id="comment" name="comment" readOnly value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                                                    sed do eiusmod tempor incididunt ut labore et dolore 
                                                                    magna aliqua." /><br />
                                                                </div>
                                                                <button className="submit_btn submit_padding" type="submit">Submit</button>
                                                            </fieldset>
                                                        </form>
                                                    </div>
                                                    <ul>
                                                        <li><button onClick={ () => { this.displayForm("comment_form_1_1", "comment_content_1_1", true, true) } } className="text_btn" type="button"><b>Edit</b></button></li>
                                                        <li><button onClick={ () => {} } className="text_btn" type="button"><b>Delete</b></button></li>
                                                        <li><Link to="/about#contact">Report</Link></li>
                                                    </ul>
                                                    <hr />
                                                </div>
                                            </section> 
                                            <form id="comment" className="response_form" onSubmit={ this.onSubmit }>
                                                <fieldset>
                                                    <div className="comment_form_field">
                                                        <label htmlFor="comment">Response</label>
                                                        <svg onClick={ () => { this.hideForm("response_form", "comment_btn")} } className="_modal-close-icon" viewBox="0 0 40 40">
                                                            <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                                        </svg><br />
                                                        <textarea className="login_input" type="text" id="comment" name="comment" /><br />
                                                    </div>
                                                    <button className="submit_btn submit_padding" type="submit">Submit</button>
                                                </fieldset>
                                            </form>
                                            <button className="paypal_btn comment_btn" type="button" onClick={ () => { this.displayForm("response_form","comment_btn")} }><b>Add Response</b></button>
                                        </div>
                                    </div>
                                    <button className="paypal_btn comment_btn" type="button" onClick={ () => { this.displayComments("response_section_container", "comment_btn") }}><b>See Responses</b></button>
                                    <button className="bitcoin_btn comment_btn" type="button" onClick={this.hideResponses}><b>Hide Responses</b></button>
                                </div>
                                <div className="clear"></div>
                            </section>
                            <form id="comment" className="comment_form" onSubmit={ this.onSubmit }>
                                <fieldset>
                                    <div className="comment_form_field">
                                        <label htmlFor="comment">Comment</label>
                                        <svg onClick={ () => { this.hideForm("comment_form", "see_comments_btn") }} className="_modal-close-icon" viewBox="0 0 40 40">
                                            <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                        </svg><br />
                                        <textarea className="login_input" type="text" id="comment" name="comment" /><br />
                                    </div>
                                    <button className="submit_btn submit_padding" type="submit">Submit</button>
                                </fieldset>
                            </form>
                            <button className="paypal_btn see_comments_btn" type="button" onClick={ () => { this.displayForm("comment_form", "see_comments_btn")} }><b>Add Comment</b></button>
                        </div>
                        <button className="paypal_btn see_comments_btn" type="button" onClick={ () => { this.displayComments("comment_section_container", "see_comments_btn")} }><b>See Comments</b></button>
                        <button className="bitcoin_btn see_comments_btn" type="button" onClick={this.hideComments}><b>Hide Comments</b></button>
                    </div>
                    <div className="blur_text_container">
                        <p>Become adopted to the New Haven Native American Church community today to unlock this article.</p>
                        <Link to="/signup"><h5><b>Pay what you’d like by clicking here.</b></h5></Link>
                    </div>
                </React.Fragment>
                :
                <React.Fragment>
                    <article>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
                        aliqua. Faucibus nisl tincidunt eget nullam. Amet justo donec enim diam vulputate ut. Sed viverra ipsum nunc aliquet 
                        bibendum. Suspendisse sed nisi lacus sed viverra. Bibendum est ultricies integer quis. Sed faucibus turpis in eu mi.</p>

                        <p>Adipiscing bibendum est ultricies integer quis auctor elit sed. Ipsum dolor sit amet consectetur adipiscing elit. 
                        Et ultrices neque ornare aenean euismod elementum nisi quis. Neque vitae tempus quam pellentesque nec nam 
                        aliquam.</p>

                        <p>Ullamcorper velit sed ullamcorper morbi tincidunt. Enim sed faucibus turpis in eu mi. Consequat ac felis donec et odio. 
                        Egestas pretium aenean pharetra magna ac placerat vestibule lectus mauris. Cursus in hac habitasse platea dictumst. 
                        Porttitor eget dolor morbi non arcu risus.</p> 

                        <p>Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Non curabitur gravida arcu ac tortor 
                        dignissim convallis. Cursus in hac abitasse platea dictumst. Ultricies mi eget mauris pharetra. Accumsan sit amet nulla 
                        facilisi morbi tempus iaculis urna id. Maecenas sed enim ut sem.</p>

                        <p>Urna neque viverra justo nec ultrices dui. Scelerisque fermentum dui faucibus in ornare quam. At in tellus integer 
                        feugiat scelerisque varius morbi enim. Vel facilisis volutpat est velit egestas dui id.</p>

                        <p>Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Consectetur a erat nam at lectus urna duis 
                        convallis. Tincidunt vitae semper quis lectus nulla at volutpat diam. Sem fringilla ut morbi tincidunt augue interdum 
                        velit euismod. Viverra aliquet eget sit amet tellus. Et odio pellentesque diam volutpat. Sed sed risus pretium quam. In 
                        aliquam sem fringilla ut morbi tincidunt augue interdum. Leo duis ut diam quam.</p> 

                        <p>Pulvinar pellentesque habitant morbi tristique senectus et. Ornare suspendisse sed nisi lacus sed viverra tellus in hac. </p>
                    </article>
                    <aside className="bottom_aside_container">
                        <div>
                            <ul>
                                <li><img srcSet={this.props.thumbsUp} alt="Like this button." /></li>
                                <li><b>3.5 likes</b></li>
                            </ul>
                            <p>Like this article</p>
                            <div className="clear"></div>
                        </div>
                        <div>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/"><img srcSet={this.props.instaMini} alt="Author's instagram link." /></a>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.twitter.com/"><img srcSet={this.props.twitterMini} alt="Author's twitter link." /></a>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/"><img srcSet={this.props.fbMini} alt="Author's facebook link." /></a>
                        </div>
                        <div className="clear"></div>
                    </aside>
                    <div className="comment_section_container">
                        <section className="comment_container">
                            <hr />
                            <div>
                                <img className="profile_img_small" srcSet={this.props.profileImgSmall} alt="Stock profile for development purposes." />
                                <div>
                                    <h4><Link to="/profile?userid=1&view=viewer">Milton Miles</Link></h4>
                                    <div>
                                        <p>Tier</p>
                                        <p>Last Online: 35 min ago</p>
                                    </div>
                                </div>
                            </div>
                            <div className="clear"></div>
                            <div>
                                <div>
                                    <p>Posted 35 min ago</p>
                                </div>
                                <ul>
                                    <li><img srcSet={this.props.thumbsUp} alt="Like this button." /></li>
                                    <li><p><b>3.5 likes</b></p></li>
                                </ul>
                                <div className="clear"></div>
                                <div>
                                    <p className="comment_content_1_0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                    sed do eiusmod tempor incididunt ut labore et dolore 
                                    magna aliqua.</p>
                                    <form id="comment" className="comment_form_1_0" onSubmit={ this.onSubmit }>
                                        <fieldset>
                                            <div className="comment_form_field">
                                                <label htmlFor="comment">Comment</label>
                                                <svg onClick={ () => { this.hideForm("comment_form_1_0", "comment_content_1_0", true) } } className="_modal-close-icon" viewBox="0 0 40 40">
                                                    <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                                </svg><br />
                                                <textarea className="login_input" type="text" id="comment" name="comment" readOnly value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                                sed do eiusmod tempor incididunt ut labore et dolore 
                                                magna aliqua." /><br />
                                            </div>
                                            <button className="submit_btn submit_padding" type="submit">Submit</button>
                                        </fieldset>
                                    </form>
                                    <ul>
                                        <li><button onClick={ () => { this.displayForm("comment_form_1_0", "comment_content_1_0", true) } } className="text_btn" type="button"><b>Edit</b></button></li>
                                        <li><button onClick={ () => {} } className="text_btn" type="button"><b>Delete</b></button></li>
                                        <li><Link to="/about#contact">Report</Link></li>
                                    </ul>
                                    <div className="response_section_container">
                                        <section className="response_container">
                                            <div>
                                                <div>
                                                    <Link to="/"><img className="profile_img_small" srcSet={this.props.profileImgSmall} alt="Stock profile for development purposes." /></Link>
                                                    <div>
                                                        <h4><Link to="/profile?userid=1&view=viewer">Milton Miles</Link></h4>
                                                        <div>
                                                            <p>Tier</p>
                                                            <p>Last Online: 35 min ago</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p>Posted 35 min ago</p>
                                                </div>
                                                <ul>
                                                    <li><img srcSet={this.props.thumbsUp} alt="Like this button." /></li>
                                                    <li><p><b>3.5 likes</b></p></li>
                                                </ul>
                                                <div className="clear"></div>
                                                <div>
                                                    <p className="comment_content_1_1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                                    sed do eiusmod tempor incididunt ut labore et dolore 
                                                    magna aliqua.</p>
                                                    <form id="comment" className="comment_form_1_1" onSubmit={ this.onSubmit }>
                                                        <fieldset>
                                                            <div className="comment_form_field">
                                                                <label htmlFor="comment">Comment</label>
                                                                <svg onClick={ () => { this.hideForm("comment_form_1_1", "comment_content_1_1", true, true) } } className="_modal-close-icon" viewBox="0 0 40 40">
                                                                    <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                                                </svg><br />
                                                                <textarea className="login_input" type="text" id="comment" name="comment" readOnly value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                                                sed do eiusmod tempor incididunt ut labore et dolore 
                                                                magna aliqua." /><br />
                                                            </div>
                                                            <button className="submit_btn submit_padding" type="submit">Submit</button>
                                                        </fieldset>
                                                    </form>
                                                </div>
                                                <ul>
                                                    <li><button onClick={ () => { this.displayForm("comment_form_1_1", "comment_content_1_1", true, true) } } className="text_btn" type="button"><b>Edit</b></button></li>
                                                    <li><button onClick={ () => {} } className="text_btn" type="button"><b>Delete</b></button></li>
                                                    <li><Link to="/about#contact">Report</Link></li>
                                                </ul>
                                                <hr />
                                            </div>
                                        </section> 
                                        <form id="comment" className="response_form" onSubmit={ this.onSubmit }>
                                            <fieldset>
                                                <div className="comment_form_field">
                                                    <label htmlFor="comment">Response</label>
                                                    <svg onClick={ () => { this.hideForm("response_form", "comment_btn")} } className="_modal-close-icon" viewBox="0 0 40 40">
                                                        <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                                    </svg><br />
                                                    <textarea className="login_input" type="text" id="comment" name="comment" /><br />
                                                </div>
                                                <button className="submit_btn submit_padding" type="submit">Submit</button>
                                            </fieldset>
                                        </form>
                                        <button className="paypal_btn comment_btn" type="button" onClick={ () => { this.displayForm("response_form","comment_btn")} }><b>Add Response</b></button>
                                    </div>
                                </div>
                                <button className="paypal_btn comment_btn" type="button" onClick={ () => { this.displayComments("response_section_container", "comment_btn") }}><b>See Responses</b></button>
                                <button className="bitcoin_btn comment_btn" type="button" onClick={this.hideResponses}><b>Hide Responses</b></button>
                            </div>
                            <div className="clear"></div>
                        </section>
                        <form id="comment" className="comment_form" onSubmit={ this.onSubmit }>
                            <fieldset>
                                <div className="comment_form_field">
                                    <label htmlFor="comment">Comment</label>
                                    <svg onClick={ () => { this.hideForm("comment_form", "see_comments_btn") }} className="_modal-close-icon" viewBox="0 0 40 40">
                                        <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                                    </svg><br />
                                    <textarea className="login_input" type="text" id="comment" name="comment" /><br />
                                </div>
                                <button className="submit_btn submit_padding" type="submit">Submit</button>
                            </fieldset>
                        </form>
                        <button className="paypal_btn see_comments_btn" type="button" onClick={ () => { this.displayForm("comment_form", "see_comments_btn")} }><b>Add Comment</b></button>
                    </div>
                    <button className="paypal_btn see_comments_btn" type="button" onClick={ () => { this.displayComments("comment_section_container", "see_comments_btn")} }><b>See Comments</b></button>
                    <button className="bitcoin_btn see_comments_btn" type="button" onClick={this.hideComments}><b>Hide Comments</b></button>
                </React.Fragment>
                }
                <div className="back_to_articles_link">
                    <Link to="/">Back to articles</Link>
                </div>
            </React.Fragment>
        );
    }
}

Article.propTypes = {
    articleImg: PropTypes.string.isRequired,
    fbMini: PropTypes.string.isRequired,
    instaMini: PropTypes.string.isRequired,
    twitterMini: PropTypes.string.isRequired,
    thumbsUp: PropTypes.string.isRequired,
    profileImgSmall: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}