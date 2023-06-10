import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditPriofliePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirm from "./PopupWithConfirm";
import Login from "./Login";
import Registration from "./Registration";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isPopupWithConfirmOpen, setPopupWithConfirmOpen] = useState(false);
  const [isInfotoolPopupOpen, setIsInfoToolPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardDeleteConfirm, setCardDeleteConfirm] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEmail, setIsEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/");
            setIsEmail(res.data.email);
          }
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getInfo()
        .then((profileInfo) => {
          setCurrentUser(profileInfo);
        })
        .catch((err) => {
          console.log(err);
        });

      api
        .getCards()
        .then((cardsData) => {
          setCards(
            cardsData.map((card) => ({
              _id: card._id,
              name: card.name,
              link: card.link,
              likes: card.likes,
              owner: card.owner,
            }))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setIsEmail(email);
          localStorage.setItem("jwt", res.token);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsInfoToolPopupOpen(true);
        console.log(err);
      });
  }
  function handleRegistration(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsSuccess(true);
          localStorage.setItem("jwt", res.token);
          setIsInfoToolPopupOpen(true);
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoToolPopupOpen(true);
        console.log(err);
      });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/sign-in");
    setIsEmail("");
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  function handleDeleteClick(card) {
    api
      .deleteCards(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closePopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateUser(newInfo) {
    api
      .setInfo(newInfo)
      .then((data) => {
        setCurrentUser(data);
        closePopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  function handleUpdateAvatar(newAvatar) {
    api
      .changeAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data);
        closePopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  function handleAddPlaceSubmit(data) {
    api
      .postCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closePopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  function handleEditProfileOpenClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlace() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(data) {
    setSelectedCard(data);
  }
  function handlePopupWithConfirm(card) {
    setCardDeleteConfirm(card);
    setPopupWithConfirmOpen(true);
  }
  function closePopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setPopupWithConfirmOpen(false);
    setSelectedCard(false);
    setIsInfoToolPopupOpen(false);
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onSignOut={handleSignOut} email={isEmail} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileOpenClick}
                onEditAvatar={handleEditAvatar}
                onAddPlace={handleAddPlace}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onOpenPopup={handlePopupWithConfirm}
                cards={cards}
              ></ProtectedRoute>
            }
          ></Route>
          <Route
            path="/sign-in"
            element={<Login onAuthorize={handleLogin} />}
          ></Route>
          <Route
            path="/sign-up"
            element={<Registration onRegistration={handleRegistration} />}
          ></Route>
        </Routes>
        <Footer />
        <ImagePopup />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closePopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closePopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closePopups}
          onAddPLace={handleAddPlaceSubmit}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closePopups}
          isOpen={selectedCard}
        />
      </div>
      <PopupWithConfirm
        isOpen={isPopupWithConfirmOpen}
        card={cardDeleteConfirm}
        onCardDelete={handleDeleteClick}
        onClose={closePopups}
      />
      <InfoTooltip
        isOpen={isInfotoolPopupOpen}
        successful={isSuccess}
        onClose={closePopups}
      />
    </CurrentUserContext.Provider>
  );
}
export default App;
