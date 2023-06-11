import React, { useState } from "react";

export default function Login({ onAuthorize }) {
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
    onAuthorize(email, password);
    console.log("gegege");
  }
  return (
    <section className="login">
      <div className="login__container">
        <form className="login__form" onSubmit={handleSubmit}>
          <h2 className="login__title">Вход</h2>
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
            Войти
          </button>
        </form>
      </div>
    </section>
  );
}
