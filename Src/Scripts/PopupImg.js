export default class PopupImg {
  constructor(popup,closeButton) {
    this.popup = popup;
    this.closeButton = closeButton;
    this.setEventListeners();
  }

  open = (event) => {
    if (event.target.classList.contains('place-card__image')) {
      const imgElement = this.popup.querySelector('.image-popup__picture');
      const imgLink = event.target.style.backgroundImage.slice(5, -2);
      this.popup.classList.toggle('popup_is-opened');
      imgElement.setAttribute('src', imgLink);
    } else if (event.target.classList.contains('image-popup__close')) {
      this.popup.classList.toggle('popup_is-opened');
    }
  }

  setEventListeners () {
    this.closeButton.addEventListener('click', this.open);
  }
}