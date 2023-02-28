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
