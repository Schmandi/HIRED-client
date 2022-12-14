import { Link } from "react-router-dom"
import ProfilePictureSquare from "../img/ProfilePictureSquare.png"
import CV from "../doc/CV.pdf"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilePdf, faCodeBranch } from "@fortawesome/free-solid-svg-icons"

import React from "react"

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to the <span className="nowrap">HIRED Issue Tracker!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          This app is intended as a coding example used for applications as a
          Full-Stack programmer. To start using the app, click "User Login" at
          the footer of the page. If you have any questions, or need the login
          credentials, don't hesitate to reach out to me!
        </p>
        <img
          src={ProfilePictureSquare}
          aria-hidden
          alt="Profile picture of Nicolas Schwandner"
          className="profile--picture"
        />
        <address className="public__addr">
          Nicolas Schwandner
          <br />
          Kabelgatan 37E
          <br />
          41457 Göteborg
          <br />
          Sweden
          <br />
          <a href="tel:+46793009693">(+46) 79 300 96 93</a>
          <br />
          <a href="mailto:nico.schwandner@gmail.com">
            nico.schwandner@gmail.com
          </a>
        </address>
        <div className="form__action-buttons">
          <a href={CV} without rel="noopener noreferrer" target="_blank">
            <button className="icon-button--action" title="View CV">
              <FontAwesomeIcon icon={faFilePdf} /> View CV
            </button>
          </a>
          <a
            href="https://github.com/Schmandi/HIRED-client"
            without
            rel="noopener noreferrer"
            target="_blank"
          >
            <button
              className="icon-button--action"
              title="View Client Source Code"
            >
              <FontAwesomeIcon icon={faCodeBranch} /> View Client Source Code
            </button>
          </a>
          <a
            href="https://github.com/Schmandi/HIRED-server"
            without
            rel="noopener noreferrer"
            target="_blank"
          >
            <button
              className="icon-button--action"
              title="View Server Source Code"
            >
              <FontAwesomeIcon icon={faCodeBranch} /> View Server Source Code
            </button>
          </a>
        </div>
        {/* https://github.com/Schmandi/HIRED-client */}
        {/* https://github.com/Schmandi/HIRED-server */}
      </main>
      <footer>
        <Link to="/login">User Login</Link>
      </footer>
    </section>
  )
  return content
}

export default Public
