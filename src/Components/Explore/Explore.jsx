import React from "react";
import { useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Autoplay, EffectCards } from "swiper";

// import Card from "react-bootstrap/Card";
import "./Explore.css";

function Explore() {
  return (
    <div>
    <section class="auction-section padding-bottom">
      <div class="container">
        <div class="section-header style-4">
          <div class="header-shape">
            <span></span>
          </div>
          <h3 style={{ color: 'white' }}> Explore</h3>
        </div>
        <div class="section-wrapper">
          <div class="auction-holder">
            <div class="swiper-wrapper">
              <div class="swiper-slide swiper-ana " >
                <div class="nft-item home-4">
                  <div class="nft-inner">
                    {/* <!-- nft top part --> */}

                    {/* <!-- nft-bottom part --> */}
                    <div class="nft-item-bottom">
                      <div class="nft-thumb">
                        <img src="assets/images/banner/1.png" alt="nft-img" class="img_banner" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swiper-slide swiper-ana" >
                <div class="nft-item home-4">
                  <div class="nft-inner">
                    <div class="nft-item-bottom">
                      <div class="nft-thumb">
                        <img src="assets/images/banner/2.png" alt="nft-img" class="img_banner" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swiper-slide swiper-ana" >
                <div class="nft-item home-4">
                  <div class="nft-inner">
                    {/* <!-- nft top part -->
                          
                          <!-- nft-bottom part --> */}
                    <div class="nft-item-bottom">
                      <div class="nft-thumb">
                        <img src="assets/images/banner/3.png" alt="nft-img" class="img_banner" />
                        {/* <!-- nft countdwon --> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swiper-slide swiper-ana" >
                <div class="nft-item home-4">
                  <div class="nft-inner">
                    {/* <!-- nft top part -->
                          
                          <!-- nft-bottom part --> */}
                    <div class="nft-item-bottom">
                      <div class="nft-thumb">
                        <img src="assets/images/banner/4.png" alt="nft-img" class="img_banner" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</div>
  );
}

export default Explore;
