export default class UserInfo {
  setUserInfo = (nameNew,aboutNew) => {
    this.name = nameNew;
    this.about = aboutNew;
  }

  updateUserInfo (nameField, aboutField) {
    nameField.textContent = this.name;
    aboutField.textContent = this.about;
  }
}