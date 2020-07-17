class  Popup {
  constructor(popup, openButton, closeButton) {
    this.popup = popup;
    this.openButton = openButton;
    this.closeButton = closeButton;
  }

  open = () => {
    this.popup.classList.toggle('popup_is-opened');
    this.popup.querySelector('.popup__input').focus();
  }
}