let API = "http://localhost:8000/cosmetics";
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
render();
