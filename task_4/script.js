import {Post} from './Post.js';

let counter = 0;

let skeletonTemplate = document.querySelector('.posts__post.skeleton-template');
let postTemplate = document.querySelector('.posts__post.template');
let postContainer = document.querySelector('.posts');
createPostElement();

window.onscroll = function() {
  if(window.scrollY + window.innerHeight >= 
    document.documentElement.scrollHeight) {
    createPostElement();
  }
}

function createPostElement () {

  for (let i= 0; i < 5; i++) {
    let skeleton = skeletonTemplate.cloneNode(true);
    skeleton.classList.remove('temp');
    postContainer.append(skeleton);
    let post = postTemplate.cloneNode(true);
    post.classList.remove('template');
    post.dataset.id = counter;
    post.style.visibility = 'hidden';
    postContainer.append(post);
    let img = post.querySelector('.posts__post-media img');

    let postObj = new Post(counter);
    counter++;
    img.onload = function () {
      skeleton.remove();
      removeLoadingAnim();
    }
  }
}
// window.onload = removeLoadingAnim;

function removeLoadingAnim () {
  // document.querySelector(".skeleton-template").style.display = "none";
  // document.querySelector(".skeleton-template").remove();
  let posts = document.querySelectorAll(".posts__post:not(.skeleton-template)");
  for(let post of posts) {
    post.style.visibility = "visible";
  }
  postTemplate.remove();
}

