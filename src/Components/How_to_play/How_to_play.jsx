import React from 'react';
import './How_to_play.css'

function How_to_play() {
  return (
    <div>
        <section class="auction-section padding-bottom">
          <div class="container">
            <div class="section-header style-4">
              <div class="header-shape">
                <span></span>
              </div>
              <h3 style={{ color: 'white' }}> HOW IT WORKS</h3>
            </div>
            <div class="how-it-works" id="howtoplay">
              <div class="container">
                <div class="">
                  <center>
                    <div class="how-it-works hide-large">
                      <h2 style={{ color: 'white' }}>How it works</h2>
                      <div>
                        <img src="assets/images/window.svg" class="window" alt="Join W3Schools - and create a space" />
                        <br />
                        <br />
                        <div class="step" style={{ color: 'white' }}>
                          1. CONNECT
                        </div>
                        <br />
                        <br />
                        <img
                          src="assets/images/layout.svg"
                          class="wtf"
                          alt="Choose a template - or start from scratch"
                        />
                        <br />
                        <br />
                        <div class="step" style={{ color: 'white' }}>
                          2. PURCHASE OR RENT
                        </div>
                        <br />
                        <br />
                        <img src="assets/images/Frame.svg" class="code-paper" alt="Edit your code and make it yours" />
                        <br />
                        <br />
                        <div class="step" style={{ color: 'white' }}>
                          3. PREPARE
                        </div>
                        <br />
                        <br />
                        <img src="assets/images/Frame1.svg" class="globe" alt="Share your space with someone " />
                        <br />
                        <br />
                        <div class="step" style={{ color: 'white' }}>
                          4. RACE
                        </div>
                        <br />
                        <br />
                      </div>
                    </div>
                  </center>

                  <div class="how-it-works hide-small">
                    <div class="images">
                      <img src="assets/images/window.svg" class="window" alt="Join W3Schools - and create a space" />
                      <img src="assets/images/line3.svg" class="line1" alt="" />
                      <img src="assets/images/layout.svg" class="wtf" alt="Choose a template - or start from scratch" />
                      <img src="assets/images/line1.svg" class="line2" alt="" />
                      <img src="assets/images/Frame.svg" class="code-paper" alt="Edit your code and make it yours" />
                      <img src="assets/images/line3.svg" class="line3" alt="" />
                      <img src="assets/images/Frame1.svg" class="globe" alt="Share your space with someone" />
                    </div>
                  </div>
                  <div class="how-it-works hide-small">
                    <div class="steps">
                      <div class="step" style={{ color: 'white' }}>
                        1. CONNECT
                      </div>
                      <div class="step" style={{ color: 'white' }}>
                        2. PURCHASE OR RENT
                      </div>
                      <div class="step" style={{ color: 'white' }}>
                        3. PREPARE
                      </div>
                      <div class="step" style={{ color: 'white' }}>
                        4. RACE
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

export default How_to_play