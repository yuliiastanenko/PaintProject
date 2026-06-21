const inputNumber = document.getElementById("number");
const inputColor = document.getElementById("color");
const inputWidth = document.getElementById("width");
const inputHeight = document.getElementById("height");

const section = document.querySelector("section");

let block = [];
let memory = localStorage.getItem("key");
if (memory) {
    block = JSON.parse(memory);
    for (let i = 0; i < block.length; i++) {
        const item = renderSquare(block[i]);
        section.append(item);
    }
}

function createSquare() {
    const squareState = {
        top: Math.random() * (window.innerHeight - inputHeight.value - 20),
        left: Math.random() * (window.innerWidth - inputWidth.value - 20),
        width: inputWidth.value,
        height: inputHeight.value,
        color: inputColor.value,
    };
    block.push(squareState);
    localStorage.setItem("key", JSON.stringify(block));
    return renderSquare(squareState);
}

function renderSquare(squareState) {
    const square = document.createElement("div");
    square.style.top = squareState.top + "px";
    square.style.left = squareState.left + "px";
    square.style.width = squareState.width + "px";
    square.style.height = squareState.height + "px";

    const cross = document.createElement("button");
    cross.innerText = "❌";
    cross.classList.add("close");

    const left = document.createElement("button");
    left.innerText = "←";
    left.classList.add("left");
    left.onclick = function () {
        squareState.left--;
        square.style.left = squareState.left + "px";
    }

    const right = document.createElement("button");
    right.innerText = "→";
    right.classList.add("right");
    right.onclick = function () {
        squareState.left++;
        square.style.left = squareState.left + "px";
    }

    const up = document.createElement("button");
    up.innerText = "↑";
    up.classList.add("up");
    up.classList.add("up");
    up.onclick = function () {
        squareState.top--;
        square.style.top = squareState.top + "px";
    }

    const down = document.createElement("button");
    down.innerText = "↓";
    down.classList.add("down");
    down.onclick = function () {
        squareState.top++;
        square.style.top = squareState.top + "px";
    }

    square.append(down, left, right, up, cross);

    square.style.background = squareState.color;
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