// write your code here
const URL = "http://localhost:3000";
const menuDiv = document.getElementById("ramen-menu");
const addForm = document.querySelector("#new-ramen");

function renderMenu() {
  fetch(`${URL}/ramens`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((image) => {
        const img = document.createElement("img");
        img.src = image.image;
        img.alt = image.name;
        img.addEventListener("click", () => renderDetails(image.id));
        menuDiv.append(img);
      });
      bindData(data[0]);
    });
}

function bindData(obj) {
  document.querySelector(".detail-image").src = obj.image;
  document.querySelector(".name").textContent = obj.name;
  document.querySelector(".restaurant").textContent = obj.restaurant;
  document.querySelector("#rating-display").textContent = obj.rating;
  document.querySelector("#comment-display").textContent = obj.comment;
}

function renderDetails(id) {
  fetch(`${URL}/ramens/${id}`)
    .then((res) => res.json())
    .then((data) => {
      bindData(data);
    });
}

addForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(this).entries());

  fetch(`${URL}/ramens`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document
        .querySelectorAll(".form-input")
        .forEach((input) => (input.value = ""));
    });
});

renderMenu();
