import { getElement } from "./get.js";
function Modal(element) {
  this.container = element;
  this.list = [...element.querySelectorAll(".img")];
  this.close = getElement(".close");
  this.next = getElement(".next");
  this.prev = getElement(".prev");
  this.modal = getElement(".modal");
  this.mainImage = getElement(".main-image");
  this.smallImages = getElement(".small-images");

  // this.showModal = this.showModal.bind(this);
  this.container.addEventListener("click", this.showModal.bind(this));
}


Modal.prototype.showModal = function (e) {
  this.selectedImage = e.target;
  console.log(this.selectedImage);
  this.modal.classList.add("show-modal");
  this.mainImage.src = this.selectedImage.src;
  this.id = this.selectedImage.dataset.id;
  // console.log(this.id);
  this.smallImages.innerHTML = this.list
    .map((each) => {
      return `<img src="${each.src}" class="${
        each.dataset.id === this.id ? "selected img" : "img"
      }" title="${each.title}" data-id="${each.dataset.id}" alt="${each.alt}">`;
    })
    .join("");
  // console.log(this.smallImages);
  this.close.addEventListener("click", this.closeModal.bind(this));
  this.next.addEventListener("click", this.nextImage.bind(this));
  this.prev.addEventListener("click", this.prevImage.bind(this));
  this.smallImages.addEventListener("click",this.modalSelected.bind(this))

};

Modal.prototype.closeModal = function () {
  // console.log(this);
  this.modal.classList.remove("show-modal");
};
Modal.prototype.nextImage = function () {
  const newSelected = this.smallImages.querySelector('.selected')
  const nextEl = newSelected.nextElementSibling || this.smallImages.firstElementChild
  // console.log(this.newSelected, nextEl);
  newSelected.classList.remove('selected')
  nextEl.classList.add('selected')
  this.mainImage.src = nextEl.src

};
Modal.prototype.prevImage = function () {
  // console.log(this);
const newSelected = this.smallImages.querySelector(".selected");
const prevEl =
  newSelected.previousElementSibling || this.smallImages.lastElementChild;
// console.log(this.newSelected, prevEl);
newSelected.classList.remove("selected");
prevEl.classList.add("selected");
this.mainImage.src = prevEl.src;

};

Modal.prototype.modalSelected = function (e) {
  const selected = this.smallImages.querySelector(".selected")
  const newEle = e.target
  this.mainImage.src = newEle.src
  newEle.classList.add("selected")
  selected.classList.remove("selected")

}


const natureCon = getElement(".nature");
const cityCon = getElement(".city");

const nature = new Modal(natureCon);
const city = new Modal(cityCon);
