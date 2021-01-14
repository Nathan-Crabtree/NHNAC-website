import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

export const Slideshow = ({hands, homes, people, onSubmit}) => {

    // Source: https://www.w3schools.com/howto/howto_js_slideshow.asp - Zane 
    var slideIndex = 0;

    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
    }

    // Next/previous controls
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
  
    // Thumbnail image controls
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    useEffect(() => { 
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
            slideIndex++;

            // eslint-disable-next-line
            if (slideIndex > slides.length) {slideIndex = 1}
            slides[slideIndex-1].style.display = "block";
            dots[slideIndex-1].className += " active";
            //timer = setTimeout(showSlidesAuto, 5000); 
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

Slideshow.propTypes = {
    hands: PropTypes.string.isRequired,
    homes: PropTypes.string.isRequired,
    people: PropTypes.string.isRequired
}