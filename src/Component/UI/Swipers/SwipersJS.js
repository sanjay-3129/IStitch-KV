import React from "react";
// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";
import "./SwipersJS.css";
// import Swiper styles
import "swiper/swiper-bundle.css";

const SwipersJS = (props) => {
  var swiperZoom = new Swiper(".swiper-container", {
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "3",
    spaceBetween: 100,
    effect: "coverflow",
    keyboard: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 4,
      slideShadows: false
    }
  });

  return (
    <main class="main-single-view">
      <div class="swiper-container" dir="rtl">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="https://32iio.csb.app/images/men.png" alt="Men" />
          </div>
          <div class="swiper-slide">
            <img src="https://32iio.csb.app/images/women.png" alt="Women" />
          </div>
          <div class="swiper-slide">
            <img src="https://32iio.csb.app/images/kid.png" alt="Kid" />
          </div>
          <div class="swiper-slide">
            <img src="https://32iio.csb.app/images/girl.png" alt="Girl" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SwipersJS;
