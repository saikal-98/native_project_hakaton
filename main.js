let API = "http://localhost:8000/cosmetics";

//? вытаскиваем инпуты
let title = document.querySelector("#title");
let category = document.querySelector("#category");
let description = document.querySelector("#desc");
let price = document.querySelector("#price");
let image = document.querySelector("#image");
let addBtn = document.querySelector("#addBtn");

// ? вытаскиваем инпуты из модалки

let editedTitle = document.querySelector(".edit-title");
let editedCategory = document.querySelector(".edit-category");
let editedDescr = document.querySelector(".edit-descr");
let editedPrice = document.querySelector(".edit-price");
let editedImage = document.querySelector(".edit-image");
let modal = document.querySelector("#exampleModal");
let editBtnAdd = document.querySelector(".save-btn");

let productList = document.querySelector(".product-list");

let paginList = document.querySelector(".pagin-list");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");

let currentPage = 1;
let pageTotalCount = 1;

// ?search
let search = document.querySelector("#search");
let searchVal = "";

addBtn.addEventListener("click", async () => {
  let obj = {
    title: title.value,
    category: category.value,
    description: description.value,
    price: price.value,
    image: image.value,
  };

  if (
    !obj.title.trim() ||
    !obj.category.trim() ||
    !obj.description.trim() ||
    !obj.price.trim() ||
    !obj.image.trim()
  ) {
    alert("fill to the blank please");
    return;
  }
  // ? отправляем пост запрос
  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  });
  // ? очищаем инпуты
  title.value = "";
  category.value = "";
  description.value = "";
  price.value = "";
  image.value = "";

  render();
});

// ?функция для отображения карточек продукта

async function render() {
  let res = await fetch(`${API}?q=${searchVal}&_page=${currentPage}&_limit=4`);
  let products = await res.json();

  paginationButtons();

  productList.innerHTML = "";

  products.forEach((item) => {
    let newItem = document.createElement("div");
    newItem.id = item.id;

    newItem.innerHTML += `<div class="card" style="width: 18rem;">
        <img src="${item.image}" class="card-img-top" alt="image">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <h2 class="card-title">${item.category}</h2>
          <p class="card-text">${item.description}</p>
          <p class="card-text">${item.price}</p>
          <a href="#" id=${item.id} class="btn btn-delete btn-primary">DELETE</a>
          <a href="#" id=${item.id} class="btn btn-edit btn-dark"   data-bs-toggle="modal" data-bs-target="#exampleModal">EDIT</a>
        </div>
      </div>`;
    productList.append(newItem);
  });
}
render();

// ? delete

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    let id = e.target.id;

    fetch(`${API}/${id}`, { method: "DELETE" }).then(() => render());
  }
});

// ? Отлавлтваем клик по кнопке edit
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-edit")) {
    let id = e.target.id;

    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // ? заполняем инпуты модального окна данными которые стянули с сервера
        editedTitle.value = data.title;
        editedPrice.value = data.price;
        editedDescr.value = data.description;
        editedImage.value = data.image;
        editedCategory.value = data.category;
        editBtnAdd.setAttribute("id", data.id);
      });
  }
});

editBtnAdd.addEventListener("click", function (e) {
  let id = e.target.id;
  let titleMod = editedTitle.value;
  let priceModal = editedPrice.value;
  let descrModal = editedDescr.value;
  let imageModal = editedImage.value;
  let categoryModal = editedCategory.value;

  if (
    !titleMod.trim() ||
    !priceModal.trim() ||
    !descrModal.trim() ||
    !imageModal.trim() ||
    !categoryModal.trim()
  ) {
    alert("fill to the blank");
    return;
  }

  let editedProduct = {
    title: titleMod,
    price: priceModal,
    description: descrModal,
    Url: imageModal,
    category: categoryModal,
  };
  saveEdit(editedProduct, id);
});
// TEST COMMMIT FOR GITHUB
function saveEdit(editedProduct, id) {
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(editedProduct),
  }).then(() => render());
  let myModal = bootstrap.Modal.getInstance(modal);
  myModal.hide();
}

// ?pagination

function paginationButtons() {
  fetch(`${API}?q=${searchVal}`)
    .then((res) => res.json())
    .then((data) => {
      pageTotalCount = Math.ceil(data.length / 4);
      paginList.innerHTML = "";

      for (let i = 1; i <= pageTotalCount; i++) {
        if (currentPage == i) {
          let page1 = document.querySelector("li");
          page1.innerHTML = `<li class="page-item active"><a class="page-link page-num" href="#">${i}</a></li>`;
          paginList.append(page1);
        } else {
          let page1 = document.querySelector("li");
          page1.innerHTML = `<li class="page-item"><a class="page-link page-num" href="#">${i}</a></li>`;
          paginList.append(page1);
        }
      }
      if (currentPage == 1) {
        prev.classList.add("disabled");
      } else {
        prev.classList.remove("disabled");
      }

      if (currentPage == pageTotalCount) {
        next.classList.add("disabled");
      } else {
        next.classList.remove("disabled");
      }
    });
}

prev.addEventListener("click", () => {
  if (currentPage <= 1) {
    return;
  }
  currentPage--;
  render();
});

next.addEventListener("click", () => {
  if (currentPage >= pageTotalCount) {
    return;
  }
  currentPage++;
  render();
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("page-num")) {
    currentPage = e.target.innerText;
    render();
  }
});

// ?search

search.addEventListener("input", () => {
  searchVal = search.value;
  render();
});
