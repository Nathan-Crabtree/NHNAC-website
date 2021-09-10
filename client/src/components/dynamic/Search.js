import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString, { parse } from 'query-string';

var CryptoJS = require("crypto-js");
require('dotenv').config();

export const Search = (props) => {
  // Src: https://stackoverflow.com/questions/53215285/how-can-i-force-a-component-to-re-render-with-hooks-in-react
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [total, setTotal] = useState({ results: 0, pages: 0 });
  const [search, setSearch] = useState({ query: null, page: null, tag: null });
  const [page, setPage] = useState({ min: 0, max: 0 });
  const { REACT_APP_KEY } = process.env;

  // Arrays
  const [filters, setFilters] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]); 
  const [tags, setTags] = useState([]);
  const [results, setResults] = useState([]);

  /**
   * Once filter request form has been submitted, this function updates the "filter" query string to the correct value displaying results
   * according to specified filters.
   * 
   * @param {object} e 
   */
  const updateFilter = (e) => {
    let lFilters = [];

    e.preventDefault();

    // Append to lFilters any filter values that have been checked
    for (let filter = 0; filter < filters.length; filter++) {
        if (filters[filter].checked) {
            lFilters.push(filters[filter].id);
        }
    }

    // Update global searchFilters state with new array
    props.setSearchFilters(lFilters);

    // Rerender the component?
    //forceUpdate();
  }

  /**
   * Performs query search and counts results. Returns h3 component with result values according to page.
   * Conducts web scraping and displays marks or tags according to boolean value of query string "tag".
   * 
   */ 
  const displayResults = () => {
    activeFilters = props.getSearchFilters();

    // Determine page's min and mix result numbers for heading
    setPage({ min: qPage, max: qPage + 9 });

    // Search database for filtered-related content containing query and append to results array
    for (let activeFilter = 0; activeFilter < activeFilters.length; activeFilter++) {
        // Do query search procedure according to qTag value
        if (qTag) {
            // Query for results tag-related

        } else {
            // Query for results that contain a matching word to search query

        }

        // Append queried data to results array 

        // Increment total.results with setTotal

    }

    // Generate h3 component with result values correlating to page and return
  }

  /**
   * Returns filtered section components according to page.
   * 
   */
  const displaySections = () => {
    // Generate component with sectioned results correlating to page and return

  }

  /**
   * Searches similar tags related to query and returns component containing them via tags array.
   * 
   */
  const displaySimilarTags = () => {
    // Generate at least 5 tags sharing similarity to query

    // Do query search for generated-related tags that exist in database and append to tags array

    // Append queried tag to tags array 

    // Generate component with tags included for hgroup and return
  }

  /**
  * Returns proper component for navigating through pages via 
  * qPage and total.pages. Rerenders the component if query values haven't been received after component is rendered.
  * 
  */
  const displayPageLinks = () => {
    setTotal({ pages: total.results/10 });

    // Check conditions for rendering proper navigation component; current page will be unclickable
    if (total.pages <= 5) {
        /* Previous Page 1,2,3,4,5 Next Page */
    } else {
        if (qPage <= 5) {
            /* Previous Page 1,2,3,4,5…Pmax Next Page */
        } else if (qPage > 4 && qPage < total.pages - 4) {
            /* Previous Page 1...qPage-2, qPage-1, qPage, qPage+1, qPage+2...Pmax Next Page */
        } else {
            /* Previous Page 1…Pmax-4, Pmax-3, Pmax-2, Pmax-1, Pmax Next Page */
        }
    }

    // Rerender the component if query values are null
    if (qPage === null || query === null) {
        forceUpdate();
    }
  }

  useEffect(() => {
    const parsedQString = queryString.parse(props.location.search);

    // Change value of query variable to that of query string in URL
    setSearch({ query: decodeURIComponent(parsedQString.query) });
    setSearch({ page: parseInt(parsedQString.page) });

    // Check if tag or not
    if (parsedQString.query[0] === "#") {
        setSearch({ tag: true });
    } else {
        setSearch({ tag: false });
    }

    setFilters([articles, updates, events, podcasts, community, user]);
    setActiveFilters(props.getSearchFilters());

    // Check content types that have already been filtered 
    for (let activeFilter = 0; activeFilter < activeFilters.length; activeFilter++) {
        for (let filter = 0; filter < filters.length; filter++) {
            if (filters[filter].id === activeFilters[activeFilter]) {
                filters[filter].checked = true;
            }
        }
    }
  }, []);

  return (
    <React.Fragment>
        <div className="search_container">
            {/* Container 1 */}
            <div>
                {/* Search query tags and results data */}
                <div>
                    <hgroup>
                        <h2>Search Results</h2>
                        { displayResults }
                        {/* Hard-coded h3 is for reference only. - Zane */}
                        <h3>Displaying {`${page.min}-${page.max}`} of {total.results} results for {search.query}</h3>
                    </hgroup>
                    { displaySimilarTags }
                    {/* Hard-coded ul is for reference only. - Zane */}
                    <ul>
                        <li>
                            Did you mean <Link to={`/search?query=${encodeURIComponent("monk")}&page=1`}>monk</Link>
                        </li>
                        <li>, or </li>
                        <li>
                            <Link to={`/search?query=${encodeURIComponent("monkier")}&page=1`}>monkier</Link>?
                        </li>
                    </ul>
                </div>
                {/* Search result sections */}
                <div>
                    { displaySections }
                    {/* Hard-coded sections are for reference only. - Zane */}
                    <section>
                        <Link to="/article/article?id=1">Lorem ipsum dolor sit amet, consectetur adipiscing elit?</Link>
                        <blockquote cite="/article/article?id=1"><q>Imperdiet proin fermentum leo vel orci. Habitasse platea dictumst 
                        vestibulum rhoncus est pellentesque. <mark>Mauris</mark> commodo quis 
                        imperdiet massa tincidunt.</q></blockquote>
                        <div className="sub_article_container">
                            <div className="author_content">
                                <h4>by <Link to={`/profile/${CryptoJS.AES.encrypt("1", REACT_APP_KEY).toString()}}?view=viewer`}>Milton Miles</Link></h4>
                            </div>
                            <div className="sub_article_content">
                                <p>Type: Article</p>
                            </div>
                            <div className="sub_article_tags">
                                <p>Tags:&nbsp; 
                                    <Link to={`/search?query=${encodeURIComponent("#tag1")}&page=1`}>#tag1</Link>,&nbsp;
                                    <Link to={`/search?query=${encodeURIComponent("#tag2")}&page=1`}>#tag2</Link>,&nbsp;
                                    <Link to={`/search?query=${encodeURIComponent("#tag3")}&page=1`}>#tag3</Link>
                                </p>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </section>
                    <section>
                        <Link to="/article/article?id=1">Lorem ipsum dolor sit amet, consectetur adipiscing elit?</Link>
                        <blockquote cite="/article/article?id=1"><q>Imperdiet proin fermentum leo vel orci. Habitasse platea dictumst 
                        vestibulum rhoncus est pellentesque. <mark>Mauris</mark> commodo quis 
                        imperdiet massa tincidunt.</q></blockquote>
                        <div className="sub_article_container">
                            <div className="author_content">
                                <h4>by <Link to={`/profile/${CryptoJS.AES.encrypt("1", REACT_APP_KEY).toString()}}?view=viewer`}>Milton Miles</Link></h4>
                            </div>
                            <div className="sub_article_content">
                                <p>Type: Article</p>
                            </div>
                            <div className="sub_article_tags">
                                <p>Tags:&nbsp; 
                                    <Link to={`/search?query=${encodeURIComponent("#tag1")}&page=1`}>#tag1</Link>,&nbsp;
                                    <Link to={`/search?query=${encodeURIComponent("#tag2")}&page=1`}>#tag2</Link>,&nbsp;
                                    <Link to={`/search?query=${encodeURIComponent("#tag3")}&page=1`}>#tag3</Link>
                                </p>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </section>
                    <section>
                        <Link to="/article/article?id=1">Lorem ipsum dolor sit amet, consectetur adipiscing elit?</Link>
                        <blockquote cite="/article/article?id=1"><q>Imperdiet proin fermentum leo vel orci. Habitasse platea dictumst 
                        vestibulum rhoncus est pellentesque. <mark>Mauris</mark> commodo quis 
                        imperdiet massa tincidunt.</q></blockquote>
                        <div className="sub_article_container">
                            <div className="author_content">
                                <h4>by <Link to={`/profile/${CryptoJS.AES.encrypt("1", REACT_APP_KEY).toString()}}?view=viewer`}>Milton Miles</Link></h4>
                            </div>
                            <div className="sub_article_content">
                                <p>Type: Article</p>
                            </div>
                            <div className="sub_article_tags">
                                <p>Tags:&nbsp; 
                                    <Link to={`/search?query=${encodeURIComponent("#tag1")}&page=1`}>#tag1</Link>,&nbsp;
                                    <Link to={`/search?query=${encodeURIComponent("#tag2")}&page=1`}>#tag2</Link>,&nbsp;
                                    <Link to={`/search?query=${encodeURIComponent("#tag3")}&page=1`}>#tag3</Link>
                                </p>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </section>
                    <section>
                        <Link to="/article/article?id=1">Lorem ipsum dolor sit amet, consectetur adipiscing elit?</Link>
                        <blockquote cite="/article/article?id=1"><q>Imperdiet proin fermentum leo vel orci. Habitasse platea dictumst 
                        vestibulum rhoncus est pellentesque. <mark>Mauris</mark> commodo quis 
                        imperdiet massa tincidunt.</q></blockquote>
                        <div className="sub_article_container">
                            <div className="author_content">
                                <h4>by <Link to={`/profile/${CryptoJS.AES.encrypt("1", REACT_APP_KEY).toString()}}?view=viewer`}>Milton Miles</Link></h4>
                            </div>
                            <div className="sub_article_content">
                                <p>Type: Article</p>
                            </div>
                            <div className="sub_article_tags">
                                <p>Tags:&nbsp; 
                                    <Link to={`/search?query=${encodeURIComponent("#tag1")}&page=1`}>#tag1</Link>,&nbsp;
                                    <Link to={`/search?query=${encodeURIComponent("#tag2")}&page=1`}>#tag2</Link>,&nbsp;
                                    <Link to={`/search?query=${encodeURIComponent("#tag3")}&page=1`}>#tag3</Link>
                                </p>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </section>
                    <section>
                        <Link to="/article/article?id=1">Lorem ipsum dolor sit amet, consectetur adipiscing elit?</Link>
                        <blockquote cite="/article/article?id=1"><q>Imperdiet proin fermentum leo vel orci. Habitasse platea dictumst 
                        vestibulum rhoncus est pellentesque. <mark>Mauris</mark> commodo quis 
                        imperdiet massa tincidunt.</q></blockquote>
                        <div className="sub_article_container">
                            <div className="author_content">
                                <h4>by <Link to={`/profile/${CryptoJS.AES.encrypt("1", REACT_APP_KEY).toString()}}?view=viewer`}>Milton Miles</Link></h4>
                            </div>
                            <div className="sub_article_content">
                                <p>Type: Article</p>
                            </div>
                            <div className="sub_article_tags">
                                <p>Tags:&nbsp; 
                                    <Link to={`/search?query=${encodeURIComponent("#tag1")}&page=1`}>#tag1</Link>,&nbsp;
                                    <Link to={`/search?query=${encodeURIComponent("#tag2")}&page=1`}>#tag2</Link>,&nbsp;
                                    <Link to={`/search?query=${encodeURIComponent("#tag3")}&page=1`}>#tag3</Link>
                                </p>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </section>
                    <section>
                        <Link to="/article/article?id=1">Lorem ipsum dolor sit amet, consectetur adipiscing elit?</Link>
                        <blockquote cite="/article/article?id=1"><q>Imperdiet proin fermentum leo vel orci. Habitasse platea dictumst 
                        vestibulum rhoncus est pellentesque. <mark>Mauris</mark> commodo quis 
                        imperdiet massa tincidunt.</q></blockquote>
                        <div className="sub_article_container">
                            <div className="author_content">
                                <h4>by <Link to={`/profile/${CryptoJS.AES.encrypt("1", REACT_APP_KEY).toString()}}?view=viewer`}>Milton Miles</Link></h4>
                            </div>
                            <div className="sub_article_content">
                                <p>Type: Article</p>
                            </div>
                            <div className="sub_article_tags">
                                <p>Tags:&nbsp; 
                                    <Link to={`/search?query=${encodeURIComponent("#tag1")}&page=1`}>#tag1</Link>,&nbsp;
                                    <Link to={`/search?query=${encodeURIComponent("#tag2")}&page=1`}>#tag2</Link>,&nbsp;
                                    <Link to={`/search?query=${encodeURIComponent("#tag3")}&page=1`}>#tag3</Link>
                                </p>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </section>
                    <section>
                        <Link to="/article/article?id=1">Lorem ipsum dolor sit amet, consectetur adipiscing elit?</Link>
                        <blockquote cite="/article/article?id=1"><q>Imperdiet proin fermentum leo vel orci. Habitasse platea dictumst 
                        vestibulum rhoncus est pellentesque. <mark>Mauris</mark> commodo quis 
                        imperdiet massa tincidunt.</q></blockquote>
                        <div className="sub_article_container">
                            <div className="author_content">
                                <h4>by <Link to={`/profile/${CryptoJS.AES.encrypt("1", REACT_APP_KEY).toString()}}?view=viewer`}>Milton Miles</Link></h4>
                            </div>
                            <div className="sub_article_content">
                                <p>Type: Article</p>
                            </div>
                            <div className="sub_article_tags">
                                <p>Tags:&nbsp; 
                                    <Link to={`/search?query=${encodeURIComponent("#tag1")}&page=1`}>#tag1</Link>,&nbsp;
                                    <Link to={`/search?query=${encodeURIComponent("#tag2")}&page=1`}>#tag2</Link>,&nbsp;
                                    <Link to={`/search?query=${encodeURIComponent("#tag3")}&page=1`}>#tag3</Link>
                                </p>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </section>
                    <section>
                        <Link to="/article/article?id=1">Lorem ipsum dolor sit amet, consectetur adipiscing elit?</Link>
                        <blockquote cite="/article/article?id=1"><q>Imperdiet proin fermentum leo vel orci. Habitasse platea dictumst 
                        vestibulum rhoncus est pellentesque. <mark>Mauris</mark> commodo quis 
                        imperdiet massa tincidunt.</q></blockquote>
                        <div className="sub_article_container">
                            <div className="author_content">
                                <h4>by <Link to={`/profile/${CryptoJS.AES.encrypt("1", REACT_APP_KEY).toString()}}?view=viewer`}>Milton Miles</Link></h4>
                            </div>
                            <div className="sub_article_content">
                                <p>Type: Article</p>
                            </div>
                            <div className="sub_article_tags">
                                <p>Tags:&nbsp; 
                                    <Link to={`/search?query=${encodeURIComponent("#tag1")}&page=1`}>#tag1</Link>,&nbsp;
                                    <Link to={`/search?query=${encodeURIComponent("#tag2")}&page=1`}>#tag2</Link>,&nbsp;
                                    <Link to={`/search?query=${encodeURIComponent("#tag3")}&page=1`}>#tag3</Link>
                                </p>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </section>
                    <section>
                        <Link to="/article/article?id=1">Lorem ipsum dolor sit amet, consectetur adipiscing elit?</Link>
                        <blockquote cite="/article/article?id=1"><q>Imperdiet proin fermentum leo vel orci. Habitasse platea dictumst 
                        vestibulum rhoncus est pellentesque. <mark>Mauris</mark> commodo quis 
                        imperdiet massa tincidunt.</q></blockquote>
                        <div className="sub_article_container">
                            <div className="author_content">
                                <h4>by <Link to={`/profile/${CryptoJS.AES.encrypt("1", REACT_APP_KEY).toString()}}?view=viewer`}>Milton Miles</Link></h4>
                            </div>
                            <div className="sub_article_content">
                                <p>Type: Article</p>
                            </div>
                            <div className="sub_article_tags">
                                <p>Tags:&nbsp; 
                                    <Link to={`/search?query=${encodeURIComponent("#tag1")}&page=1`}>#tag1</Link>,&nbsp;
                                    <Link to={`/search?query=${encodeURIComponent("#tag2")}&page=1`}>#tag2</Link>,&nbsp;
                                    <Link to={`/search?query=${encodeURIComponent("#tag3")}&page=1`}>#tag3</Link>
                                </p>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </section>
                    <section>
                        <Link to="/article/article?id=1">Lorem ipsum dolor sit amet, consectetur adipiscing elit?</Link>
                        <blockquote cite="/article/article?id=1"><q>Imperdiet proin fermentum leo vel orci. Habitasse platea dictumst 
                        vestibulum rhoncus est pellentesque. <mark>Mauris</mark> commodo quis 
                        imperdiet massa tincidunt.</q></blockquote>
                        <div className="sub_article_container">
                            <div className="author_content">
                                <h4>by <Link to={`/profile/${CryptoJS.AES.encrypt("1", REACT_APP_KEY).toString()}}?view=viewer`}>Milton Miles</Link></h4>
                            </div>
                            <div className="sub_article_content">
                                <p>Type: Article</p>
                            </div>
                            <div className="sub_article_tags">
                                <p>Tags:&nbsp; 
                                    <Link to={`/search?query=${encodeURIComponent("#tag1")}&page=1`}>#tag1</Link>,&nbsp;
                                    <Link to={`/search?query=${encodeURIComponent("#tag2")}&page=1`}>#tag2</Link>,&nbsp;
                                    <Link to={`/search?query=${encodeURIComponent("#tag3")}&page=1`}>#tag3</Link>
                                </p>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </section>
                </div>
                {/* Search page selection */}
                { displayPageLinks }
                {/* Hard-coded ul is for reference only. - Zane */}
                <ul>
                    <li>
                        <Link to={`/search?query=${encodeURIComponent("monkeys")}&page=1`}>Previous Page</Link>
                    </li>
                    <li>
                        <Link to={`/search?query=${encodeURIComponent("monkeys")}&page=1`}>1</Link>
                    </li>
                    <li>
                        <Link to={`/search?query=${encodeURIComponent("monkeys")}&page=2`}>2</Link>
                    </li>
                    <li>
                        <Link to={`/search?query=${encodeURIComponent("monkeys")}&page=3`}>3</Link>
                    </li>
                    <li>
                        <Link to={`/search?query=${encodeURIComponent("monkeys")}&page=4&filter=4`}>4</Link>
                    </li>
                    <li>
                        <Link to={`/search?query=${encodeURIComponent("monkeys")}&page=5&filter=5`}>5</Link>
                    </li>
                    <li>...</li>
                    <li>
                        <Link to={`/search?query=${encodeURIComponent("monkeys")}&page=50&filter=6`}>50</Link>
                    </li>
                    <li>
                        <Link to={`/search?query=${encodeURIComponent("monkeys")}&page=2&filter=2`}>Next Page</Link>
                    </li>
                </ul>
            </div>
            {/* Container 2 */}
            <form onSubmit={ (e) => { updateFilter(e) } }>
                <h3>Filter</h3>
                <fieldset>
                    <input type="checkbox" id="articles" name="articles" />
                    <label className="center_text" htmlFor="articles">&nbsp;Articles</label><br />
                    <input type="checkbox" id="updates" name="updates" />
                    <label className="center_text" htmlFor="updates">&nbsp;Updates</label><br />
                    <input type="checkbox" id="events" name="events" />
                    <label className="center_text" htmlFor="events">&nbsp;Events</label><br />
                    <input type="checkbox" id="podcasts" name="podcasts" />
                    <label className="center_text" htmlFor="podcasts">&nbsp;Podcasts</label><br />
                    <input type="checkbox" id="community" name="community" />
                    <label className="center_text" htmlFor="community">&nbsp;Community</label><br />
                    <input type="checkbox" id="user" name="user" />
                    <label className="center_text" htmlFor="user">&nbsp;User</label><br />
                    <br />
                    <button className="paypal_btn" type="submit">Update</button>
                </fieldset>
            </form>
        </div>
        <div className="clear"></div>
    </React.Fragment>
  );
}

export default Search;

// PropTypes for jest testing in App.test.js
Search.propTypes = {
    searchFilters: PropTypes.array.isRequired,
    setSearchFilters: PropTypes.func.isRequired,
    getSearchFilters: PropTypes.func.isRequired
}