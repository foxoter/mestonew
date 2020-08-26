export default class CardList {
  constructor(container) {
    this.container = container;
  }

  // добавить элемент карточки в контейнер
  addCard(card) {
    this.container.appendChild(card);
  }

  // отрисовка карточек при загрузке
  render(array) {
    array.forEach(item => {
      this.addCard(item);
    })
  }
}



