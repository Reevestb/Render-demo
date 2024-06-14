const form = document.getElementById("carForm");

async function fetchAndRenderFCars() {
  const response = await fetch("http://locahost:7430/favcars");
  const carList = await response.json();
  const carListDiv = document.getElementById("carList");
  carListDiv.innerHTML = "";

  carList.forEach((Favourite_Cars) => {
    const carDiv = document.createElement("div");
    carDiv.innerHTML = `<p>ID ${Favourite_Cars.id}, Brand: ${Favourite_Cars.Brand}, Model: ${Favourite_Cars.Model}, Year: ${Favourite_Cars.Year}, Rating: ${Favourite_Cars.Year}</p>`;
    carListDiv.appendChild(carDiv);
  });
}
fetchAndRenderFCars();

form.addEventListener("submit", submitButton);
function submitButton(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);
  fetch("http://locahost:7430/Favourite_Cars", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
}
