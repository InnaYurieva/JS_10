import colors from './colors.js'

const container = document.querySelector('.container') //Выбираем контейнер 
const SQUARES = 35 //количество квадратиков
for (let index = 0; index < SQUARES; index++) {
  const square = document.createElement('div')
  square.classList.add('square')
  container.append(square)
  getElem(square)
}

function getElem (el) { //Добавляет цвет каждому квадратику
  const color = getColor()
  el.style.background = color 
}

function getColor () { //Рандомные цвета из списка цветов
  return colors[Math.floor(Math.random() * colors.length)]
}

function openModal(event) {
  container.classList.add('is-open');
  svgColor.style.fill = '#f6bf54'
  svgColor.classList.add('svg-colorGet')
}
const icons = document.querySelector('.icons')
icons.addEventListener('click', openModal);

const overlay = document.querySelector('.overlay')

function closeModal(event) {
  if (event.target.classList.contains('overlay')){
    container.classList.remove('is-open');
}
}

overlay.addEventListener("click", closeModal);


const input = document.createElement('input')
input.classList.add('input')
input.placeholder = '#000000'
container.append(input)
const divColor = document.createElement('div')
divColor.classList.add('div-color')
input.before(divColor)

const svgIcons = document.querySelector('#svg')
//console.log(svgIcons);
input.after(svgIcons)

input.addEventListener('change', inputChange) //в поповере есть цвета и инпут, слева от инпута - квадрат цвета иконки, при введении в инпут валидного цвета, квадрат меняет цвет на тот что ввели 
function inputChange (event){
  //console.log(event.target.value);
  for (let index = 0; index < colors.length; index++) {
    const element = colors[index];
    if (event.target.value === element) {
      //console.log('Успех!');
      divColor.style.background = element 
    } 
  }

}

const svgColor = document.querySelector('.svg-color') // Иконка
//console.log(svgColor);


const square = document.querySelectorAll('.square')
for (const iterator of square) {
  //console.log(iterator);
  iterator.addEventListener('click', getDivColor)
  function getDivColor (event) {
    //console.log(event.target);
    let rgbTarget = event.target.style.backgroundColor
    const rgbToHex = string => {
      const rgb = string.split('(')[1].split(')')[0].split(',')
      const hex = rgb.map(function (x) {
        x = parseInt(x).toString(16)
        return x.length === 1 ? '0' + x : x
      })
      return '#' + hex.join('')
    }
    let rgbHex = rgbToHex(rgbTarget)
    svgColor.style.fill = rgbHex
    //console.log(svgColor.style.fill);
    //console.log(rgbToHex(svgColor.style.fill));
    if (rgbToHex(svgColor.style.fill) === rgbHex) {
      container.classList.remove('is-open')
    }
  }
}


input.addEventListener('change', getHexOnInput)
let dataLength = input.dataLength
dataLength = 7

//console.log(dataLength);
function getHexOnInput(event) {
  //console.log('#' + event.target.value)
  //console.log(event.target.value.split('')[0]);
  if(event.target.value.split('')[0] === '#' && event.target.value.length === dataLength){
    //console.log('Успех');
    svgIcons.style.stroke = 'green'
  } else {
    input.style.borderColor = 'red'
  }
}
svgIcons.addEventListener('click', svgGetClose)
function svgGetClose() {
  container.classList.remove('is-open')
}

