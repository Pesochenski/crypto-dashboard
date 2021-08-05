import React from "react";
import "./header.scss";
import Foreign from "../../assets/svg/foreign.svg";
// import ReactLogo from "../../assets/svg/reactLogo.svg";

export default function Header() {
  return (
    <header className="header">
      <div className="header__text">
        <h1 className="header__title">Cryptocurrency dashboard</h1>
        <p className="header__author">Pesochenski</p>
      </div>

      <div className="header__powered">
        <p className="header__powered-text">
          Powered by{" "}
          <a
            className="header__powered-link"
            href="https://reactjs.org"
            rel="noreferrer"
            target="_blank"
          >
            React
            <img src={Foreign} className="header__powered-logo" />
          </a>
        </p>
      </div>
    </header>
  );
}
