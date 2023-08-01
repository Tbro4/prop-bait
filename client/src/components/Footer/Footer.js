import React from "react";
import "./Footer.css";
import Button from "@mui/material/Button";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        textAlign: "center",
        marginBottom: "7em",
      }}
    >
      <div className="footer__addr">
        <h1 className="footer__logo">
          {"{prop} bait"}&nbsp;<i className="fi fi-bs-fishing-rod"></i>
        </h1>

        <h2>Contact</h2>

        <address>
          Tyler Brooks 1234 Denver, CO
          <br />
          <a className="footer__btn" href="mailto:thetylerbrooks@gmail.com">
            Email Us
          </a>
          <div>
            <Button
              className="linkedin-button"
              href="https://www.linkedin.com/"
              target="blank"
              classes={{ root: "custom-button-root" }}
            >
              <LinkedInIcon
                classes={{ root: "custom-icon-root" }}
                fontSize="large"
              />
            </Button>
            <Button
              className="github-button"
              href="https://github.com/Tbro4"
              target="blank"
              classes={{ root: "custom-button-root" }}
            >
              <GitHubIcon
                classes={{ root: "custom-icon-root" }}
                fontSize="large"
              />
            </Button>
            <Button
              className="youtube-button"
              href="https://www.youtube.com/channel/UCON4NsNWaLm0t_arPoQEq_w"
              target="blank"
              classes={{ root: "custom-button-root" }}
            >
              <YouTubeIcon
                classes={{ root: "custom-icon-root" }}
                fontSize="large"
              />
            </Button>
            <Button
              className="instagram-button"
              href="https://www.instagram.com"
              target="blank"
              classes={{ root: "custom-button-root" }}
            >
              <InstagramIcon
                classes={{ root: "custom-icon-root" }}
                fontSize="large"
              />
            </Button>
            <Button
              className="facebook-button"
              href="https://www.facebook.com"
              target="blank"
              classes={{ root: "custom-button-root" }}
            >
              <FacebookIcon
                classes={{ root: "custom-icon-root" }}
                fontSize="large"
              />
            </Button>
          </div>
        </address>
      </div>

      <ul className="footer__nav">
        <li className="nav__item">
          <h2 className="nav__title">Company</h2>

          <ul className="nav__ul">
            <li>
              <Button className="footer__btn">About Us</Button>
            </li>

            <li>
              <Button className="footer__btn">Blog</Button>
            </li>

            <li>
              <Button className="footer__btn">Support</Button>
            </li>
          </ul>
        </li>

        <li className="nav__item nav__item--extra">
          <h2 className="nav__title">Customer Service</h2>

          <ul className="nav__ul nav__ul--extra">
            <li>
              <Button className="footer__btn">Shipping</Button>
            </li>

            <li>
              <Button className="footer__btn">Returns</Button>
            </li>

            <li>
              <Button className="footer__btn">Data Rights</Button>
            </li>

            <li>
              <Button className="footer__btn">Cookie Policy</Button>
            </li>
          </ul>
        </li>

        <li className="nav__item">
          <h2 className="nav__title">Legal</h2>

          <ul className="nav__ul">
            <li>
              <Button className="footer__btn">Privacy Policy</Button>
            </li>

            <li>
              <Button className="footer__btn">Terms of Use</Button>
            </li>

            <li>
              <Button className="footer__btn">Licenses</Button>
            </li>
          </ul>
        </li>
      </ul>

      <div className="legal">
        <p>
          &copy; 2023 Something. All rights reserved.
          <a
            href="https://www.flaticon.com/free-icons/sports-and-competition"
            title="sports and competition icons"
          >
            Sports and competition icons created by Roundicons Premium -
            Flaticon
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
