import React from "react";
import "./Image.css";
import $ from "jquery";

const ImageCarousel = () => {
  $(document).ready(function () {
    console.log("hello");
    $("#navigation ul li").css("display", "inline-block");
  });

  function openModal() {
    $("#myModal").css(("display", "block"));
  }

  function closeModal() {
    $("#myModal").css(("display", "block"));
  }

  // var slideIndex = 1;
  // showSlides(slideIndex);

  // function plusSlides(n) {
  //   showSlides((slideIndex += n));
  // }

  // function currentSlide(n) {
  //   showSlides((slideIndex = n));
  // }

  // function showSlides(n) {
  //   var i;
  //   var slides = document.getElementsByClassName("mySlides");
  //   var dots = document.getElementsByClassName("demo");
  //   var captionText = document.getElementById("caption");
  //   if (n > slides.length) {
  //     slideIndex = 1;
  //   }
  //   if (n < 1) {
  //     slideIndex = slides.length;
  //   }
  //   for (i = 0; i < slides.length; i++) {
  //     slides[i].style.display = "none";
  //   }
  //   for (i = 0; i < dots.length; i++) {
  //     dots[i].className = dots[i].className.replace(" active", "");
  //   }
  //   slides[slideIndex - 1].style.display = "block";
  //   dots[slideIndex - 1].className += " active";
  //   captionText.innerHTML = dots[slideIndex - 1].alt;
  // }

  return (
    <>
      <div class="row">
        <div class="column">
          <div className="thumb">
            <img
              src="/images/frnsto.png"
              style={{ width: "100%" }}
              onclick={openModal()}
              class="hover-shadow cursor"
              alt="l"
            />
            <p className="name">patterName- 450/-</p>
          </div>
        </div>
        <div class="column">
          <div className="thumb">
            <img
              src="/images/backdg.png"
              style={{ width: "100%" }}
              onclick={openModal()}
              class="hover-shadow cursor"
              alt="l"
            />
            <p className="name">patterName- 450/-</p>
          </div>
        </div>
        <div class="column">
          <div className="thumb">
            <img
              src="/images/slv.png"
              style={{ width: "100%" }}
              onclick={openModal()}
              class="hover-shadow cursor"
              alt="l"
            />
            <p className="name">patterName- 450/-</p>
          </div>
        </div>
        <div class="column">
          <div className="thumb">
            <img
              src="/images/cvb.png"
              style={{ width: "100%" }}
              onclick={openModal()}
              class="hover-shadow cursor"
              alt="l"
            />
            <p className="name">patterName- 450/-</p>
          </div>
        </div>
      </div>
      <div id="myModal" class="modal">
        <span class="close cursor" onclick={closeModal()}>
          &times;
        </span>
        <div class="modal-content">
          <div class="mySlides">
            <div class="numbertext">1 / 4</div>
            <img src="img_nature_wide.jpg" style={{ width: "100%" }} alt="l" />
          </div>

          <div class="mySlides">
            <div class="numbertext">2 / 4</div>
            <img src="img_snow_wide.jpg" style={{ width: "100%" }} alt="l" />
          </div>

          <div class="mySlides">
            <div class="numbertext">3 / 4</div>
            <img
              src="img_mountains_wide.jpg"
              style={{ width: "100%" }}
              alt="l"
            />
          </div>

          <div class="mySlides">
            <div class="numbertext">4 / 4</div>
            <img src="img_lights_wide.jpg" style={{ width: "100%" }} alt="l" />
          </div>

          {/* <a class="prev" onclick={plusSlides(-1)}>
            &#10094;
          </a>
          <a class="next" onclick={plusSlides(1)}>
            &#10095;
          </a> */}

          <div class="caption-container">
            <p id="caption"></p>
          </div>

          <div class="column">
            <img
              class="demo cursor"
              src="img_nature_wide.jpg"
              style={{ width: "100%" }}
              // onclick={currentSlide(1)}
              alt="Nature and sunrise"
            />
          </div>
          <div class="column">
            <img
              class="demo cursor"
              src="img_snow_wide.jpg"
              style={{ width: "100%" }}
              // onclick={currentSlide(2)}
              alt="Snow"
            />
          </div>
          <div class="column">
            <img
              class="demo cursor"
              src="img_mountains_wide.jpg"
              style={{ width: "100%" }}
              // onclick={currentSlide(3)}
              alt="Mountains and fjords"
            />
          </div>
          <div class="column">
            <img
              class="demo cursor"
              src="img_lights_wide.jpg"
              style={{ width: "100%" }}
              // onclick={currentSlide(4)}
              alt="Northern Lights"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCarousel;
