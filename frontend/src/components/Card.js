import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onOpenPopup }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = (card.owner._id || card.owner) === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked && 'element__like_active'
  }`;

  function handleClick() {
    onOpenPopup(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="element">
      <img
        onClick={() => onCardClick(card)}
        className="element__image"
        alt={card.name}
        src={card.link}
      />
      {isOwn && (
        <button className="element__delete-btn" onClick={handleClick} />
      )}
      <div className="element__item">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like_about">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="поставить лайк"
            onClick={handleLikeClick}
          ></button>
          <span className="element__like_counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
export default Card;
