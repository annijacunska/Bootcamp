const wait = (delay = 0) =>
  new Promise(resolve => setTimeout(resolve, delay));

// document.addEventListener('DOMContentLoaded', () =>
//   wait(0).then(() => {
//     document.querySelector(".skeleton-template").style.display = "none";
//     document.querySelector(".posts__post:not(.skeleton-template)").style.display = "block";
//   }));

window.onload = removeLoadingAnim;


function removeLoadingAnim () {
  wait(0).then(() => {
    document.querySelector(".skeleton-template").style.display = "none";
    document.querySelector(".posts__post:not(.skeleton-template)").style.display = "block";
  });
}