let images = [
  "./img/1.jpg",
  "./img/2.jpg",
  "./img/3.jpg",
  "./img/4.jpg",
  "./img/5.jpg",
  "./img/6.jpg",
  "./img/7.jpg",
  "./img/8.jpg",
  "./img/9.jpg",
  "./img/10.jpg",
  "./img/11.jpg",
  "./img/12.jpg",
  "./img/13.jpg",
  "./img/14.jpg",
  "./img/15.jpg",
  "./img/16.jpg",
  "./img/17.jpg",
  "./img/18.jpg",
  "./img/19.jpg",
  "./img/20.jpg",
  "./img/21.jpg",
  "./img/22.jpg",
  "./img/23.jpg",
  "./img/24.jpg",
];

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

function renderImages() {
  for (let i = 0; i < images.length; i++) {
    document.getElementById("images").innerHTML += getImages(i, images);
  }
}

function start() {
  includeHTML();
  renderImages();
}

function getImages(i, images) {
  return `
    <img  onclick="showOverlay(${i})" class="img highlight" src="${images[i]}" alt="">
    `;
}

function showOverlay(i) {
  let numberOfImages = images.length;
  let dialogContent = document.getElementById("overlay");
  dialogContent.innerHTML = "";
  document.getElementById("overlay").classList.remove("d_none");
  dialogContent.innerHTML += fillDialog(i, numberOfImages);
}

function fillDialog(i, numberOfImages) {
  return `<div onclick="event.stopPropagation()" id="dialog" class="dialog prevent-select">
                                <span onclick="hideOverlay()" class="close_img highlight" >x</span>
                                <img class="big_img" src="${images[i]}" alt="">
                                <div class="dialog_bottom_section">
                                  <span onclick="previousImage(${i - 1})" class="left_arrow highlight"><</span>
                                  <span class="counter" >${i + 1}/${numberOfImages}</span>
                                  <span onclick="nextImage(${i + 1})" class="right_arrow highlight">></span>
                                </div>
                              </div>`;
}

function hideOverlay() {
  document.getElementById("overlay").classList.add("d_none");
}

function nextImage(i) {
  if (i == images.length) {
    i = 0;
  }
  showOverlay(i);
}

function previousImage(i) {
  if (i == -1) {
    i = images.length - 1;
  }
  showOverlay(i);
}
