import './pages/index.css'
import Api from './Scripts/Api.js'
import Card from './Scripts/Card.js'
import CardList from './Scripts/CardList.js'
import FormValidator from './Scripts/FormValidator.js'
import Popup from './Scripts/Popup.js'
import PopupImg from './Scripts/PopupImg.js'
import UserInfo from './Scripts/UserInfo.js'
// Подключение к серверу
const API_URL = NODE_ENV === 'production' ? 'https://nomoreparties.co' : 'http://nomoreparties.co';

// Подключение к серверу
const config = {
  url: `${API_URL}/cohort11/`,
  headers: {
    authorization: 'aafbd586-86fd-433f-8d97-fd0d2e79138b',
  },
  user: 'ab33c4417cb29a50bc589a09'
}
const api = new Api(config);

// аватар
const avatarOpenButton = document.querySelector('.user-info__photo');
const avatarForm = document.querySelector('.avatar-popup');
const avatarFormData = avatarForm.querySelector('.popup__form');
const avatarCloseButton = avatarForm.querySelector('.popup__close');
const avatarPopup = new Popup(avatarForm, avatarOpenButton, avatarCloseButton);
avatarPopup.openButton.addEventListener('click', avatarPopup.open);
avatarPopup.closeButton.addEventListener('click', function () {
  avatarPopup.open();
  avatarFormValidator.reset();
  avatarFormValidator.setSubmitButtonState();
})

// обновить аватар
avatarFormData.addEventListener('submit', function (event) {
  event.preventDefault();
  const avatarLink = event.target.avatar.value;
  const avatarSubmitButton = avatarFormData.querySelector('.button');
  avatarSubmitButton.textContent = 'Загрузка...';
  api.updateAvatar(avatarLink)
    .then(data => {
      avatarPopup.openButton.style.backgroundImage = `url("${data.avatar}")`;
      avatarPopup.open();
      avatarFormValidator.reset();
      avatarFormValidator.setSubmitButtonState();
      avatarSubmitButton.textContent = 'Сохранить';
    })
    .catch(err => console.log(err));
})

// попап новой карточки
const newCardForm = document.querySelector('.popup');
const newCardData = document.querySelector('#new-card');
const newCardButton = document.querySelector('.user-info__button');
const closeFormButton = newCardForm.querySelector('.popup__close');
const newCardPopup = new Popup(newCardForm,newCardButton,closeFormButton);
newCardPopup.openButton.addEventListener('click', newCardPopup.open);
newCardPopup.closeButton.addEventListener('click', function () {
  newCardPopup.open();
  newCardFormValidator.reset();
  newCardFormValidator.setSubmitButtonState();
});

// попап формы профиля
const editForm = document.querySelector('.edit-popup');
const editFormData = document.querySelector('#edit-form');
const editProfileButton = document.querySelector('.user-info__edit');
const closeEditButton = editForm.querySelector('.popup__close');
const editProfileForm = new Popup(editForm,editProfileButton,closeEditButton);
editProfileForm.openButton.addEventListener('click', editProfileForm.open);
editProfileForm.closeButton.addEventListener('click', function () {
  editProfileForm.open();
  editFormValidator.reset();
  const button = editProfileForm.popup.querySelector('.button');
  button.classList.add('popup__button_mode_on');
  button.removeAttribute('disabled');
});

// валидировать формы
const editFormValidator = new FormValidator(editFormData);
const newCardFormValidator = new FormValidator(newCardData);
const avatarFormValidator = new FormValidator(avatarFormData);

// попап картинки
const picElement = document.querySelector('.image-popup');
const picClose = picElement.querySelector('.image-popup__close');
const imagePopup = new PopupImg(picElement, picClose);

// создает инстанс класса Card и преобразует его в ДОМ-ноду
function assembleCard(cardObj,imgHandler,api) {
  const card = new Card(cardObj,imgHandler,api);
  if (cardObj.owner._id !== api.user) {
    card.deletable = false;
  }
  if (cardObj.likes.find(item => item._id === api.user)) {
    card.isLiked = true;
  }
  return card.createCard();
}

// добавить новую карточку
newCardData.addEventListener('submit', function (event) {
  event.preventDefault();
  const cardName = event.target.elements.place.value;
  const cardLink = event.target.elements.link.value;
  const addCardButton = newCardData.querySelector('.button');
  addCardButton.style.fontSize = '18px';
  addCardButton.textContent = 'Загрузка...';
  api.postCard(cardName, cardLink)
    .then(data => {
      const newCard = assembleCard(data, imagePopup.open, api);
      cardsContainer.addCard(newCard);
      newCardPopup.open();
      newCardFormValidator.reset();
      newCardFormValidator.setSubmitButtonState();
      addCardButton.style.fontSize = '36px';
      addCardButton.textContent = '+';
    })
    .catch(err => console.log(err));
});

// управление данными профиля
const userData = new UserInfo();
const userName = document.querySelector('.user-info__name');
const userAbout = document.querySelector('.user-info__job');
const userAvatar = document.querySelector('.user-info__photo');

api.getUser()
  .then(data => {
    userData.setUserInfo(data.name, data.about);
    userData.setAvatar(data.avatar);
    userData.updateUserInfo(userName, userAbout);
    userData.updateAvatar(userAvatar);
  })
  .catch(err => console.log(err));

// дать форме данные из объекта при открытии
editProfileButton.addEventListener('click', function () {
  const nameField = editForm.querySelector('#name');
  const aboutField = editForm.querySelector('#about');
  nameField.value = userData.name;
  aboutField.value = userData.about;
});

// Обновить данные профиля
editFormData.addEventListener('submit', function (event) {
  event.preventDefault();
  const nameField = editForm.querySelector('#name');
  const aboutField = editForm.querySelector('#about');
  const updateProfileButton = editFormData.querySelector('.button');
  updateProfileButton.textContent = 'Загрузка...';
  api.updateUser(nameField.value,aboutField.value)
    .then((data) => {
      userData.setUserInfo(data.name, data.about);
      userData.updateUserInfo(userName,userAbout);
      updateProfileButton.textContent = 'Сохранить';
      editProfileForm.open();
    })
    .catch(err => console.log(err));
});

// отрисовка карточек из коллекции
const cardsContainer = new CardList(document.querySelector('.places-list'));
api.getCards()
  .then(res => {
    cardsContainer.render(res.map(function (item) {
      return assembleCard(item, imagePopup.open, api);
    }))
  })
  .catch(err => console.log(err));