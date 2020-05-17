'use strict';

let clients = JSON.parse(localStorage.getItem('clientsLS')) || []

function saveData() {
  localStorage.setItem('clientsLS', JSON.stringify(clients))
}

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
let inputs = document.querySelectorAll('.inputs input')
let $createClientBtn = document.getElementById('createClientBtn')
let $showFormBtn = document.getElementById('showFormBtn')
let $list = document.querySelector('tbody')

renderList(clients)

// Фильтрация
let filterFields = document.querySelectorAll('.filter input')
filterFields.forEach((input, i, arr) => {
  input.addEventListener('dblclick', function() {
    input.removeAttribute('readonly')
  })
  input.addEventListener('blur', function() {
    input.setAttribute('readonly', 'readonly')
  })
  input.addEventListener('keyup', function() {
    let filteredClients = clients.filter(client =>
      client.name.toLowerCase().includes(arr[0].value.toLowerCase()) &&
      client.age.includes(arr[1].value) &&
      client.procedure.includes(arr[2].value))
    renderList(filteredClients)
  })
})

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
  saveData()
  inputs.forEach((elem) => elem.value = '')
  $createClientBtn.setAttribute('disabled', 'disabled')
}

// Добавление клиента в список в HTML
// function addToList(client) {
//   let $client = document.createElement('tr')
//   $client.innerHTML = `
//     <td>${client.name}</td>
//     <td>${client.age}</td>
//     <td>${client.procedure}</td>
//     <td><span class="delete">x</span></td>
//   `
//   let $delItemBtn = $client.querySelector('.delete')
//   $delItemBtn.onclick = deleteItem
//   $list.append($client)
// }

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
    $delItemBtn.onclick = function() {
      deleteItem(client.id)
    }
    $list.append($client)
  }
}


// Удаление клиента из списка
function deleteItem(id) {
  clients = clients.filter(el => el.id != id)
  renderList(clients)
  saveData()
}

// Показать/скрыть форму
$showFormBtn.onclick = function(marina) {
  console.log(marina)
  document.querySelector('.inputs').classList.toggle('inputs--full')
  this.innerText = this.innerText.includes('Показать') ? 'Скрыть' : 'Показать'
  this.innerText += ' поля'
}
