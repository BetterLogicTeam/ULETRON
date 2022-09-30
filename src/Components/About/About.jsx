import React from 'react';
import './About.css'

function About() {
  return (
    <div>
         <section class="auction-section padding-bottom">
          <div class="container">
            <div class="section-header style-4">
              <div class="header-shape">
                <span></span>
              </div>
              <h3 style={{ color: 'white' }}> Who We Are</h3>
            </div>
            <div class="login-section ">
              <div class=" container">
                <div class="row g-5 align-items-center flex-md-row-reverse">
                  <div class="col-lg-6">
                    <div class="account-img">
                      <img src="assets/images/banner/1.webp" style={{ borderRadius: '10px' }} alt="shape-image" />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="banner-content">
                      <h1 class="abput">
                        {' '}
                        <span class="theme-color-5">About</span> <span style={{ color: 'white' }}>Us</span>
                      </h1>
                      <p style={{ color: 'white' }}>
                        {' '}
                        UleTron network is the premier marketplace for UleTron, which are digital items you can truly
                        own. Digital Items have existed for a long time, but never like this can be farm.
                      </p>
                      <div class="banner-btns d-flex flex-wrap">
                        <a data-blast="bgColor" href="/About_main" class="default-btn move-top">
                          <span>Read More</span>{' '}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default About