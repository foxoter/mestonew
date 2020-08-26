export default class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
    this.user = config.user;
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

  postCard(name, link) {
    return fetch(`${this.url}cards`, {
      method: 'POST',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
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

  deleteCard = (cardId) => {
    return fetch(`${this.url}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.status);
        }
      });
  }

  likeCard = (cardId) => {
    return fetch(`${this.url}cards/like/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this.headers.authorization,
      }
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.status);
        } else {
          return res.json();
        }
      });
  }

  dislikeCard = (cardId) => {
    return fetch(`${this.url}cards/like/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.headers.authorization,
      },
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.status);
        } else {
          return res.json();
        }
      });
  }

  updateAvatar = (link) => {
    return fetch(`${this.url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: `${link}`,
      })
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.status);
        } else {
          return res.json();
        }
      });
  }
}