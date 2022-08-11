import {fetchAPI} from './fetch.js';

export class Post {
  
  constructor (id) {
    this.id = id;
    this.fillPost();
    this.postContainerSelector = `.posts__post[data-id='${this.id}']`;
  }

  #imageAPIsrc = 'https://dog.ceo/api/breeds/image/random';
  #textAPIsrc = 'https://uselessfacts.jsph.pl/random.json';
  #infoAPIscr = 'https://randomuser.me/api/';

  async fillPost() {
    this.#fetchInfo();
    this.#fetchImage();
    this.#fetchText();
  }
  
   #fetchInfo() {
    let obj = this;
    fetchAPI(obj.#infoAPIscr, function (response) {
      obj.#addInfo(response);
    });
  }
  
  #fetchText() {
    let obj = this;
    fetchAPI(obj.#textAPIsrc, function (response) {
      obj.#addText(response.text);
    });
  }
  
  #fetchImage() {
    let obj = this;
    fetchAPI(obj.#imageAPIsrc, function (response) {
      obj.#addImg(response.message);
    });
  }
  
  #addInfo(info) {
    let imageContainer = document.querySelector(this.postContainerSelector + ' .posts__post-info img');
    let nameContainer = document.querySelector(this.postContainerSelector + ' .posts__post-info .info h4');
    let profileName = info.results[0].name.first + ' ' + info.results[0].name.last;
    nameContainer.textContent = profileName;
    imageContainer.src = info.results[0].picture.thumbnail;
  }
  
  #addText(text) {
    let textContainer = document.querySelector(this.postContainerSelector + ' .posts__post-content p');
    textContainer.textContent = text;
  }
  
  #addImg(src) {
    let mediaContainer = document.querySelector(this.postContainerSelector + ' .posts__post-media img');
    mediaContainer.src = src;
  }
}