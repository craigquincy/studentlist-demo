$(document).ready(() => {

  // get all students
  $.getJSON('/api/v1/students').then(data => {
    console.log("get students", data)
    let tbody = $('#studentList tbody')

    data.forEach((student, i) => {
      tbody.append($(`<tr>
        <td><a href="/students/${student.id}">${student.id}</a></td>
        <td>${student.name}</td>
        <td>${student.mantra}</td>
        <td>
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary">Edit</button>
            <button type="button" class="btn btn-secondary deleteBtn" data-id="${student.id}">Delete</button>
          </div>
        </td>
      </tr>`))
    })
  })

  // get single student if there is an id on the end of the url
  let checkId = document.location.href.match(/\d+$/)
  if (checkId) {
    let id = checkId[0]

    $.getJSON(`/api/v1/students/${id}`).then(data => {
      console.log("fetched a student", id, data);
      $('.mantra').html(data.mantra)
      $('.name').html(data.name)
    })
  }

  // listen to delete buttons
  $('#studentList tbody').on('click', '.deleteBtn', (e) => {
    console.log("you want to delete...", $(e.target).data('id'));
    let id = $(e.target).data('id')
    if (id) {
      $.ajax({
        url: `/api/v1/students/${id}`,
        method: "DELETE",
        dataType: 'json'
      }).done(data => {
        $(e.target).closest('tr').hide()
        console.log("deleted", data);
      })
    }
  })

  // new student form
  $('#newStudent').submit((e) => {
    e.preventDefault()

    let data = $('#newStudent').serialize()

    $.post("/api/v1/students", data, null, 'json')
    .then((data) => {
      console.log("POSTED data", data);
      document.location = '/students';
    })
    .fail((err) => {
      $('#errorMessage').html(
        `<div class="alert alert-danger" role="alert">
        ${err.responseText}</div>`
      )
    })
  })
})
