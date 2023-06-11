import React from "react";
import logo from "../images/logo.svg";
import { Link, Route, Routes } from "react-router-dom";

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип" />
      <div className="header__menu">
        <span className="header__email">{email}</span>
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link className="header__login" to="/sign-in">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link className="header__login" to="/sign-up">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <Link className="header__login" onClick={onSignOut} to="/sign-in">
                Выйти
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
