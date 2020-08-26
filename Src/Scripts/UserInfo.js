export default class UserInfo {
  setUserInfo = (nameNew,aboutNew, avatarNew) => {
    this.name = nameNew;
    this.about = aboutNew;
  }

  updateUserInfo (nameField, aboutField) {
    nameField.textContent = this.name;
    aboutField.textContent = this.about;
  }

  setAvatar = (avatarLink) => {
    this.avatar = avatarLink;
  }

  updateAvatar = (avatarElement) => {
    avatarElement.style.backgroundImage = `url(${this.avatar})`;
  }
}