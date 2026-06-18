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

    const cross = document.createElement("button");
    cross.innerText = "❌";
    cross.classList.add("close");

    const left = document.createElement("button");
    left.innerText = "←";
    left.classList.add("left");

    const right = document.createElement("button");
    right.innerText = "→";
    right.classList.add("right");

    const up = document.createElement("button");
    up.innerText = "↑";
    up.classList.add("up");

    const down = document.createElement("button");
    down.innerText = "↓";
    down.classList.add("down");

    square.append(down, left, right, up, cross);

    square.style.background = inputColor.value;
    cross.onclick = function () {
        square.remove();
    }
    return square;
}

inputNumber.onchange = function () {
    const amount = Number(inputNumber.value);
    for (let i = 0; i < amount; i++) {
        const item = createSquare();
        section.append(item);
    }
};