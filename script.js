let emodziSet = [
  ["😺","🐟","👹","💘", "#7fff6a"],
  ["🦄","⭐","👹","✨", "#ECB6FA"],
  ["🦕","🌳","👹","💘", "#7fff6a"],
  ["🐺","🍗","🐻","💘", "#7fff6a"],
];

let emodzi = emodziSet[0]; //control the Emodzi Set

let submitButton = document.querySelector(".submitButton");

let captchaComplited = false;

function captchaCheck() { 
  if (captchaComplited === false) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
    document.querySelector(".controls").classList.add("collapsed");
  }
}
captchaCheck();

let container = document.querySelector(".labirint");
let context = container.getContext("2d");
context.imageSmoothingEnabled = false;

let a = 200; //canvas size
container.width = a;
container.height = a;

let pixel = a / 5; //pixel size

function drawMaze(color) {
  context.fillStyle = color;
  context.fillRect(0, 0, pixel, 4 * pixel);
  context.fillRect(pixel, 3 * pixel, pixel, pixel);
  context.fillRect(2 * pixel, pixel, pixel, 4 * pixel);
  context.fillRect(3 * pixel, 4 * pixel, 2 * pixel, pixel);
  context.fillRect(4 * pixel, 0, pixel, pixel);
  context.fillRect(3 * pixel, pixel, 2 * pixel, pixel);
}

drawMaze("white");

let cat = emodzi[0];
context.font = "32px 'Noto Color Emoji', sans-serif";
context.fillText(cat, 0, 30);

document.getElementById('cat').innerHTML = cat;

let fish = emodzi[1];
context.fillText(fish, 160, 190);

document.getElementById('fish').innerHTML = fish;

let devil = emodzi[2];
context.fillText(devil, 160, 30);

let heart = emodzi[3];

// Получаем координаты котика и рыбки
let catX = 0;
let catY = 30;

let fishX = 160;
let fishY = 190;

let devilX = 160;
let devilY = 30;

// Рисуем котика и рыбку
function drawCat() {
  context.clearRect(0, 0, container.width, container.height);
  drawMaze("white"); // Рисуем лабиринт
  context.fillText(cat, catX, catY);
  context.fillText(fish, fishX, fishY);
  context.fillText(devil, devilX, devilY);
}

// Проверка на достижение рыбки
function checkWin() {
  if (catX === fishX && catY === fishY) {
    captchaComplited = true;
    captchaCheck();

    context.clearRect(0, 0, container.width, container.height);
    drawMaze(emodzi[4]); // Рисуем лабиринт
    context.fillText(heart, fishX, fishY); // и сердечко
  }
}

// Функция обработки нажатия клавиш
function moveCat(e) {
  if (!captchaComplited) {
    switch (e.keyCode) {
      case 37: // Влево
        if (
          catX - pixel >= 0 &&
          context.getImageData(catX - pixel, catY, 1, 1).data[3] !== 0
        ) {
          catX -= pixel;
        }
        break;
      case 38: // Вверх
        if (
          catY - pixel >= 0 &&
          context.getImageData(catX, catY - pixel, 1, 1).data[3] !== 0
        ) {
          catY -= pixel;
        }
        break;
      case 39: // Вправо
        if (
          catX + pixel <= container.width - pixel &&
          context.getImageData(catX + pixel, catY, 1, 1).data[3] !== 0
        ) {
          catX += pixel;
        }
        break;
      case 40: // Вниз
        if (
          catY + pixel <= container.height &&
          context.getImageData(catX, catY + pixel, 1, 1).data[3] !== 0
        ) {
          catY += pixel;
        }
        break;
    }
    drawCat(); // Перерисовываем котика
    checkWin(); // Проверяем, достиг ли он рыбки
  }
}

// Добавляем обработчик события нажатия клавиш
document.addEventListener("keydown", moveCat);

document.getElementById("up").addEventListener("click", function () {
  var event = new KeyboardEvent("keydown", { keyCode: "38" });
  document.dispatchEvent(event);
});

document.getElementById("left").addEventListener("click", function () {
  var event = new KeyboardEvent("keydown", { keyCode: "37" });
  document.dispatchEvent(event);
});

document.getElementById("right").addEventListener("click", function () {
  var event = new KeyboardEvent("keydown", { keyCode: "39" });
  document.dispatchEvent(event);
});

document.getElementById("down").addEventListener("click", function () {
  var event = new KeyboardEvent("keydown", { keyCode: "40" });
  document.dispatchEvent(event);
});
