let API = "http://localhost:8000/cosmetics";

//? вытаскиваем инпуты
let title = document.querySelector("#title");
let category = document.querySelector("#category");
let descr = document.querySelector("#desc");
let price = document.querySelector("#price");
let image = document.querySelector("#image");
let addBtn = document.querySelector("#addBtn");

let productList = document.querySelector(".product-list");

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
});

// ? очищаем инпуты

title.value = "";
category.value = "";
descr.value = "";
price.value = "";
image.value = "";

render();

// ?функция для отображения карточек продукта

async function render() {
  let res = fetch(`${API}`);
  let products = (await res).json();

  productList.innerHTML = "";

  products.forEach((item) => {
    let newItem = document.createElement("div");
    newItem.id = item.id;

    newItem.innerHTML += `<div class="card" style="width: 18rem;">
        <img src="${item.image}" class="card-img-top" alt="image">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <h2 class="card-title">${item.category}</h2>
          <p class="card-text">${item.descr}</p>
          <p class="card-text">${item.price}</p>
          <a href="#" id=${item.id} class="btn btn-primary">DELETE</a>
          <a href="#" id=${item.id} class="btn btn-dark">EDIT</a>
        </div>
      </div>`;
    productList.append(newItem);
  });
}
