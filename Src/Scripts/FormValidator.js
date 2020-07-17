export default class FormValidator {
  constructor(form) {
    this.form = form;
    this.inputs = Array.from(this.form.querySelectorAll('input'));
    this.button = this.form.querySelector('button');
    this.checkInputValidity = this.checkInputValidity.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.setSubmitButtonState = this.setSubmitButtonState.bind(this);
    this.setEventListeners();
  }

  checkInputValidity (inputElement) {
    const errorElement = this.form.querySelector(`#${inputElement.id}-error`);
    inputElement.setCustomValidity('');
    if (inputElement.validity.valueMissing) {
      inputElement.setCustomValidity('Это обязательно поле');
    } else if (inputElement.validity.typeMismatch) {
      inputElement.setCustomValidity('Здесь должна быть ссылка');
    } else if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
      inputElement.setCustomValidity('Должно быть от 2 до 30 символов');
    }
    errorElement.textContent = inputElement.validationMessage;
  }

  inputHandler (event) {
    this.checkInputValidity(event.target);
  }

  setSubmitButtonState () {

    const buttonState = this.inputs.every(function (item) {
      return item.validity.valid;
    });
    if (buttonState) {
      this.button.classList.add('popup__button_mode_on');
      this.button.removeAttribute('disabled');
    } else {
      this.button.classList.remove('popup__button_mode_on');
      this.button.setAttribute('disabled', 'disabled');
    }
  }

  reset () {
    const errors = this.form.querySelectorAll('.error-message');
    this.form.reset();
    errors.forEach(function (item) {
      item.textContent = '';
    });
  }

  setEventListeners () {
    this.form.addEventListener('input', this.inputHandler);
    this.form.addEventListener('input', this.setSubmitButtonState);
  }
}