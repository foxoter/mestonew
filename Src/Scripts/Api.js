export default class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getCards() {
    return fetch(`${this.url}cards`, {
      headers: {
        authorization: this.headers.authorization
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(res.status);
        }
      });
  }


  getUser() {
    return fetch(`${this.url}users/me`, {
      headers: {
        authorization: this.headers.authorization
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(res.status);
        }
      });
  }


  updateUser(name,about) {
    return fetch(`${this.url}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res.status);
      }
    });
  }
}