import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithConfirm({ isOpen, onClose, onCardDelete, card }) {
  function handleCardDelete(e) {
    e.preventDefault();
    onCardDelete(card);
  }
  return (
    <PopupWithForm
      title="Вы уверены?"
      name="question"
      isOpen={isOpen}
      btnCurrentText="Да"
      onSubmit={handleCardDelete}
      onClose={onClose}
    ></PopupWithForm>
  );
}
export default PopupWithConfirm;
