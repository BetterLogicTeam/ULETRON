import React from 'react';
import './Footer.css'
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import { TwitterOutlined,SendOutlined } from '@ant-design/icons';
import { ImReddit } from "react-icons/im";
import { FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <div>
        <footer class="footer-section style-4">
          <div class="footer-top">
            <div class="footer-links padding-top">
              <div class="container">
                <div class="row">
                  <div class="col-md-3">
                    <div class="footer-link-item">
                      <img className='foot-img' src="assets/images/logo.png" style={{ height: '40px;' }} />
                    </div>
                  </div>
                  <div class="col-md-1"></div>
                  <div class="col-md-3">
                    <div class="footer-link-item">
                      <h5 style={{ color: 'white' }}>Quick Links</h5>
                      <ul class="footer-link-list">
                        {/* <!--  <li><a href="#" class="footer-link">White Paper</a></li>
                              <li><a href="contact.html" class="footer-link">User Support</a></li>
                              <li><a href="#" class="footer-link">Report a Bug</a></li>----> */}
                        <li>
                          <a href="/Explore_main" class="footer-link" style={{ color: 'white' }}>
                            Explore
                          </a>
                        </li>
                        <li>
                          <a href="/" class="footer-link" style={{ color: 'white' }}>
                            Contact Us{' '}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="footer-link-item">
                      <h5 style={{ color: 'white' }}>Quick Links</h5>
                      <ul class="footer-link-list">
                        <li>
                          <a href="/" class="footer-link" style={{ color: 'white' }}>
                            Terms & Services
                          </a>
                        </li>
                        <li>
                          <a href="/" class="footer-link" style={{ color: 'white' }}>
                            Privacy Policy
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="footer-link-item">
                      <h5 style={{ color: 'white' }}> Follow Us</h5>
                      <ul class="footer-link-list">
                        {/* <!-- <li><a href="#" class="footer-link"><i class="icofont-facebook"></i> Facebook</a></li> --> */}
                        <li>
                          <a href="/" class="footer-link">
                          <TwitterOutlined /> Twitter
                          </a>
                        </li>
                        {/* <!-- <li><a href="#" class="footer-link"><i class="icofont-reddit"></i> Reddit</a></li> --> */}
                        <li>
                          <a href="https://t.me/joinchat/Gbv-0Ts-LUaPmZhd" target="_blank" class="footer-link">
                          <SendOutlined /> Telegram
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <div class="container">
              <p class="text-center py-4 mb-0" style={{color:'white'}}>All rights reserved &copy; uletron.live</p>
            </div>
          </div>
        </footer>
    </div>
  )
}

export default Footer