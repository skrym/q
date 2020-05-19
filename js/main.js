'use strict';

$(document).ready(function() {
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
  let $list = document.querySelector('tbody')
  
  renderList(clients)
  
  // Фильтрация
  $('.filter input')
    .dblclick(function() { $(this).removeAttr('readonly') })
    .blur(function() { $(this).attr('readonly', 'readonly') })
    .keyup(function() {
      renderList(clients.filter(client =>
        client.name.toLowerCase().includes($('[name=f-name]').val().toLowerCase()) &&
        client.age.includes($('[name=f-age]').val()) &&
        client.procedure.includes($('[name=f-procedure]').val())))
    })
    
  // let filterFields = document.querySelectorAll('.filter input')
  // filterFields.forEach((input, i, arr) => {
  //   input.addEventListener('dblclick', function() {
  //     input.removeAttribute('readonly')
  //   })
  //   input.addEventListener('blur', function() {
  //     input.setAttribute('readonly', 'readonly')
  //   })
  //   input.addEventListener('keyup', function() {
  //     let filteredClients = clients.filter(client =>
  //       client.name.toLowerCase().includes(arr[0].value.toLowerCase()) &&
  //       client.age.includes(arr[1].value) &&
  //       client.procedure.includes(arr[2].value))
  //     renderList(filteredClients)
  //   })
  // })
  
  // Реализуем простую валидаюцию формы (1й инпут)
  $('[name=name]').keyup(function() {
    let btn = $('#createClientBtn')
    if($(this).val().length < 2) {
      if(!btn.attr('disabled')) {
        btn.attr('disabled', 'disabled')
      }
    } else {
      if(btn.attr('disabled')) {
        btn.removeAttr('disabled')
      }
    }
  })
  
  // Функция добавления клиента в массив
  $('#createClientBtn').click(() => {
    let name = $('[name=name]').val(),
        age = $('[name=age]').val(),
        procedure = $('[name=procedure]').val()
    let client = new Client(name, age, procedure)
    clients.push(client)
    renderList(clients)
    saveData()
    $('.inputs input').val('')
    $('#createClientBtn').attr('disabled', 'disabled')
    
  })
  
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
    $('tbody').html('')
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
      $('tbody').append($client)
    }
  }
  
  
  // Удаление клиента из списка
  function deleteItem(id) {
    clients = clients.filter(el => el.id != id)
    renderList(clients)
    saveData()
  }
  
  // Показать/скрыть форму
  $('#showFormBtn').click(function() {
    $('.inputs').toggleClass('inputs--full')
    $(this).text(() => 
      $(this).text().includes('Показать') ? 'Скрыть поля' : 'Показать поля')
  })
  
  
})


