const inputNumber = document.getElementById("number");
const inputColor = document.getElementById("color");
const inputWidth = document.getElementById("width");
const inputHeight = document.getElementById("height");

const section = document.querySelector("section");

function createSquare() {
  const square = document.createElement("div");
  const sizeWidth = inputWidth.value + "px";
  const sizeHeight = inputHeight.value + "px";
  square.style.width = sizeWidth;
  square.style.height = sizeHeight;

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