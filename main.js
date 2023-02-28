let API = "http://localhost:8000/cosmetics";

//? вытаскиваем инпуты
let title = document.querySelector("#title");
let category = document.querySelector("#category");
let descr = document.querySelector("#desc");
let price = document.querySelector("#price");
let image = document.querySelector("#image");
let addBtn = document.querySelector("#addBtn");

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
    description: descr.value,
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
  descr.value = "";
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
          <h2 class="card-title ">${item.title}</h2>
          <h5 class="card-title">${item.category}</h5>
          <p class="card-text">${item.descr}</p>
          <p class="card-text">${item.price}</p>
          <a href="#" id=${item.id} class="btn btn-delete btn-dark">DELETE</a>
          <a href="#" id=${item.id} class="btn btn-edit btn-dark">EDIT</a>
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
