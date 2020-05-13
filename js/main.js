'use strict'

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

let inputs = document.querySelectorAll('input')
let $createClientBtn = document.getElementById('createClientBtn')
let $showFormBtn = document.getElementById('showFormBtn')

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

let clients = []
let $list = document.querySelector('tbody')

function addClient() {
  let name = inputs[0].value,
      age = inputs[1].value,
      procedure = inputs[2].value
  let client = new Client(name, age, procedure)
  clients.push(client)
  addToList(client)
  inputs.forEach((elem) => elem.value = '')
  $createClientBtn.setAttribute('disabled', 'disabled')
}

function addToList(client) {
  let $client = document.createElement('tr')
  $client.innerHTML = `
    <td>${client.name}</td>
    <td>${client.age}</td>
    <td>${client.procedure}</td>
    <td><span>x</span></td>
  `
  $list.append($client)
}