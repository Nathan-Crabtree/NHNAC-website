import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

export const Slideshow = ({hands, homes, people}) => {

    // Source: https://www.w3schools.com/howto/howto_js_slideshow.asp - Zane 
    var slideIndex = useRef(0);

    /**
     * showSlides function() - Renders and hides images in the order they were placed and edits styling of the viewer.
     * 
     * @param {integer} n 
     */
    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex.current = 1}
        if (n < 1) {slideIndex.current = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex.current-1].style.display = "block";
        dots[slideIndex.current-1].className += " active";
    }

    /**
     * plusSlides() function - Next and previous controls for the slideshow viewer.
     * 
     * @param {integer} n 
     */
    function plusSlides(n) {
        showSlides(slideIndex.current += n);
    }
  
    /**
     * currentSlide() function - Thumbnail image controls.
     * 
     * @param {integer} n 
     */
    function currentSlide(n) {
        showSlides(slideIndex.current = n);
    }

    useEffect(() => {
        /**
         * showSlidesAuto() function - Automated version of showSlides(). 
         * 
         */
        const showSlidesAuto = () => {
            var i;
            var slides = document.getElementsByClassName("mySlides");
            var dots = document.getElementsByClassName("dot");
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slideIndex.current++;

            if (slideIndex.current > slides.length) {slideIndex.current = 1}
            slides[slideIndex.current-1].style.display = "block";
            dots[slideIndex.current-1].className += " active";
        }

        // Source: https://stackoverflow.com/questions/40325035/document-ready-settimeout - Zane
        let functionDone = false;

        // Change image every 5 seconds
        let timeout = setTimeout(function() {
            showSlidesAuto();
            functionDone = true;
        }, 5000);

        $(function() {
            if (!functionDone) {
                // Clear time interval function once new page loads
                clearTimeout(timeout);

                showSlidesAuto();
            }   
        });
    }, []);

    return(
        <React.Fragment>
            {/* NOTE: Majority of this code is starter code. */}
            {/* Source: https://www.w3schools.com/howto/howto_js_slideshow.asp - Zane */}
            {/* Slideshow wrapper */}
            <div className="slideshow_wrapper">
                <div className="slideshow-container">

                    {/* Full-width images with number and caption text */}
                    <div className="mySlides fade image_display">
                        <img srcSet={hands} alt="People putting hands into a group." style={{width: "100%"}} />
                        <p className="text slide_image_desc image_desc">People putting hands into a group.</p>
                    </div>

                    <div className="mySlides fade image_display">
                        <img srcSet={homes} alt="Looking out upon a hill with homes under a cloudy blue sky." style={{width: "100%"}} />
                        <p className="text slide_image_desc image_desc">Looking out upon a hill with homes under a cloudy blue sky.</p>
                    </div>

                    <div className="mySlides fade image_display">
                        <img srcSet={people} alt="Professionals gathered smiling." style={{width: "100%"}} />
                        <p className="text slide_image_desc image_desc">Professionals gathered smiling.</p>
                    </div>

                    {/* Next and previous buttons */}
                    <button className="prev" onClick={ () => {plusSlides(-1)}}>&#10094;</button>
                    <button className="next" onClick={ () => {plusSlides(1)}}>&#10095;</button>
                    <br />
                </div>

                {/* The dots/circles */}
                <div style={{textAlign: "center"}}>
                    <span className="dot" onClick={ () => {currentSlide(1)}}></span>
                    <span className="dot" onClick={ () => {currentSlide(2)}}></span>
                    <span className="dot" onClick={ () => {currentSlide(3)}}></span>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Slideshow;

// PropTypes for jest testing in App.test.js
Slideshow.propTypes = {
    hands: PropTypes.string.isRequired,
    homes: PropTypes.string.isRequired,
    people: PropTypes.string.isRequired
}