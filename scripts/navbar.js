//slider js begin

const slides = document.querySelectorAll(".slide");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let counter = 0;
slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`
})
function slideImg() {
    slides.forEach((slide) => {
        slide.style.transform = `translateX(-${counter * 100}%)`
    })
}
btn1.addEventListener("click", () => {
    if (counter == 0) {
        counter = 3;
    }
    counter--;
    slideImg();

})
btn2.addEventListener("click", () => {
    if (counter == 2) {
        counter = -1;
    }
    counter++;
    slideImg();

})

//slider js ends

//media dropdown
let dropCheck = false
let ddcontent = document.querySelector(".ddcontent");
document.querySelector(".dropButton").addEventListener("click", (e) => {
    e.preventDefault();
    if (!dropCheck) {
        ddcontent.style.display = "block";
        dropCheck = true;
    }
    else {
        ddcontent.style.display = "none";
        dropCheck = false;
    }

})