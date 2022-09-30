import React from 'react'
import './Landing.css'
import { TwitterOutlined,SendOutlined } from '@ant-design/icons';

function Landing1() {
  return (
    <>
      <div>
        <section class="banner-section home-4" style={{ backgroundImage: 'url(assets/images/banner/8.webp);' }}>
          <div class="container">
            <div class="banner-wrapper">
              <div class="row align-items-center g-5">
                <div class="col-lg-6">
                  <div class="banner-content">
                    <h1>
                      {' '}
                      <span class="theme-color-4">Buy</span>
                      <span style={{ color: 'white' }}>, sell and</span>{' '}
                      <span class="theme-color-4">
                        {' '}
                        <br /> Collect{' '}
                      </span>{' '}
                      <span style={{ color: 'white' }}>NFTs.</span>
                    </h1>
                    <p style={{ color: 'white' }}>
                      The world's largest digital marketplace for crypto collectibles and non-fungible tokens
                    </p>
                    <div class="banner-btns d-flex flex-wrap">
                      <a data-blast="bgColor" href="explore.html" class="default-btn move-top">
                        <span>Explore</span>{' '}
                      </a>
                      {/* <!-- <a href="#" class="default-btn move-right"><span>Create</span> </a> --> */}
                    </div>
                  </div>
                </div>
                <div class="col-lg-5">
                  <div class="nft-slider-wrapper">
                    <div class="swiper banner-item-slider-2">
                      <div class="swiper-wrapper">
                        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                          <div class="carousel-inner">
                            <div class="carousel-item active">
                              <div class="swiper-slide">
                                <div class="nft-item home-4">
                                  <div class="nft-inner">
                                    <div class="nft-item-top d-flex justify-content-between align-items-center"></div>

                                    <div class="nft-item-bottom">
                                      <div class="nft-thumb">
                                        <img
                                          loading="lazy"
                                          src="assets/images/banner/1.png"
                                          class="img_banner"
                                          alt="nft-img"
                                        />
                                      </div>
                                      <div class="nft-content text-center">
                                        <h4>
                                          <a href="#">UleTron </a>{' '}
                                        </h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="carousel-item">
                              <div class="swiper-slide">
                                <div class="nft-item home-4">
                                  <div class="nft-inner">
                                    <div class="nft-item-top d-flex justify-content-between align-items-center"></div>

                                    <div class="nft-item-bottom">
                                      <div class="nft-thumb">
                                        <img
                                          loading="lazy"
                                          src="assets/images/banner/2.png"
                                          class="img_banner"
                                          alt="nft-img"
                                        />
                                      </div>
                                      <div class="nft-content text-center">
                                        <h4>
                                          <a href="#">UleTron</a>{' '}
                                        </h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="carousel-item">
                              <div class="swiper-slide">
                                <div class="nft-item home-4">
                                  <div class="nft-inner">
                                    <div class="nft-item-bottom">
                                      <div class="nft-thumb">
                                        <img
                                          loading="lazy"
                                          src="assets/images/banner/3.png"
                                          class="img_banner"
                                          alt="nft-img"
                                        />
                                      </div>
                                      <div class="nft-content text-center">
                                        <h4>
                                          <a href="#">UleTron</a>{' '}
                                        </h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="carousel-item">
                              <div class="swiper-slide">
                                <div class="nft-item home-4">
                                  <div class="nft-inner">
                                    <div class="nft-item-bottom">
                                      <div class="nft-thumb">
                                        <img
                                          loading="lazy"
                                          src="assets/images/banner/4.png"
                                          class="img_banner"
                                          alt="nft-img"
                                        />
                                      </div>
                                      <div class="nft-content text-center">
                                        <h4>
                                          <a href="#">UleTron</a>{' '}
                                        </h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
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
        {/* <!-- ===============//banner section end here \\================= -->
      <!-- ==========wallet Section start Here========== --> */}
        <section class="wallet-section padding-top padding-bottom">
          <div class="container">
            <div class="section-header style-4 mt_3">
              <div class="header-shape">
                <span></span>
              </div>
              <h3 style={{ color: 'white' }}>All Wallet Options</h3>
            </div>
            <div class="wallet-inner">
              <div class="row g-3">
                <div class="col-lg-3 col-sm-4 col-6">
                  <div class="wallet-item home-4">
                    <div class="wallet-item-inner text-center">
                      <div class="wallet-thumb">
                        <a href="https://metamask.io/download/" target="_blank">
                          <img src="assets/images/wallet/06.png" alt="wallet-img" />
                        </a>
                      </div>
                      <div class="wallet-content">
                        <h5>
                          <a href="https://metamask.io/download/" target="_blank" style={{ color: 'white' }}>
                            Meta Mask
                          </a>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-sm-4 col-6">
                  <div class="wallet-item home-4">
                    <div class="wallet-item-inner text-center">
                      <div class="wallet-thumb">
                        <a href="https://alphawallet.com/for-user/best-wallet-for-polygon/" target="_blank">
                          <img src="assets/images/wallet/01.png" alt="wallet-img" />
                        </a>
                      </div>
                      <div class="wallet-content">
                        <h5>
                          <a
                            href="https://alphawallet.com/for-user/best-wallet-for-polygon/"
                            target="_blank"
                            style={{ color: 'white' }}
                          >
                            Alpha Wallet
                          </a>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-sm-4 col-6">
                  <div class="wallet-item home-4">
                    <div class="wallet-item-inner text-center">
                      <div class="wallet-thumb">
                        <a href="https://trustwallet.com/dapp/" target="_blank">
                          <img src="assets/images/wallet/02.png" alt="wallet-img" />
                        </a>
                      </div>
                      <div class="wallet-content">
                        <h5>
                          <a href="https://trustwallet.com/dapp/" target="_blank" style={{ color: 'white' }}>
                            Trust Wallet
                          </a>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-sm-4 col-6">
                  <div class="wallet-item home-4">
                    <div class="wallet-item-inner text-center">
                      <div class="wallet-thumb">
                        <a href="https://www.tokenpocket.pro/en" target="_blank">
                          <img src="assets/images/wallet/03.png" alt="wallet-img" />
                        </a>
                      </div>
                      <div class="wallet-content">
                        <h5>
                          <a href="https://www.tokenpocket.pro/en" target="_blank" style={{ color: 'white' }}>
                            Token Pocket
                          </a>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      

        <a href="#" class="scrollToTop">
          <i class="icofont-stylish-up"></i>
        </a>

        <script src="assets/js/jquery-3.6.0.min.js"></script>
        <script src="assets/js/bootstrap.bundle.min.js"></script>
        <script src="assets/js/waypoints.min.js"></script>
        <script src="assets/js/lightcase.js"></script>
        <script src="assets/js/swiper-bundle.min.js"></script>
        <script src="assets/js/countdown.min.js"></script>
        <script src="assets/js/jquery.counterup.min.js"></script>
        <script src="assets/js/wow.min.js"></script>
        <script src="assets/js/isotope.pkgd.min.js"></script>
        <script src="assets/js/functions.js"></script>
      </div>
    </>
  )
}

export default Landing1
