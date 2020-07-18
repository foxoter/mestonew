import './pages/index.css'
import Api from './Scripts/Api.js'
import Card from './Scripts/Card.js'
import CardList from './Scripts/CardList.js'
import FormValidator from './Scripts/FormValidator.js'
import Popup from './Scripts/Popup.js'
import PopupImg from './Scripts/PopupImg.js'
import UserInfo from './Scripts/UserInfo.js'


// Подключение к серверу
const API_URL = NODE_ENV === 'production' ? 'https://praktikum.tk' : 'http://praktikum.tk';
const config = {
  url: `${API_URL}/cohort11/`,
  headers: {
    authorization: 'aafbd586-86fd-433f-8d97-fd0d2e79138b',
  }
}
const api = new Api(config);

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

// попап картинки
const picElement = document.querySelector('.image-popup');
const picClose = picElement.querySelector('.image-popup__close');
const imagePopup = new PopupImg(picElement, picClose);

// создает инстанс класса Card и преобразует его в ДОМ-ноду
function assembleCard(cardObj,imgHandler) {
  const card = new Card(cardObj,imgHandler);
  const assembledCard = card.createCard();
  return assembledCard;
}

// добавить новую карточку
newCardData.addEventListener('submit', function (event) {
  event.preventDefault();
  const objCard = {};
  objCard.name = event.target.elements.place.value;
  objCard.link = event.target.elements.link.value;
  const newCard =  assembleCard(objCard, imagePopup.open)
  cardsContainer.addCard(newCard);
  newCardPopup.open();
  newCardFormValidator.reset();
  newCardFormValidator.setSubmitButtonState();
});

// управление данными профиля
const userData = new UserInfo();
const userName = document.querySelector('.user-info__name');
const userAbout = document.querySelector('.user-info__job');

api.getUser()
  .then(data => {
    userData.setUserInfo(data.name, data.about);
    userData.updateUserInfo(userName, userAbout);
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
  api.updateUser(nameField.value,aboutField.value)
    .then(() => {
      userData.setUserInfo(nameField.value,aboutField.value);
      userData.updateUserInfo(userName,userAbout);
    })
    .catch(err => console.log(err));
  editProfileForm.open();
});

// отрисовка карточек из коллекции
const cardsContainer = new CardList(document.querySelector('.places-list'));
api.getCards()
  .then(res => {
    cardsContainer.render(res.map(function (item) {
      return assembleCard(item,imagePopup.open);
    }))
})
  .catch(err => console.log(err));

/**
 * Замечания исправлены, работа принята.
 * Желаю успехов в дальнейшем обучении!
 */