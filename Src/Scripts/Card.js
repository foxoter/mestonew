export default class Card {
  constructor(objCard, imgHandler, api) {
    this.name = objCard.name;
    this.link = objCard.link;
    this.imgHandler = imgHandler;
    this.likes = objCard.likes;
    this.deletable = true;
    this.cardId = objCard._id;
    this.removeHandler = api.deleteCard;
    this.remove = this.remove.bind(this);
    this.likeHandler = api.likeCard;
    this.dislikeHandler = api.dislikeCard;
    this.like = this.like.bind(this);
    this.isLiked = false;
  }

  // создает ДОМ-элемент карточки
  createCard() {
    const markup = `<div class="place-card">
        <div
        class="place-card__image"
        style="background-image: url(https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg)"
        >
          <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name">Камчатка</h3>
          <div class="place-card__likes">
            <button class="place-card__like-icon"></button>
            <p class="place-card__like-count">0</p>
          </div>
        </div>
      </div>`;

    const shell = document.createElement('div');
    shell.insertAdjacentHTML('afterbegin', markup);
    const newCard = shell.firstElementChild;
    newCard.querySelector('.place-card__name').textContent = this.name;
    newCard.querySelector('.place-card__image').setAttribute('style', `background-image: url(${this.link})`);
    newCard.querySelector('.place-card__like-count').textContent = this.likes.length;
    const deleteIcon = newCard.querySelector('.place-card__delete-icon');
    if (this.deletable) {
      deleteIcon.setAttribute('style', 'display: block');
    }
    const likeIcon = newCard.querySelector('.place-card__like-icon');
    if (this.isLiked) {
      likeIcon.classList.add('place-card__like-icon_liked');
    }
    this.setEventListeners(newCard);
    return newCard;
  }

  // обработчик лайка
  like(event) {
    let likesCount = event.target.parentNode.querySelector('.place-card__like-count');
    if (this.isLiked) {
      this.dislikeHandler(this.cardId)
        .then(res => {
          this.likes = res.likes;
          event.target.classList.remove('place-card__like-icon_liked');
          likesCount.textContent = this.likes.length;
          this.isLiked = !this.isLiked;
        })
        .catch(err => console.log(err));
    } else {
      this.likeHandler(this.cardId)
        .then(res => {
          this.likes = res.likes;
          event.target.classList.add('place-card__like-icon_liked');
          likesCount.textContent = this.likes.length;
          this.isLiked = !this.isLiked;
        })
        .catch(err => console.log(err));
    }
  }

  // обработчик удаления
  remove(event) {
    if (confirm('Точно удаляем?')) {
      const card = event.target.closest('.place-card');
      this.removeHandler(this.cardId)
        .then(() => {
          card.remove();
          card.removeEventListener('click', this.like);
          card.removeEventListener('click', this.remove);
          card.removeEventListener('click', this.imgHandler);
        })
        .catch(err => console.log(err));
    }
  }

  // вешает обработчики
  setEventListeners(card) {
    card.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    card.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    card.querySelector('.place-card__image').addEventListener('click', this.imgHandler);
  }
}