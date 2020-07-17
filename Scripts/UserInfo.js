class UserInfo {
  /**
   * Можно лучше:
   * Сохранять nameField и aboutField в конструкторе, чтобы не передавать их при каждом updateUserInfo
   */

  setUserInfo = (nameNew,aboutNew) => {
    this.name = nameNew;
    this.about = aboutNew;
  }

  updateUserInfo (nameField, aboutField) {
    nameField.textContent = this.name;
    aboutField.textContent = this.about;
  }
}