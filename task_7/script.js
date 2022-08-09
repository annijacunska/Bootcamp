// var myVar;

// function myFunction() {
//   myVar = setTimeout(showPage, 3000);

// }

// function showPage() {
//   document.getElementById("loader").style.display = "none";
//   document.getElementById("myDiv").style.display = "block";
// }

const wait = (delay = 0) =>
  new Promise(resolve => setTimeout(resolve, delay));

document.addEventListener('DOMContentLoaded', () =>
  wait(0).then(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
  }));

  