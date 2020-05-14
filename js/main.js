'use strict'

// Описываем класс создаваемого клиента
class Client {
  constructor(name, age, procedure) {
    this.name = name
    this.age = age || 'hidden'
    this.procedure = procedure || 'massage'
    this.id = Date.now()
    this.createdAt = new Date().toLocaleString()
    this.status = 'waiting'
  }
}

// Находим необходимые для работы элементы
let inputs = document.querySelectorAll('input')
let $createClientBtn = document.getElementById('createClientBtn')
let $showFormBtn = document.getElementById('showFormBtn')
let $list = document.querySelector('tbody')

let clients = []

// Реализуем простую валидаюцию формы (1й инпут)
inputs[0].addEventListener('keyup', function() {
  if(inputs[0].value.length < 2) {
    if(!$createClientBtn.hasAttribute('disabled')) {
      $createClientBtn.setAttribute('disabled', 'disabled')
    }
  } else {
    if($createClientBtn.hasAttribute('disabled')) {
      $createClientBtn.removeAttribute('disabled')
    }
  }
})

// Функция добавления клиента в массив
function addClient() {
  let name = inputs[0].value,
      age = inputs[1].value,
      procedure = inputs[2].value
  let client = new Client(name, age, procedure)
  clients.push(client)
  renderList(clients)
  inputs.forEach((elem) => elem.value = '')
  $createClientBtn.setAttribute('disabled', 'disabled')
}

// Добавление клиента в список в HTML
function addToList(client) {
  let $client = document.createElement('tr')
  $client.innerHTML = `
    <td>${client.name}</td>
    <td>${client.age}</td>
    <td>${client.procedure}</td>
    <td><span class="delete">x</span></td>
  `
  let $delItemBtn = $client.querySelector('.delete')
  $delItemBtn.onclick = deleteItem
  $list.append($client)
}

function renderList(clients) {
  $list.innerHTML = ''
  for(let client of clients) {
    let $client = document.createElement('tr')
    $client.innerHTML = `
      <td>${client.name}</td>
      <td>${client.age}</td>
      <td>${client.procedure}</td>
      <td><span class="delete">x</span></td>
    `
    let $delItemBtn = $client.querySelector('.delete')
    $delItemBtn.onclick = deleteItem
    $list.append($client)
  }
}

// Удаление клиента из списка
function deleteItem() {
  let el = this.parentElement.parentElement
  // el.parentElement.removeChild(el)
  el.remove()
  console.log(clients)
}

// Показать/скрыть форму
$showFormBtn.onclick = function() {
  document.querySelector('.inputs').classList.toggle('inputs--full')
  this.innerText = this.innerText.includes('Показать') ? 'Скрыть' : 'Показать'
  this.innerText += ' поля'
}