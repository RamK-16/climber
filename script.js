// #########получаем доступ к нашему элементам
const climber = document.querySelector('.climber');
const heli = document.querySelector('.heli');
// получаем доступ к боди
const body1 = document.querySelector('.body');
// получаем доступ к каждому пункту маршрута
const punkts = document.querySelectorAll('.punkts');
const clone = heli.cloneNode(true);
clone.classList.add('clones');
const pole = document.querySelector('.pole');
pole.insertBefore(clone, pole.children[7]);
const clone1 = clone.cloneNode(true);
pole.insertBefore(clone1, pole.children[7]);
const clone2 = clone.cloneNode(true);
pole.insertBefore(clone2, pole.children[7]);

clone.classList.add('clones');
clone.style.top = '700px';
clone.style.left = '0px';
clone1.style.top = '590px';
clone1.style.left = '0px';
clone2.style.top = '370px';
clone2.style.left = '0px';

// ########добавляем действие при нажатии любой клавиши клавиатуры:
document.addEventListener('keydown', (event) => {
  // получаем координаты сlimber.лэфт (которое записано в css)
  const nowPos = window.getComputedStyle(climber).left;
  // #создаем массивы значений пунктс.лэфт и пунктс.топ
  const arrayLeft = [];
  const arrayTop = [];
  for (let i = 0; i < punkts.length; i += 1) {
    arrayLeft.push(window.getComputedStyle(punkts[i]).left);
    arrayTop.push(window.getComputedStyle(punkts[i]).top);
  }
  // действие, если нажата клавиша Х (движение скалолаза вправо)
  if (event.code === 'KeyX') {
    // создаем действие : находим на каком пункте скалолаз и переназнаем его координаты на сл пункт.
    for (let i = 0; i < arrayLeft.length; i += 1) {
      if (nowPos === arrayLeft[i]) {
        climber.style.left = arrayLeft[i + 1];
        climber.style.top = arrayTop[i + 1];
      }
    }
  }
  // действие, если нажата клавиша Z (движение скалолаза влево)
  if (event.code === 'KeyZ') {
    // создаем действие : находим на каком пункте скалолаз и переназнаем его координаты на сл пункт.
    for (let i = 0; i < arrayLeft.length; i += 1) {
      if (nowPos === arrayLeft[i]) {
        climber.style.left = arrayLeft[i - 1];
        climber.style.top = arrayTop[i - 1];
      }
    }
  }
  // ######Проверка на то, находится ли скалолаз на последнем пункте.
  // Если да, то появляется флаг и alert. Если нет, то нет флага
  const flag = document.querySelector('.win');
  function sayVictory() {
    alert('Victory!');
  }
  if (climber.style.left === arrayLeft[arrayLeft.length - 1]) {
    flag.style = 'display: initial';
    body1.style = 'background-image: url(./img/11.jpg); background-size: 100vw 100vh';
    pole.style = 'display: none';
    setTimeout(sayVictory, 300);
  } else {
    flag.style = 'display: none';
  }
});

// ####### СОЗДАНИЕ ДВИЖЕНИЯ ВЕРТОЛЕТОВ
function draw1(timePassed) {
  clone.style = 'transform: scale(1, 1); top: 700px';
  clone1.style = 'transform: scale(1, 1); top: 590px';
  clone2.style = 'transform: scale(1, 1); top: 370px';
  clone.style.left = `${2 * timePassed / 5}px`;
  clone1.style.left = `${7 * timePassed / 5}px`;
  clone2.style.left = `${4 * timePassed / 5}px`;
}
function draw2(timePassed) {
  clone.style = 'transform: scale(-1, 1); top: 700px';
  clone1.style = 'transform: scale(-1, 1); top: 590px';
  clone2.style = 'transform: scale(-1, 1); top: 370px';
  clone.style.left = `${2 * 800 - 2 * timePassed / 5}px`;
  clone1.style.left = `${7 * 800 - 7 * timePassed / 5}px`;
  clone2.style.left = `${4 * 800 - 4 * timePassed / 5}px`;
}
let start = Date.now(); // запомнить время начала
let timer = setInterval(() => {
  // сколько времени прошло с начала анимации?
  const timePassed = Date.now() - start;

  if (timePassed <= 2000) {
    draw1(timePassed);
  } else if (timePassed > 2000 && timePassed <= 4000) {
    draw2(timePassed);
  } else if (timePassed > 4000) {
    start = Date.now();
  } else if (timePassed > 5000) {
    clearInterval(time); // закончить анимацию через 5 секунды
    return;
  }
}, 10);

// ###### СОЗДАНИЕ ПРОВЕРКИ УСЛОВИЯ СТОЛКНОВЕНИЯ СКАЛОЛАЗА И ВЕРТОЛЕТОВ
const allClones = document.querySelectorAll('.clones');
let timer2 = setInterval(() => {
  for (let i = 0; i < allClones.length; i++) {
    const dataClimber = climber.getBoundingClientRect();
    const dataClone = allClones[i].getBoundingClientRect();
    // console.log(dataClimber);
    if (dataClimber.top + dataClimber.height > dataClone.top &&
      dataClimber.left + dataClimber.width > dataClone.left + 30 &&
      dataClimber.bottom - dataClimber.height < dataClone.bottom &&
      dataClimber.right - dataClimber.width < dataClone.right - 30) {
      return alert('Взрыв!!! Попробуй снова!'), location.reload();
    }
  }
}, 10);
