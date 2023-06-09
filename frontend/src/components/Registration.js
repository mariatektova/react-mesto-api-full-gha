import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

export default function Login({ onRegistration }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegistration(email, password);
  }
  return (
    <section className="login">
      <div className="login__container">
        <form className="login__form" onSubmit={handleSubmit}>
          <h2 className="login__title">Регистрация</h2>
          <input
            className="login__input"
            type="email"
            placeholder="Email"
            onChange={handleChangeEmail}
          />
          <input
            className="login__input"
            type="password"
            placeholder="Пароль"
            onChange={handleChangePassword}
          />
          <button type="submit" className="login__button-submit">
            Зарегистрироваться
          </button>
          <Link to="/sign-in" className="login__link">
            <span className="login__question">Уже зарегистрированы? </span>
            Войти
          </Link>
        </form>
      </div>
    </section>
  );
}
