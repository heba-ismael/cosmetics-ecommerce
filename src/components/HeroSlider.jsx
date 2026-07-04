// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {Autoplay, Pagination } from "swiper/modules";

import heroImg1 from "../img/k.avif";
import heroImg2 from "../img/images (1).jpg";
import heroImg3 from "../img/sss.jpg";

function HeroSlider() {
  const scrollToShop = () => {
    document.getElementById("shop-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="hero">
        <div className="container">
          <Swiper
          loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={true}
            modules={[Pagination ,Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="content">
                <h4>Introducing the new</h4>
                <h3>
                  Beauty&fashion
                  <br />
                </h3>
                <p> Best Beauty Products </p>
                <button type="button" onClick={scrollToShop} className="btn">
                  Shop Now
                </button>
              </div>
              <img
                src={heroImg1}
                alt="Beauty and fashion collection preview 1"
                loading="eager"
              />
            </SwiperSlide>

            <SwiperSlide>
              <div className="content">
                <h4>Introducing the new</h4>
                <h3>
                  Beauty&fashion
                  <br />
                </h3>
                <p>Best Beauty Products </p>
                <button type="button" onClick={scrollToShop} className="btn">
                  Shop Now
                </button>
              </div>
              <img
                src={heroImg2}
                alt="Beauty and fashion collection preview 2"
                loading="lazy"
              />
            </SwiperSlide>

            <SwiperSlide>
              <div className="content">
                <h4>Introducing the new</h4>
                <h3>
                  Beauty&fashion
                  <br />
                </h3>
                <p> Best Beauty Products</p>
                <button type="button" onClick={scrollToShop} className="btn">
                  Shop Now
                </button>
              </div>
              <img src={heroImg3} alt="Beauty and fashion collection preview 3" loading="lazy" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default HeroSlider;
