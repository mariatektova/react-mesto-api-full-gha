import React from "react";
import success from "../images/success.svg";
import unsuccess from "../images/unsuccess.svg";

export default function InfoTooltip({ isOpen, onClose, successful }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container-form popup_infotool">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup_infotool-image"
          src={successful ? success : unsuccess}
          alt=""
        />
        <h2 className="popup_infotool-title">{`${
          successful
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."
        }`}</h2>
      </div>
    </div>
  );
}
