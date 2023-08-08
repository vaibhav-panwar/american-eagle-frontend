var dropdown = document.getElementsByClassName("dropdown-btn");
let btns = document.getElementById("pagination");
// var i;

// var k;
for (let i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}

fetchData(1);

function fetchData(pageno) {
    fetch(`http://localhost:8080/product?limit=9&page=${pageno}`)
        .then((res) => {
            let totalPost = res.headers.get('x-total-count');
            let totalBtn = Math.ceil(totalPost / 9);
            btns.innerHTML = "";
            for (let i = 1; i <= totalBtn; i++) {
                let a = createBtn(i);
                btns.append(a);
            }
            return res.json()
        })
        .then((data) => {
            if (!data.isError) {
                appendCard(data.data);
            }
            else {
                console.log(data.error);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function appendCard(data) {
    let products = document.getElementById("products");
    products.innerHTML = "";
    data.forEach((el) => {
        let card = createCard(el.title, el.image1, el.image2, el.price, el.discount, el.size, el._id);
        products.append(card);
    });
}

function createCard(title, image1, image2, price, discount, size, id) {
    let card = document.createElement("div");
    card.classList.add("card");
    let cardImg = document.createElement("div");
    cardImg.classList.add("card-img");
    let heart = document.createElement("button");
    heart.classList.add("heart");
    let fafa = document.createElement("i");
    fafa.classList.add("fa", "fa-heart-o");
    heart.append(fafa);
    let atoc = document.createElement("button");
    atoc.classList.add("atoc");
    atoc.innerText = "Add to Cart";
    cardImg.append(heart, atoc)
    cardImg.style.backgroundImage = `url(${image1})`;
    cardImg.addEventListener("mouseenter", () => {
        cardImg.style.backgroundImage = `url(${image2})`;
    })
    cardImg.addEventListener("mouseleave", () => {
        cardImg.style.backgroundImage = `url(${image1})`;
    })
    let cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");
    let pTitle = document.createElement("p");
    pTitle.classList.add("pTitle");
    pTitle.innerText = title;
    let tot = price - (price * (discount / 100));
    tot = Math.round(tot * 100);
    tot = tot / 100;
    let pPrice = document.createElement("p");
    pPrice.classList.add("pPrice");
    pPrice.innerText = `$${tot}`;
    let pDisc = document.createElement("span");
    pDisc.classList.add("pDisc");
    pDisc.innerText = `$${price}`;
    pPrice.appendChild(pDisc);
    cardInfo.append(pTitle, pPrice);
    card.append(cardImg, cardInfo);
    // console.log(size,id);
    return card
}
function createBtn(id) {
    let btn = document.createElement("button");
    btn.classList.add("pbtn");
    btn.setAttribute("data-page-number", id);
    btn.classList.add("pagination-button");
    btn.textContent = id
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        fetchData(e.target.dataset.pageNumber)
    })
    return btn
}

let filter = {};
let genderInputs = document.querySelectorAll(".gender");
let categoryInputs = document.querySelectorAll(".category");
// console.log(genderInputs)
genderInputs.forEach((input) => {
    input.addEventListener("change", () => {
        updateFilters();
        let query = new URLSearchParams(filter);
        console.log(query.toString());
    })
})
categoryInputs.forEach((input) => {
    input.addEventListener("change", () => {
        updateFilters();
        let query = new URLSearchParams(filter);
        console.log(query.toString());
    })
})
function updateFilters() {
    let genderInputs = document.querySelectorAll(".gender");
    genderInputs.forEach((input) => {
        if (input.checked) {
            filter.gender = input.value;
        }
    })
    let categoryInputs = document.querySelectorAll(".category");
    categoryInputs.forEach((input) => {
        if (input.checked) {
            if (filter.category) {
                let a = filter.category;
                let c = `${a} ${input.value}`;
                filter.category = c;
            }
            else {
                filter.category = input.value;
            }
        }
    })
    let sizeInputs = document.querySelectorAll("#id");
}