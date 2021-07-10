import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Swipers.css";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/bundle";
// import 'swiper/swiper-bundle.css';

const Swipers = (props) => {
  // let swiperList = null;
  return (
    <main className="main-single-view">
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        spaceBetween={100}
        effect={"coverflow"}
        keyboard={true}
        dir={"rtl"}
        navigation={{
          nextEl: "#next",
          prevEl: "#prev"
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 4,
          slideShadows: false
        }}
        slidesPerView={3}
        onSlideChange={(swiper) => {
          console.log(swiper.activeIndex);
          props.setIndex(swiper.activeIndex);
        }}
        onSwiper={(swiper) => {}}
      >
        {props.genderList.map((genderDetail, index) => {
          return (
            <SwiperSlide key={genderDetail.genderId}>
              <img
                src={genderDetail.genderImage}
                alt={genderDetail.genderName}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </main>
  );
};

export default Swipers;
