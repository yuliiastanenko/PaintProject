const inputNumber = document.getElementById("number");
const inputColor = document.getElementById("color");

const section = document.querySelector("section");

function createSquare() {
  const square = document.createElement("div");
  square.style.width = "50px";
  square.style.height = "50px";
  square.style.background = inputColor.value;
  return square;
}

inputNumber.onchange = function () {
  const amount = Number(inputNumber.value);
  for (let i = 0; i < amount; i++) {
    const item = createSquare();
    section.append(item);
  }
};