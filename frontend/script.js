const inputNumber = document.getElementById("number");
const inputColor = document.getElementById("color");
const inputWidth = document.getElementById("width");
const inputHeight = document.getElementById("height");
const buttonDelete = document.getElementById("delete");
const checkbox = document.getElementById("close");

checkbox.checked = JSON.parse(localStorage.getItem("presizionState"));
const section = document.querySelector("section");

const menuHeader = document.querySelector("header");
const menuCheckbox = document.getElementById("menu");
const menuState = JSON.parse(localStorage.getItem("menuState"));

let chooseSquare = null;
let newState = null;

menuCheckbox.checked = menuState;
toggleMenu(menuState);

let blocks = await getNewItem();

for (let i = 0; i < blocks.length; i++) {
  const item = renderSquare(blocks[i]);
  section.append(item);
}

function setNewItem(blocks) {
  localStorage.setItem("key", JSON.stringify(blocks));
}

async function getNewItem() {
  // return localStorage.getItem("key");
  const request = await fetch("http://localhost:3000/paint");
  const payload = await request.json();
  return payload;
}

menuCheckbox.onchange = function (event) {
  localStorage.setItem("menuState", event.target.checked);
  toggleMenu(event.target.checked);
};

checkbox.onchange = function (event) {
  localStorage.setItem("presizionState", event.target.checked);
  section.innerHTML = "";
  for (let i = 0; i < blocks.length; i++) {
    const item = renderSquare(blocks[i]);
    section.append(item);
  }
};

function createSquare() {
  const squareState = {
    top: Math.random() * (window.innerHeight - inputHeight.value - 20),
    left: Math.random() * (window.innerWidth - inputWidth.value - 20),
    width: inputWidth.value,
    height: inputHeight.value,
    color: inputColor.value,
  };
  blocks.push(squareState);
  setNewItem(blocks);
  return renderSquare(squareState);
}

function toggleMenu(isHidden) {
  if (isHidden) {
    menuHeader.setAttribute("hidden", "");
  } else {
    menuHeader.removeAttribute("hidden");
  }
}

document.body.onclick = function (event) {
  console.log(event);
  chooseSquare.style.left = event.pageX + "px";
  chooseSquare.style.top = event.pageY + "px";
  newState.left = event.pageX;
  newState.top = event.pageY;
  setNewItem(blocks);
};

function renderSquare(squareState) {
  const square = document.createElement("div");
  square.style.top = squareState.top + "px";
  square.style.left = squareState.left + "px";
  square.style.width = squareState.width + "px";
  square.style.height = squareState.height + "px";

  const cross = document.createElement("button");
  cross.innerText = "❌";
  cross.classList.add("close");

  let event = "onclick";
  if (checkbox.checked) {
    event = "onclick";
  } else {
    event = "onmousemove";
  }

  square.onclick = function (event) {
    event.stopPropagation();
    chooseSquare = square;
    newState = squareState;
    console.log(event);
  };

  const left = document.createElement("button");
  left.innerText = "←";
  left.classList.add("left");
  left[event] = function () {
    squareState.left--;
    setNewItem(blocks);
    square.style.left = squareState.left + "px";
  };

  const right = document.createElement("button");
  right.innerText = "→";
  right.classList.add("right");
  right[event] = function () {
    squareState.left++;
    setNewItem(blocks);
    square.style.left = squareState.left + "px";
  };

  const up = document.createElement("button");
  up.innerText = "↑";
  up.classList.add("up");
  up.classList.add("up");

  up[event] = function () {
    squareState.top--;
    setNewItem(blocks);
    square.style.top = squareState.top + "px";
  };

  const down = document.createElement("button");
  down.innerText = "↓";
  down.classList.add("down");
  down[event] = function () {
    squareState.top++;
    setNewItem(blocks);
    square.style.top = squareState.top + "px";
  };

  buttonDelete.onclick = function () {
    section.innerHTML = "";
    blocks = [];
    localStorage.removeItem("key");
  };

  square.append(down, left, right, up, cross);

  square.style.background = squareState.color;
  cross.onclick = function () {
    square.remove();
    const indexOfElementToDelete = blocks.findIndex(
      (element) => squareState == element,
    );
    console.log(indexOfElementToDelete);
    blocks.splice(indexOfElementToDelete, 1);
    setNewItem(blocks);
  };
  return square;
}

inputNumber.onchange = function () {
  const amount = Number(inputNumber.value);
  for (let i = 0; i < amount; i++) {
    const item = createSquare();
    section.append(item);
  }
};
